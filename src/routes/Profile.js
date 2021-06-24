import { authService, dbSerivce } from "fbase";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const Fn = ({ userObj, refreshUser }) => {
    let history = useHistory();
    let [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
    let onLogOutClick = () => {
        authService.signOut();
        history.push("/");
        refreshUser();
    };
    const getMyPratices = async () => {
        let pratices = await dbSerivce
            .collection("pratices")
            .where("creatorId", "==", userObj.uid)
            .orderBy("createdAt")
            .get();
    };
    useEffect(() => {
        getMyPratices();
    }, []);

    let onChange = (event) => {
        let {
            target: { value },
        } = event;
        setNewDisplayName(value);
    }
    let onSubmit = async (event) => {
        event.preventDefault();
        if (userObj.displayName !== newDisplayName) {
            await userObj.updateProfile({
                displayName: newDisplayName,
            });
            refreshUser();
        }
    }
    return (
        <>
            <form onSubmit={onSubmit}>
                <input
                    onChange={onChange}
                    type="text"
                    placeholder="Display name"
                    value={newDisplayName}
                />
                <input type="submit" value="Update Profile" />
            </form>
            <button onClick={onLogOutClick}>Log out</button>
        </>
    );
};
export default Fn;