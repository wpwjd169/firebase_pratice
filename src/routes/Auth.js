import { authService, firebaseInstance } from "fbase";
import React, { useState } from "react";

let Auth = () => {
    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");
    let [newAccount, setNewAccount] = useState(true);
    let [error, setError] = useState("");
    let onChange = (event) => {
        let { target: { name, value } } = event;
        if (name === "email") {
            setEmail(value);
        } else if (name === "password") {
            setPassword(value);
        }
    };
    let onSubmit = async (event) => {
        event.preventDefault();
        try {
            let data;
            if (newAccount) {
                data = await authService.createUserWithEmailAndPassword(email, password);
            }
            else {
                data = await authService.signInWithEmailAndPassword(email, password);

            }
            console.log(data)
        } catch (error) {
            setError(error.message)
        }

    };
    let toggleAccount = () => setNewAccount(prev => !prev);
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
            <form onSubmit={onSubmit}>
                <input name="email" type="email" placeholder="Email" required value={email} onChange={onChange}></input>
                <input name="password" type="password" placeholder="Password" required value={password} onChange={onChange}></input>
                <input type="submit" value={newAccount ? "Create Account" : "Sign In"}></input>
                {error}
            </form>
            <span onClick={toggleAccount}>{newAccount ? "Sign In" : "Create Account"}</span>
            <div>
                <button onClick={onSocialClick} name="google">Continue with Google</button>
                <button onClick={onSocialClick} name="github">Contonue with Github</button>
            </div>
        </div>
    )
}

export default Auth;