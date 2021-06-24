import AuthForm from "components/AuthForm";
import { authService, firebaseInstance } from "fbase";
import React, { useState } from "react";

let Auth = () => {
    let onSocialClick = async (event) => {
        let { target: { name }, } = event;
        let provider;
        if (name === "google") {
            provider = new firebaseInstance.auth.GoogleAuthProvider();
        } else if (name === "github") {
            provider = new firebaseInstance.auth.GithubAuthProvider();
        };
        let data = await authService.signInWithPopup(provider);
        console.log(data);
    };
    return (
        <div>
            <AuthForm />
            <div>
                <button onClick={onSocialClick} name="google">Continue with Google</button>
                <button onClick={onSocialClick} name="github">Continue with Github</button>
            </div>
        </div>
    )
}

export default Auth;