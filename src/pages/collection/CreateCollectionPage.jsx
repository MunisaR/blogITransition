import React, { useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import axios from "axios";
import createAnimation from "./MunisaPost.json";
import Lottie from "react-lottie";
import { Link, useLocation } from "react-router-dom";
import { baseURL } from "../../extras/constants";

const lottieCreate = {
  loop: true,
  autoplay: true,
  animationData: createAnimation,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

function CreateCollectionPage() {
  const [ckData, setCkData] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [isSaved, setIsSaved] = useState(false);
  const [id, setId] = useState("");
  const user = useLocation().state;

  const updateUser = async (collectionId) => {
    await axios
      .patch(baseURL + "/add-collection-to-user", {
        userId: user._id,
        collectionId,
      })
      .then((response) => {
        console.log({ response, userId: user._id });
        return true;
      })
      .catch((error) => {
        console.log(error);
        return false;
      });
  };

  return (
    <>
      <div className=" w-100 ">
        <h2 className="text-center p-3 text-bg-primary">
          Collection creating page
        </h2>
      </div>
      <Lottie options={lottieCreate} height={250} width={280} />
      <div className="container my-5">
        <div className="container d-flex flex-column align-items-center justify-content-center">
          <form onSubmit={(e) => e.preventDefault()} className="w-75">
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Collection title
              </label>
              <input
                type="text"
                className="form-control"
                required
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Tags
              </label>
              <input
                type="text"
                className="form-control"
                required
                onChange={(e) => {
                  setTags(e.target.value);
                }}
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Collection description
              </label>
              <textarea
                type="text"
                required
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
                className="form-control"
                id="exampleInputPassword1"
              />
            </div>
            <CKEditor
              editor={ClassicEditor}
              data={ckData}
              onReady={(editor) => {}}
              onChange={(event, editor) => {
                const data = editor.getData();
                setCkData(data);
              }}
              onBlur={(event, editor) => {}}
              onFocus={(event, editor) => {}}
            />
            <br />

            <center>
              <button
                onClick={async () => {
                  const all = {
                    title: title,
                    description: description,
                    ckData,
                    tags: tags.split(" "),
                  };
                  await axios
                    .post(baseURL + "/create_collection", { all })
                    .then(async (res) => {
                      if (res.status === 200 || res.statusText === "OK") {
                        updateUser(res.data.newCollection._id);
                        setIsSaved(true);
                        setId(res.data.newCollection._id);
                      }
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                }}
                type="submit"
                className="btn btn-primary"
              >
                Save
              </button>
              {isSaved && (
                <Link
                  state={id}
                  to={`image_upload/${id}`}
                  className="btn btn-primary mx-2"
                >
                  Next
                </Link>
              )}
            </center>
          </form>
        </div>
      </div>
    </>
  );
}

export default CreateCollectionPage;

// ;
// image;
// tags;
