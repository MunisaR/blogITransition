import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import NavBar from "../../components/navbar/NavBar";
import { baseURL } from "../../extras/constants";

const GuestPage = () => {
  const [allUsers, setAllUsers] = useState("");
  const fetchAllUsers = async () => {
    await axios
      .get(baseURL + "/get_all_users")
      .then((r) => {
        setAllUsers(r.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    fetchAllUsers();
  }, []);
  return (
    <>
      <NavBar />
      <div className="container py-5">
        <h1 className="my-2">See other's collections</h1>
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Fullname</th>
              <th scope="col">Gender</th>
              <th scope="col">Email</th>
              <th scope="col">Phone</th>
              <th scope="col">Role</th>
            </tr>
          </thead>
          <tbody>
            {allUsers &&
              allUsers.map((user, i) => (
                <tr key={i}>
                  <th scope="row">{i + 1}</th>
                  <td>
                    <Link to="/guest/collections" state={user}>
                      {user.fullName}
                    </Link>
                  </td>
                  <td>{user.gender}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{user.role}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default GuestPage;
