import React, { useState } from "react";
import "./Login";
import { TextField } from "@material-ui/core";
import { Link, useLocation, useHistory } from "react-router-dom";
import { auth } from "../../firebase/Config";

function Login({ user, setUser, setLogin }) {
  const history = useHistory();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email && !password) {
      document.getElementById("errorMessage").innerText =
        "Enter all vales correctly";
      return;
    }

    await auth
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        let tempUser = auth.currentUser;
        setUser(tempUser);
        history.replace(from);
      })
      .catch(function (error) {
        document.getElementById("errorMessage").innerText = error.message;
      });
  };

  const forgetPassword = async () => {
    if (!email) {
      document.getElementById("errorMessage").innerText = "Enter Email";
      return;
    }
    auth
      .sendPasswordResetEmail(email)
      .then(function () {
        alert("Check your Email. Reset email has been sent");
      })
      .catch(function (error) {
        document.getElementById("errorMessage").innerText = error.message;
      });
  };

  return (
    <div className="container d-flex flex-column align-items-center justify-content-center">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h5 className="my-3">Log into your account</h5>
        <TextField
          id="standard-basic"
          className="form-control my-3"
          label="Enter email"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextField
          id="standard-basic"
          className="form-control"
          type="password"
          label="Password"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="d-flex justify-content-between my-3">
          <div className="div">
            <input type="checkbox" name="" id="" />
            <small>Remember me</small>
          </div>

          <button
            type="button"
            className="btn text-info"
            onClick={forgetPassword}
          >
            Forget Password
          </button>
        </div>

        <p className="text-danger mt-2" id="errorMessage"></p>
        <button type="submit" className="btn-block submit-button my-4">
          Log in
        </button>

        <p>
          No account?{" "}
          <Link onClick={(e) => setLogin(true)}> Create new account </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
