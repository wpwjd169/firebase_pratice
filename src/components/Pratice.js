import { dbSerivce } from "fbase";
import React, { useState } from "react";

let Pratice = ({ praticeObj, isOwner }) => {
    let [editing, setEditing] = useState(false);
    let [newPratice, setNewPratice] = useState(praticeObj.text);
    let onDeleteClick = async () => {
        const ok = window.confirm("정말로 지우기 원해요?");
        if (ok) {
            //delete 트윗
            await dbSerivce.doc(`pratices/${praticeObj.id}`).delete();
        }
    };
    let toggleEditing = () => setEditing((prev) => !prev);
    let onSubmit = async (event) => {
        event.preventDefault();
        await dbSerivce.doc(`pratices/${praticeObj.id}`).update({
            text: newPratice,
        })
        setEditing(false);
    }
    let onChange = (event) => {
        let { target: { value }, } = event;
        setNewPratice(value);
    }
    return (
        <div>
            {editing ? (
                <>
                    <form onSubmit={onSubmit}>
                        <input type="text" placeholder="Edit your pratice" value={newPratice} required onChange={onChange} />
                        <input type="submit" value="Update Pratice" />
                    </form>
                    <button onClick={toggleEditing} > 취소 </button>
                </>
            ) : (
                <>
                    <h4>{praticeObj.text}</h4>
                    {praticeObj.attachmentUrl && <img src={praticeObj.attachmentUrl} width="50px" height="50px" />}
                    {isOwner && (
                        <>
                            <button onClick={onDeleteClick}>Delete Pratice</button>
                            <button onClick={toggleEditing}>Edit Pratice</button>
                        </>
                    )}
                </>
            )}
        </div>
    )
};

export default Pratice;