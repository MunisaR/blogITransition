/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useLayoutEffect } from "react";
import { Link, redirect } from "react-router-dom";
import { AiFillFileExcel, AiFillSetting } from "react-icons/ai";
import { Toggle } from "react-hook-theme";
import { CSVLink } from "react-csv";

function NavBar({ category, add, search, csv_collection, csv_user }) {
  const [oneuser, setUser] = useState("");

  useLayoutEffect(() => {
    setUser(JSON.parse(localStorage.getItem("userObject")));
  }, []);
  useEffect(() => {}, [oneuser]);

  return (
    <>
      {oneuser && (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
          <div className="container-fluid">
            <a className="navbar-brand" href="/collections/Profile">
              {oneuser.fullName}
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarColor01"
              aria-controls="navbarColor01"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarColor01">
              <ul className="navbar-nav me-auto">
                <li className="nav-item">
                  <a className="nav-link" href="/collections">
                    Collections
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/collections/favourite">
                    Favourite
                  </a>
                </li>
                {category && (
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      state={category.state}
                      to={category.link}
                    >
                      {category.title}
                    </Link>
                  </li>
                )}
                {add && (
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      state={{ user: add.data, categories: add.categoryList }}
                      to={add.link}
                    >
                      {add.title}
                    </Link>
                  </li>
                )}
                <li className="nav-item">
                  <button
                    onClick={async () => {
                      localStorage.clear();
                      window.location.href = "/";
                    }}
                    className="btn nav-link"
                  >
                    Log out
                  </button>
                </li>
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    data-bs-toggle="dropdown"
                    href="#"
                    role="button"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Customizations <AiFillSetting />
                  </a>
                  <div className="dropdown-menu">
                    <div className="dropdown-item">
                      Theme:{" "}
                      <span>
                        <Toggle />
                      </span>
                    </div>
                    <div className="px-4">Language</div>

                    <div className="dropdown-divider"></div>
                    <div className="dropdown-item">
                      <div id="google_translate_element"></div>
                    </div>
                  </div>
                </li>
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    data-bs-toggle="dropdown"
                    href="#"
                    role="button"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Generator <AiFillFileExcel />
                  </a>
                  <div className="dropdown-menu">
                    {csv_collection && (
                      <div className=" p-3 text-decoration-none text-white">
                        <CSVLink
                          className="text-decoration-none text-primary"
                          headers={csv_collection.headers}
                          data={csv_collection.collections_data}
                        >
                          {csv_collection.download_title}
                        </CSVLink>
                      </div>
                    )}

                    <div className="dropdown-divider"></div>
                    {csv_user && (
                      <div className=" p-3 text-decoration-none text-white">
                        <CSVLink
                          className="text-decoration-none text-primary"
                          headers={csv_user.headers}
                          data={csv_user.user_csv}
                        >
                          {csv_user.download_title}
                        </CSVLink>
                      </div>
                    )}
                  </div>
                </li>
              </ul>
              {search && (
                <form className="d-flex">
                  <input
                    className="form-control me-sm-2"
                    type="search"
                    placeholder="Search"
                  />
                  <button
                    className="btn btn-secondary my-2 my-sm-0"
                    type="submit"
                  >
                    Search
                  </button>
                </form>
              )}
            </div>
          </div>
        </nav>
      )}
    </>
  );
}

export default NavBar;
