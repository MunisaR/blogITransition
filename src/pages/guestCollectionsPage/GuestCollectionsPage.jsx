import React, { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "../../components/navbar/NavBar";
import { useLocation } from "react-router-dom";
import { GuestCollectionItem } from "../../components/Guest Collection Item/GuestCollectionItem";
import { baseURL } from "../../extras/constants";

export function GuestCollectionsPage() {
  const [collectionList, setCollectionList] = useState("");
  const id = useLocation().state;
  const [isLoading, setIsLoading] = useState(false);

  const fetchCollections = async () => {
    setIsLoading(true);

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
  return (
    <>
      <NavBar
        category={{
          title: "Add Category +",
          link: "/add_category",
          state: { id, collectionList },
        }}
      />

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
                    <GuestCollectionItem
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
      </>
    </>
  );
}
