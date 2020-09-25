import React from "react";
import "./LoginWith.style.css";
import { Link, useLocation, useHistory } from "react-router-dom";
import { auth } from "../../firebase/Config";
import firebase from "firebase/app";
import googleLogo from "../../FakeData/Icon/google.png";
import fbLogo from "../../FakeData/Icon/fb.png";

function LoginWith({ user, setUser }) {
  const history = useHistory();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };

  const loginWithFacebook = async () => {
    const provider = new firebase.auth.FacebookAuthProvider();
    provider.setCustomParameters({
      display: "popup",
    });

    await auth
      .signInWithPopup(provider)
      .then(function (result) {
        const user = result.user;
        setUser(user);
        console.log(user);
      })
      .catch(function (error) {
        alert(error.message);
      });

    if (user) {
      history.replace(from);
    }
  };

  const loginWithGoogle = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.setCustomParameters({
      display: "popup",
    });

    await auth
      .signInWithPopup(provider)
      .then(function (result) {
        const user = result.user;
        setUser(user);
        console.log(user);
      })
      .catch(function (error) {
        alert(error.message);
        return;
      });
    if (user) {
      history.replace(from);
    }
  };

  return (
    <div className="d-flex flex-column justify-content-center">
      <button className="with-google" onClick={loginWithGoogle}>
        <img src={googleLogo} alt="" />
        <p className="mx-auto">Continue With Google</p>
      </button>
      <button className="with-facebook" onClick={loginWithFacebook}>
        <img src={fbLogo} alt="" />
        <p className="mx-auto">Continue With Facebook</p>
      </button>
    </div>
  );
}

export default LoginWith;
