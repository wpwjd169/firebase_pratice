import { authService } from "fbase";
import React from "react";
import { useHistory } from "react-router";

export default () => {
    let history = useHistory();
    let onLogOutClick = () => {
        authService.signOut();
        history.push("/");
    };
    return (
        <>
            <button onClick={onLogOutClick}>Log out</button>
        </>
    );
};