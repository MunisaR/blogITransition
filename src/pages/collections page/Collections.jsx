import React, { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "../../components/navbar/NavBar";
import { BsPlusLg } from "react-icons/bs";
import { Link } from "react-router-dom";
import Loader from "../../components/loader/Loader";
import CustomCollectionItem from "../../components/CollectionItem/CustomCollectionItem";
import {
  headersCollections,
  userCollectionHeader,
} from "../../extras/constants";
import { baseURL } from "../../extras/constants";

export function Collections() {
  const [collectionList, setCollectionList] = useState("");
  const id = JSON.parse(localStorage.getItem("userObject"));
  const [content, setContent] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTag, setSearchTag] = useState("");
  const [close, setClose] = useState(true);
  const selectTag = (t) => {
    setSearchTag(t);
    setClose(false);
  };
  const fetchCollections = async () => {
    setIsLoading(true);
    if (!id) {
      setContent(false);
    }

    await axios
      .post(baseURL + "/get_user", {
        id: id._id,
      })
      .then((res) => {
        setCollectionList(res.data.col);
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

  let collections_data = [];
  let user_csv = [id];

  return (
    <div className={"container-fluid"}>
      <NavBar
        category={{
          title: "Add Category +",
          link: "/add_category",
          state: { id, collectionList },
        }}
        csv_collection={{
          collections_data,
          headers: headersCollections,
          download_title: "Download Collection CSV",
        }}
        csv_user={{
          user_csv,
          headers: userCollectionHeader,
          download_title: "Download User CSV",
        }}
      />
      {isLoading && <Loader />}

      {!close && (
        <div
          className="container rounded my-5 p-3"
          style={{ backgroundColor: "#ECF9FF" }}
        >
          <div className="d-flex justify-content-between">
            <h5 className="fs-3 text-black-50 font-weight-bold">Result</h5>{" "}
            <span
              role="button"
              onClick={() => {
                setClose(true);
              }}
              className=""
            >
              ❌
            </span>
          </div>

          <div className="container p-3">
            <div className="row mb-2 ">
              {searchTag &&
                searchTag.filtered.map((el, i) => {
                  collections_data.push(el);
                  return (
                    <div key={i} className="col-sm-12 col-md-4 col-lg-3">
                      <CustomCollectionItem
                        id={el._id}
                        image={el.image}
                        title={el.name}
                        tags={el.tags}
                        description={el.description}
                        link={el._id}
                        collection={el}
                        user={id}
                        onSelectTag={selectTag}
                      />
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      )}
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
                  collectionList.map((el, i) => {
                    collections_data.push(el);
                    return (
                      <div key={i} className="col-sm-12 col-md-4 col-lg-3">
                        <CustomCollectionItem
                          id={el._id}
                          image={el.image}
                          title={el.name}
                          tags={el.tags}
                          description={el.description}
                          link={el._id}
                          collection={el}
                          user={id}
                          onSelectTag={selectTag}
                        />
                      </div>
                    );
                  })}
                <div className="col-sm-12 col-md-4 col-lg-3"></div>
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
    </div>
  );
}
