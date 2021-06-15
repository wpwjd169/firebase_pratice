import Pratice from "components/Pratice";
import { v4 as uuidv4 } from "uuid";
import { dbSerivce, storageService } from "fbase";
import React, { useEffect, useState } from "react";
import { file } from "@babel/types";

const Home = ({ userObj }) => {
    let [pratice, setPratice] = useState("");
    let [pratices, setPratices] = useState([]);
    let [attachment, setAttachment] = useState([]);
    useEffect(() => {
        dbSerivce.collection("pratices").onSnapshot((Snapshot) => {
            const praticeArray = Snapshot.docs.map(doc => ({ id: doc.id, ...doc.data(), }));
            setPratices(praticeArray);
        });
    }, []);
    let onSubmit = async (event) => {
        event.preventDefault();
        let attachmentUrl = "";
        if (attachment != "") {
            let fileRef = storageService.ref().child(`${userObj.uid}/${uuidv4()}`);
            let response = await fileRef.putString(attachment, "data_url");
            attachmentUrl = await response.ref.getDownloadURL();
        }
        let praticeObj = {
            text: pratice,
            createdAt: Date.now(),
            creatorId: userObj.uid,
            attachmentUrl,
        }
        await dbSerivce.collection("pratices").add(praticeObj);

        setPratice("");
    }
    let onChange = (event) => {
        const { target: { value } } = event;
        setPratice(value);
    }
    console.log(pratices);
    let onFileChange = (event) => {
        let {
            target: { files },
        } = event;
        let theFile = files[0];
        let reader = new FileReader();
        reader.onloadend = (finishedEvent) => {
            let { currentTarget: { result }, } = finishedEvent;
            setAttachment(result)
        };
        reader.readAsDataURL(theFile);
    }
    let onClearAttachment = () => {
        setAttachment(null);
    }
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input value={pratice} onChange={onChange} type="text" placeholder="What's on your mind?" maxLength={120}></input>
                <input type="file" accept="image/*" onChange={onFileChange} />
                <input type="submit" value="Pratice"></input>
                {attachment && (<div>
                    <img src={attachment} width="50px" height="50px" />
                    <button onClick={onClearAttachment}>Clear</button>
                </div>
                )}
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