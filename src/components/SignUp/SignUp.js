import React, { useState, useEffect } from "react";
import "./SignUp.css";

import { TextField } from "@material-ui/core";
import { Link, useLocation, useHistory } from "react-router-dom";
import { auth } from "../../firebase/Config";
import Login from "../Login/Login";
import LoginWith from "../../components/LoginWith/LoginWith";

function SignUp({ user, setUser }) {
  const history = useHistory();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };

  const [login, setLogin] = useState(false);
  const [newUser, setnewUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const initialUser = {
    ...newUser,
  };

  const [password, setPassword] = useState("");

  const handleBlur = (e) => {
    if (e.target.name === "firstName") {
      if (e.target.value.length < 3) {
        initialUser[`${e.target.name}`] = "";
        document.getElementById("firstNameError").innerText =
          "Name must contain minimum 3 character";
        return;
      }

      document.getElementById("firstNameError").innerText = "";
    }

    if (e.target.name === "lastName") {
      if (e.target.value.length < 3) {
        initialUser[`${e.target.name}`] = "";
        document.getElementById("lastNameError").innerText =
          "Name must contain minimum 3 character";
        return;
      }
      document.getElementById("lastNameError").innerText = "";
    }

    if (e.target.name === "email") {
      const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!re.test(e.target.value)) {
        initialUser[`${e.target.name}`] = "";
        document.getElementById("emailError").innerText = "Enter a value email";
        return;
      }
      document.getElementById("emailError").innerText = "";
    }
    if (e.target.name === "password") {
      if (e.target.value.length < 6) {
        initialUser[`${e.target.name}`] = "";
        document.getElementById("passwordError").innerText =
          "Password must contain minimum 6 character";
        return;
      }
      document.getElementById("passwordError").innerText = "";
    }
    if (e.target.name === "confirm") {
      if (e.target.value !== password) {
        initialUser[`${e.target.name}`] = "";
        document.getElementById("confirmError").innerText =
          "Password aren't match";
        return;
      }
      document.getElementById("confirmError").innerText = "";
    }

    initialUser[`${e.target.name}`] = e.target.value;

    setnewUser({ ...initialUser });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    document.getElementById("errorMessage").innerText = "";

    if (
      newUser.firstName &&
      newUser.lastName &&
      newUser.email &&
      newUser.password &&
      newUser.confirm
    ) {
      console.log(newUser);
      auth
        .createUserWithEmailAndPassword(newUser.email, newUser.password)
        .then((res) => {
          let tempUser = auth.currentUser;
          tempUser.updateProfile({
            displayName: newUser.firstName + " " + newUser.lastName,
          });
          console.log(user, tempUser);
          setUser({ email: newUser.email, password: newUser.password });
          history.replace(from);
        })
        .catch(function (error) {
          console.log(error.message);
          document.getElementById("errorMessage").innerText = error.message;
        });
    } else {
      document.getElementById("errorMessage").innerText =
        "Please correct all the fields";
      return;
    }
  };

  return (
    <div className="login-page d-flex flex-column align-items-center justify-content-center">
      <div className="container d-flex flex-column justify-content-center ">
        {!login ? (
          <Login user={user} setUser={setUser} setLogin={setLogin} />
        ) : (
          <form onSubmit={handleSubmit} className="signup-form">
            <h5>Create an account</h5>
            <TextField
              id="standard-basic"
              className="form-control my-2"
              label="First Name"
              name="firstName"
              onChange={handleBlur}
            />
            <p className="text-danger mt-2" id="firstNameError"></p>

            <TextField
              id="standard-basic"
              className="form-control my-2"
              label="Last Name"
              name="lastName"
              onChange={handleBlur}
            />
            <p className="text-danger mt-2" id="lastNameError"></p>

            <TextField
              id="standard-basic"
              className="form-control my-2"
              label="Enter email"
              name="email"
              onChange={handleBlur}
            />
            <p className="text-danger mt-2" id="emailError"></p>

            <TextField
              id="standard-basic"
              className="form-control my-2"
              label="Password"
              type="password"
              name="password"
              onBlur={handleBlur}
              onChange={(e) => setPassword(e.target.value)}
            />
            <p className="text-danger mt-2" id="passwordError"></p>

            <TextField
              id="standard-basic"
              type="password"
              className="form-control my-2"
              label="Confirm Password"
              name="confirm"
              onChange={handleBlur}
            />
            <p className="text-danger mt-2" id="confirmError"></p>

            <p className="text-danger mt-2" id="errorMessage"></p>

            <button className="btn-block submit-button my-3">
              Create an Account
            </button>

            <p>
              Already have an account?
              <Link onClick={(e) => setLogin(false)}> Login </Link>
            </p>
          </form>
        )}

        <div className="d-flex or-border">
          <div></div>
          <p>Or</p>
          <div></div>
        </div>

        <LoginWith user={user} setUser={setUser} />
      </div>
    </div>
  );
}

export default SignUp;
