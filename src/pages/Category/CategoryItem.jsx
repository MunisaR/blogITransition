import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import NavBar from "../../components/navbar/NavBar";
import axios from "axios";
import { useEffect } from "react";
import { CollectionItem } from "../../components/CollectionItem/CollectionItem";
import { baseURL } from "../../extras/constants";
const tempId = "63e6621f74f7f24c640f774a";
const Categories = () => {
  const data = useLocation().state;
  const [collectionList, setCollectionList] = useState("");

  const fetchCollections = async () => {
    await axios
      .post(baseURL + "/get-collections-by-category", {
        CategoryId: tempId,
      })
      .then((r) => {
        console.log(r.data, "res.data");
        setCollectionList(r.data.collectionObjects);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchCollections();
  }, []);

  return (
    <>
      <NavBar
        add={{
          data,
          link: "/add-to-category",
          title: "Add to category",
        }}
      />
      <div className="my-2">
        <div className="container">
          <div className="row">
            <h1>hello</h1>
            {collectionList.length > 0 &&
              collectionList.map((el, i) => (
                <div key={i} className="col-sm-12 col-md-4 col-lg-3">
                  <h1>Hello</h1>

                  <CollectionItem
                    id={el._id}
                    image={el.image}
                    title={el.name}
                    tags={el.tags}
                    description={el.description}
                    link={el._id}
                    collection={el}
                  />
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Categories;
