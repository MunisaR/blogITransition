import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ReactHtmlParser from "react-html-parser";
import Bubble from "../../components/bubble/Bubble";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import NavBar from "../../components/navbar/NavBar";
import axios from "axios";
import { baseURL } from "../../extras/constants";

const CollectionItemPage = () => {
  const id = JSON.parse(localStorage.getItem("userObject"));
  const [liked, disliked] = useState(false);
  const [countLikes, setcountLikes] = useState("");
  let x = useLocation().state;
  const [collection, setCollection] = useState(x);

  const [commentBody, setCommentBody] = useState("");
  const userId = id._id;

  useEffect(() => {}, [collection]);

  return (
    <div className="container-fluid p-0 ">
      <NavBar
        category={{
          title: "Add Category +",
          link: "/add_category",
          state: { id },
        }}
      />
      <div
        style={{
          backgroundImage: `url(${
            collection?.image ||
            "https://images.unsplash.com/photo-1580265862291-4251b8c7e836?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
          })`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          objectFit: "center",
          height: "500px",
          width: "100%",
        }}
        className="m-0 d-flex justify-content-center align-items-center"
      >
        <div className="infoContainer ">
          <h1 className="text-white">
            {collection.title && collection.title.toUpperCase()}
          </h1>
          <h2 className="text-white">{collection.category}</h2>
        </div>
      </div>

      <div className="container py-4">
        <div className="d-flex justify-content-between">
          <div className="container">
            {collection.tags.length > 0 &&
              collection.tags.map((el, i) => (
                <p key={i} className="d-inline-block mx-1 fs-6 badge bg-light">
                  #{el}
                </p>
              ))}
          </div>
          <div>
            {liked ? (
              // like
              <AiOutlineHeart
                size={30}
                onClick={async () => {
                  axios
                    .post(baseURL + "/add-like", {
                      collectionId: collection._id,
                      userId,
                    })
                    .then((response) => {
                      setcountLikes(
                        response.data.filter(
                          (value, index, self) =>
                            index ===
                            self.findIndex(
                              (t) => t.like.owner === value.like.owner
                            )
                        )
                      );
                    })
                    .catch((error) => {
                      console.log(error);
                    });

                  disliked(!liked);
                }}
                color="red"
              />
            ) : (
              // dislike
              <AiFillHeart
                size={30}
                onClick={() => {
                  disliked(!liked);

                  axios
                    .post(baseURL + "/add-like", {
                      collectionId: collection._id,
                      userId,
                    })
                    .then((response) => {
                      setcountLikes(
                        response.data.filter(
                          (value, index, self) =>
                            index ===
                            self.findIndex(
                              (t) => t.like.owner === value.like.owner
                            )
                        )
                      );
                    })
                    .catch((error) => {
                      console.log(error);
                    });
                }}
                color="red"
              />
            )}
            <p style={{ fontSize: "15px !important" }} className="text-center">
              {collection.likes.length}
            </p>
          </div>
        </div>
        <hr />
        <div className="container">{ReactHtmlParser(collection.ckData)}</div>
        <hr />
        <div className="commentContainer container my-3 d-flex justify-content-center">
          <div className="form-group w-75">
            <label htmlFor="exampleTextarea" className="form-label mt-4">
              Add a comment
            </label>

            <textarea
              className="form-control"
              id="exampleTextarea"
              value={commentBody}
              onChange={(e) => setCommentBody(e.target.value)}
              rows="3"
            ></textarea>
            <div className="conatiner my-2 d-flex justify-content-end">
              <button
                onClick={() => {
                  // const res = window.confirm(
                  //   "Are you sure you want to add this comment?"
                  // );

                  if (commentBody !== 0) {
                    axios
                      .post(baseURL + "/add-comment", {
                        userId: id.fullName,
                        comment_body: commentBody,
                        collectionId: collection._id,
                      })
                      .then((response) => {
                        console.log(response.data);
                        setCollection(response.data);
                      })
                      .catch((error) => {
                        console.log(error);
                      });
                  } else {
                    alert("Please enter a comment");
                  }

                  setCommentBody("");
                  // if (res) {
                  //   window.location.reload();
                  // }
                }}
                className="btn btn-primary"
              >
                Add comment
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="commentsWrapper container p-2">
        {collection.comments.length > 0 &&
          collection.comments
            .reverse()
            .map((el, i) => (
              <Bubble key={i} owner={el.owner} comment_body={el.comment_body} />
            ))}
      </div>
    </div>
  );
};

export default CollectionItemPage;
