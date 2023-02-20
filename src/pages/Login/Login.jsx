import React, { useState } from "react";
import animationData from "./munisaLogin.json";
import Lottie from "react-lottie";
import axios from "axios";
import { Link, redirect } from "react-router-dom";
import Loader from "../../components/loader/Loader";
import { baseURL } from "../../extras/constants";

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="p-3">
      {isLoading && <Loader />}
      <h1 className="text-center m-4">Login page</h1>
      <Lottie options={defaultOptions} height={310} width={310} />
      <div className="container d-flex justify-content-center">
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              className="form-control"
              id="exampleInputPassword1"
            />
          </div>

          <button
            type="submit"
            onClick={async () => {
              setIsLoading(true);
              const userCredentials = {
                email,
                password,
              };
              await axios
                .post(baseURL + "/login", userCredentials)
                .then((response) => {
                  if (response.status === 200) {
                    if (response.data.user[0].role === "Admin") {
                      localStorage.setItem(
                        "userRole",
                        response.data.user[0].role
                      );
                      localStorage.setItem(
                        "userObject",
                        JSON.stringify(response.data.user[0])
                      );
                      setIsLoading(false);
                      return redirect("/admin");
                    } else {
                      localStorage.setItem("userObject", response.data.user[0]);
                      localStorage.setItem(
                        "userObject",
                        JSON.stringify(response.data.user[0])
                      );
                      setIsLoading(false);

                      window.location.href = "/collections";
                    }
                  }
                })
                .catch((error) => {
                  setIsLoading(false);

                  console.log(error);
                });
            }}
            className="btn btn-primary"
          >
            Log in
          </button>
          <br />
          <br />
          <p>
            Don't have an account?{" "}
            <Link className="mx-2" to="/register">
              <span style={{ textDecoration: "underline" }}>Register</span>
            </Link>
            /
            <Link className="mx-2" to="/guest">
              <span style={{ textDecoration: "underline" }}>
                {" "}
                See all collections
              </span>
            </Link>
          </p>
        </form>
      </div>
      <div className="">
        <div></div>
      </div>
    </div>
  );
}

export default Login;
