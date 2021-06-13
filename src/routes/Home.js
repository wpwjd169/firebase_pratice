import Pratice from "components/Pratice";
import { dbSerivce } from "fbase";
import React, { useEffect, useState } from "react";

const Home = ({ userObj }) => {
    let [pratice, setPratice] = useState("");
    let [pratices, setPratices] = useState([]);
    useEffect(() => {
        dbSerivce.collection("pratices").onSnapshot((Snapshot) => {
            const praticeArray = Snapshot.docs.map(doc => ({ id: doc.id, ...doc.data(), }));
            setPratices(praticeArray);
        });
    }, []);
    let onSubmit = async (event) => {
        event.preventDefault();
        await dbSerivce.collection("pratices").add({
            text: pratice,
            createdAt: Date.now(),
            creatorId: userObj.uid,
        });
        setPratice("");
    }
    let onChange = (event) => {
        const { target: { value } } = event;
        setPratice(value);
    }
    console.log(pratices);
    let onFileChange = (event) => {
        console.log(event.target.files);
    }
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input value={pratice} onChange={onChange} type="text" placeholder="What's on your mind?" maxLength={120}></input>
                <input type="file" accept="image/*" onChange={onFileChange} />
                <input type="submit" value="Pratice"></input>
            </form>
            <div>
                {pratices.map((pratice) => (
                    <Pratice key={pratice.id} praticeObj={pratice} isOwner={pratice.creatorId === userObj.uid} />
                ))}
            </div>
        </div>
    );
};
export default Home;