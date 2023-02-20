import axios from "axios";
import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import img from "../../components/CollectionItem/img.jpeg";
import { storage } from "../../extras/firebase/fire";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { baseURL } from "../../extras/constants";

function ImageUpload() {
  const params = useParams();
  const [imgUrl, setImgUrl] = useState(null);
  const [imgSaved, setImgSaved] = useState(false);
  const [progresspercent, setProgresspercent] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    const file = e.target[0]?.files[0];

    if (!file) return;

    const storageRef = ref(storage, `files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgresspercent(progress);
      },
      (error) => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImgUrl(downloadURL);
          axios
            .post(baseURL + "/upload", { downloadURL, id: params.id })
            .then((response) => {
              console.log(response);
              setImgSaved(true);
            })
            .catch((e) => console.log(e));
        });
      }
    );
  };

  return (
    <>
      <div className=" w-100 ">
        <h2 className="text-center p-3 text-bg-primary">
          Collection creating page
        </h2>
      </div>
      <div className="container flex-column d-flex vh-100 justify-content-center align-content-center">
        <center className="container ">
          <form onSubmit={handleSubmit} className="form">
            <div className="container">
              <label htmlFor="upload">
                <img src={img} style={{ width: "250px" }} alt="" />
              </label>
              <input id="upload" className="visually-hidden" type="file" />
              <div className="container">
                <button type="submit" className="btn btn-primary">
                  Save
                </button>
                <button
                  type=""
                  className="btn btn-primary mx-2"
                  onClick={() => {
                    window.location.href = "/collections";
                  }}
                >
                  Skip
                </button>
              </div>
            </div>
          </form>
          {!imgUrl && (
            <div className="container w-50 my-4 ">
              <div className="progress bg-light">
                <div
                  className="progress-bar"
                  role="progressbar"
                  style={{ width: `${progresspercent}%` }}
                  aria-valuenow={progresspercent + "%"}
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
                <div className="progress">
                  <div
                    className="progress-bar progress-bar-striped progress-bar-animated"
                    role="progressbar"
                    aria-valuemin="0"
                    aria-valuemax="100"
                    style={{ width: `${progresspercent}%` }}
                    aria-valuenow={progresspercent + "%"}
                  ></div>
                </div>
              </div>
            </div>
          )}

          <div className="mt-5">
            {imgUrl && <img src={imgUrl} alt="uploaded file" height={200} />}
          </div>
          <Link to="/collections" className="btn btn-primary m-2">
            Next
          </Link>
          <br />
        </center>
      </div>
    </>
  );
}

export default ImageUpload;
