/* eslint-disable no-restricted-globals */
import React, { useState } from "react";
import axios from "axios";
import { baseURL } from "../../extras/constants";
import { useNavigate } from "react-router-dom";

import {
  MDBCard,
  MDBCardImage,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
} from "mdb-react-ui-kit";
import { MdOutlineHideImage } from "react-icons/md";
import { AiFillDelete, AiFillStar, AiOutlineStar } from "react-icons/ai";
import { Link } from "react-router-dom";
import Toast from "../toast/Toast";
export function CollectionItem({
  id,
  image,
  title,
  description,
  link,
  collection,
  tags,
  user,
  onSelectTag,
}) {
  const [toastMessage, setToastMessage] = useState("");
  const [isVisibleToast, setIsVisibleToast] = useState(false);
  const [fav, setFav] = useState(false);

  return (
    <>
      <MDBCard className="position-relative">
        <MDBCard className="h-100">
          {!image ? (
            <div
              style={{
                border: "1px solid black",
                maxWidth: "100%",
                height: "auto",
              }}
              className="container d-flex justify-content-center align-items-center  h-75"
            >
              <MdOutlineHideImage size={80} />
            </div>
          ) : (
            <MDBCardImage height={220} src={image} alt="..." position="top" />
          )}
          <div className="bg-blur  position-absolute m-2">
            <AiFillStar
              className=""
              role={"button"}
              onClick={() => {
                setFav(!fav);
                const res = window.confirm(
                  "Are you sure you want to Add this to your favorites?"
                );
                if (res) {
                  axios
                    .post(baseURL + "/add-to-fav", {
                      id: user,
                      collectionId: collection,
                    })
                    .then(async (r) => {
                      console.log(r);
                    })
                    .catch(async (err) => {
                      console.log(err);
                    });
                  setToastMessage("Added to favourites");
                  setIsVisibleToast(true);
                  setTimeout(() => {
                    setIsVisibleToast(false);
                  }, 2000);
                  window.location.reload();
                }
              }}
              size={30}
              style={{ top: "20px", right: "20px" }}
              color={"orange"}
            />
          </div>

          <AiOutlineStar
            className="m-2 bg-blur"
            role={"button"}
            onClick={() => {
              setFav(!fav);
              const res = window.confirm(
                "Are you sure you want to remove this from your favorites?"
              );

              if (res) {
                axios
                  .patch(baseURL + "/remove-from-fav", {
                    id: user._id,
                    collectionTitle: collection.title,
                  })
                  .then(async (r) => {})
                  .catch(async (err) => {
                    console.log(err);
                  });

                setToastMessage("Removed from favourites");
                setIsVisibleToast(true);
                setTimeout(() => {
                  setIsVisibleToast(false);
                }, 2000);
                window.location.reload();
              }
            }}
            size={28}
            style={{ top: "20px", right: "20px" }}
            color={"orange"}
          />

          <Link
            className="text-decoration-none"
            to={`/collection/${link}`}
            state={collection}
          >
            <MDBCardBody>
              <MDBCardTitle className="m-0">{title}</MDBCardTitle>
              <MDBCardText>
                {description.toString().slice(0, 50) + "..."}
              </MDBCardText>
            </MDBCardBody>
            <hr />
          </Link>
          <div className="container">
            Tags:
            {tags.length > 0 &&
              tags.map((el, i) => (
                <p
                  role="button"
                  onClick={() => {
                    axios
                      .post(baseURL + "/find-tag", { tag: el })
                      .then((response) => {
                        onSelectTag(response.data);
                      });
                  }}
                  key={i}
                  className="d-inline-block mx-1 badge bg-light"
                >
                  #{el}
                </p>
              ))}
          </div>
        </MDBCard>
        <center>
          <span
            className="badge fs-6 d-block rounded-pill bg-danger m-2"
            type="submit"
            onClick={() => {
              axios
                .post(baseURL + `/delete_collection`, { id })
                .then(async (res) => {
                  console.log(res);
                })
                .catch((err) => console.log(err));
              window.location.reload();
            }}
          >
            Delete <AiFillDelete />
          </span>
        </center>
      </MDBCard>
      {isVisibleToast && <Toast message={toastMessage} />}{" "}
    </>
  );
}
