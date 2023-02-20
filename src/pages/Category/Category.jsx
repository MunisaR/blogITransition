import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import NavBar from "../../components/navbar/NavBar";
import axios from "axios";
import { useEffect } from "react";
import { useRef } from "react";
import { baseURL } from "../../extras/constants";

const Category = ({ link, collections }) => {
  const data = useLocation().state;
  const [categoryName, setCategoryName] = useState("");
  const [categoryList, setCategoryList] = useState("");

  const btn = useRef();
  useEffect(() => {}, [categoryList]);

  return (
    <>
      <NavBar
        add={{
          data,
          categoryList,
          link: "/add-to-category",
          title: "Add to category",
        }}
      />
      <div className="container py-5">
        <div className="container m-3 p-4">
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              await axios
                .post(baseURL + "/create_category", { name: categoryName })
                .then(async (res) => {
                  await axios
                    .post(baseURL + "/add-category-to-user", {
                      CategoryId: res.data.category._id,
                      UserId: data.id._id,
                    })
                    .then(async (res) => {
                      console.log(res);
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                })
                .catch((err) => {
                  console.log(err);
                });
            }}
            className="d-flex"
            action="frontend/src/pages"
          >
            <input
              className="form-control"
              type="text"
              required
              value={categoryName}
              onChange={(e) => {
                setCategoryName(e.target.value);
              }}
              placeholder="category name"
              aria-label="default input example"
            />
            <button
              ref={btn}
              id="listcat"
              onClick={async () => {
                await axios
                  .post(baseURL + "/get-category-from-user", {
                    UserId: data.id._id,
                  })
                  .then((r) => {
                    setCategoryList(r.data.categoryObjects);
                  });
              }}
              type="submit"
              className="btn mx-2 btn-primary"
            >
              Create Category
            </button>
          </form>
        </div>

        <div className="container my-5 py-2">
          {categoryList &&
            categoryList.map((value, index) => {
              return (
                <div className="list-group list-group-light rounded">
                  <ul className="">
                    <Link
                      className="text-decoration-none rounded hover-overlay "
                      to={`/add_category/${value._id}`}
                    >
                      <li
                        className="list-group-item d-flex justify-content-between align-items-center"
                        style={{
                          backgroundColor: "#ECF9FF",
                          borderColor: "#B2B2B2",
                        }}
                      >
                        <h4>{value.name.toLocaleUpperCase()}</h4>
                        <span className="badge bg-primary rounded-pill">
                          {value.collections.length}
                        </span>
                      </li>
                    </Link>
                  </ul>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default Category;
