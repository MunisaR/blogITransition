import React from "react";
import { useLocation } from "react-router-dom";
import ReactHtmlParser from "react-html-parser";
import Bubble from "../../components/bubble/Bubble";
import { AiFillHeart } from "react-icons/ai";
import NavBar from "../../components/navbar/NavBar";

const GuestCollectionItemPage = () => {
  const collection = useLocation().state;

  return (
    <div className="container-fluid p-0 ">
      <NavBar />
      <div
        style={{
          backgroundImage: `url(${
            collection.image ||
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
            <AiFillHeart size={30} color="red" />
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
              rows="3"
              disabled
              value={"Not registered users can not comment"}
            ></textarea>
          </div>
        </div>
      </div>
      <div className="commentsWrapper container p-2">
        {collection.comments.length > 0 &&
          collection.comments.map((el, i) => (
            <Bubble owner={el.owner} comment_body={el.comment_body} />
          ))}
      </div>
    </div>
  );
};

export default GuestCollectionItemPage;
