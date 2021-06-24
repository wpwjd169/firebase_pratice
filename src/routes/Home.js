import Pratice from "components/Pratice";
import { dbSerivce } from "fbase";
import React, { useEffect, useState } from "react";
import { file } from "@babel/types";
import PraticeFactory from "components/PraticeFactory";

const Home = ({ userObj }) => {
    let [pratices, setPratices] = useState([]);
    useEffect(() => {
        dbSerivce.collection("pratices").onSnapshot((Snapshot) => {
            const praticeArray = Snapshot.docs.map(doc => ({ id: doc.id, ...doc.data(), }));
            setPratices(praticeArray);
        });
    }, []);
    return (
        <div>
            <PraticeFactory userObj={userObj} >

            </PraticeFactory>
            <div>
                {pratices.map((pratice) => (
                    <Pratice key={pratice.id} praticeObj={pratice} isOwner={pratice.creatorId === userObj.uid} />
                ))}
            </div>
        </div>
    );
};
export default Home;