/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable react/jsx-no-comment-textnodes */
import axios from "axios";
import React from "react";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { Link } from "react-router-dom";
import { baseURL } from "../../extras/constants";

function TableComponent({ head = [], body = [] }) {
  return (
    <>
      <table className="table">
        <thead>
          <tr>
            {head.map((header, i) => {
              return (
                <th scope="col" key={i}>
                  {header}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {body.map((body, i) => {
            return (
              <tr key={i}>
                <th scope="row">{i + 1}</th>
                <td>{body.fullName}</td>
                <td>{body.gender}</td>
                <td>{body.email}</td>
                <td>{body.phone}</td>
                <td>
                  {body.role === "Admin" ? (
                    <p className={"badge bg-danger rounded-4"}>{body.role}</p>
                  ) : (
                    body.role
                  )}
                </td>
                <td>
                  <button
                    onClick={() => {
                      axios
                        .post(baseURL + `/delete_user`, { id: body._id })
                        .then(async (res) => {
                          if (res.status === 200 || res.statusText === "OK") {
                          } else {
                            alert("something went wrong");
                          }
                        })
                        .catch((err) => console.log(err));
                      window.location.reload();
                    }}
                    className="btn mx-4 btn-danger"
                    type="submit"
                  >
                    <MdOutlineDeleteOutline size={20} />
                  </button>
                </td>
                <td>
                  <Link
                    state={body}
                    className="text-decoration-none"
                    to={`/admin/${body._id}`}
                  >
                    See Collections
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <>
        {body.length === 0 && (
          <h1 className="text-center m-5">Nothing found</h1>
        )}
      </>
    </>
  );
}

export default TableComponent;
