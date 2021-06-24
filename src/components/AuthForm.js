import { authService } from "fbase";
import React, { useState } from "react";

let AuthForm = () => {
    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");
    let [newAccount, setNewAccount] = useState(true);
    let [error, setError] = useState("");
    let toggleAccount = () => setNewAccount(prev => !prev);
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
    let onChange = (event) => {
        let { target: { name, value } } = event;
        if (name === "email") {
            setEmail(value);
        } else if (name === "password") {
            setPassword(value);
        }
    };
    return (
        <>
            <form onSubmit={onSubmit}>
                <input name="email" type="email" placeholder="Email" required value={email} onChange={onChange}></input>
                <input name="password" type="password" placeholder="Password" required value={password} onChange={onChange}></input>
                <input type="submit" value={newAccount ? "Create Account" : "Sign In"}></input>
                {error}
            </form>
            <button>
                <span onClick={toggleAccount}>{newAccount ? "Sign In" : "Create Account"}</span>
            </button>
        </>
    );

};

export default AuthForm;