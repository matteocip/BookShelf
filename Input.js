import React from "react";

export default function Input(props) {
    return(
        <div>
            <input className={props.className} type={props.type} placeholder={props.placeholder} onChange={props.onChange} value={props.value} ></input>
        </div>
    )
}