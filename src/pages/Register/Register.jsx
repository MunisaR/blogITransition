import React, { useState } from "react";
import animationData from "../Page assets/reg.json";
import Lottie from "react-lottie";
import axios from "axios";
import { Link } from "react-router-dom";
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
function Registration() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("not selected");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  return (
    <div className="p-1">
      {isLoading && <Loader />}
      <h1 className="text-center m-1">Registration page</h1>
      <Lottie options={defaultOptions} height={150} width={150} />
      <div className="container d-flex justify-content-center">
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <div className="mb-2">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Full name
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => {
                setFullName(e.target.value);
              }}
              required
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
          </div>
          <div className="mb-2">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              required
              aria-describedby="emailHelp"
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-2">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Phone number
            </label>
            <input
              type="number"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
              }}
              required
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
            <div id="emailHelp" className="form-text">
              We'll never share your phone number with anyone else.
            </div>
          </div>
          <div className="mb-2">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Choose your gender
            </label>
            <div className="form-check">
              <input
                value={"male"}
                onChange={(e) => {
                  setGender(e.target.value);
                }}
                required
                className="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault1"
              />
              <label className="form-check-label" htmlFor="flexRadioDefault1">
                Male
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault2"
                value={"female"}
                onChange={(e) => {
                  setGender(e.target.value);
                }}
                required
              />
              <label className="form-check-label" htmlFor="flexRadioDefault2">
                Female
              </label>
            </div>
          </div>
          <div className="mb-2">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              required
              type="password"
              className="form-control"
              id="exampleInputPassword1"
            />
          </div>

          <div className="mb-2">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Confirm Password
            </label>
            <input
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
              required
              type="password"
              className="form-control"
              id="exampleInputPassword1"
            />
          </div>
          <button
            onClick={async () => {
              setIsLoading(true);
              const user = {
                fullName,
                email,
                gender,
                phone,
                password,
                confirmPassword,
              };

              await axios
                .post(baseURL + "/create_user", { user })
                .then((response) => {
                  localStorage.setItem(
                    "userObject",
                    JSON.stringify(response.data.newUser)
                  );
                  if (response.status === 200) {
                    localStorage.setItem(
                      "userObject",
                      JSON.stringify(response.data.newUser)
                    );
                    setIsLoading(false);
                    window.location.href = "/collections";
                  }
                })
                .catch((error) => {
                  setIsLoading(false);

                  console.log(error);
                });
            }}
            type="submit"
            className="btn btn-primary"
          >
            Register
          </button>
          <br />
          <br />
          <p>
            Don't have an account?{" "}
            <Link to="/login">
              <span style={{ textDecoration: "underline" }}>Login</span>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Registration;
