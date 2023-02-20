import React, { useState, useEffect } from "react";
import { CollectionItem } from "../../components/CollectionItem/CollectionItem";
import axios from "axios";
import NavBar from "../../components/navbar/NavBar";
import { BsPlusLg } from "react-icons/bs";
import { Link } from "react-router-dom";
import Loader from "../../components/loader/Loader";
import { baseURL } from "../../extras/constants";

const Favouirite = () => {
  const [collectionList, setCollectionList] = useState("");
  const id = JSON.parse(localStorage.getItem("userObject"));
  const [content, setContent] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const fetchCollections = async () => {
    setIsLoading(true);
    if (!id) {
      setContent(false);
    }

    await axios
      .post(baseURL + "/get-fav", {
        id: id._id,
      })
      .then((res) => {
        setCollectionList(res.data.user[0]["favourite"]);
        console.log(res.data.user[0]["favourite"]);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);

        console.log(err);
      });
  };
  ///get-collections-by-category
  useEffect(() => {
    fetchCollections();
  }, []);
  return (
    <>
      <NavBar
        category={{
          title: "Add Category +",
          link: "/add_category",
          state: { id, collectionList },
        }}
      />
      {isLoading && <Loader />}
      {content ? (
        <>
          <div className="m-2">
            <center>
              <div
                className="btn-group"
                role="group"
                aria-label="Basic radio toggle button group"
              >
                <input
                  type="radio"
                  className="btn-check"
                  name="btnradio"
                  id="btnradio1"
                  defaultChecked
                  autoComplete="off"
                />
              </div>
            </center>
          </div>
          <div className="m-3">
            <div className="container p-3">
              <div className="row mb-2 ">
                {collectionList.length > 0 &&
                  collectionList.map((el, i) => (
                    <div key={i} className="col-sm-12 col-md-4 col-lg-3">
                      <CollectionItem
                        id={el._id}
                        image={el.image}
                        title={el.name}
                        tags={el.tags}
                        description={el.description}
                        link={el._id}
                        collection={el}
                        user={id}
                      />
                    </div>
                  ))}
              </div>
            </div>
          </div>
          <Link
            state={JSON.parse(localStorage.getItem("userObject"))}
            to={"/collections/add"}
          >
            <button
              style={{
                bottom: "40px",
                right: "20px",
                borderRadius: "100%",
              }}
              type="button"
              className="btn shadow p-3 position-absolute  btn-primary"
            >
              <BsPlusLg size={35} />
            </button>
          </Link>
        </>
      ) : (
        <h1 className="m-5 text-center"> You are not authorized </h1>
      )}
    </>
  );
};

export default Favouirite;
