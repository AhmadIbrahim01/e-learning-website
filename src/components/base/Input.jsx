import React from "react";
import "../../styles/Input.css";

const Input = ({placeholder, onChange}) =>{
    return(
        <>
            <input placeholder={placeholder} onChange={onChange}/>
        </>
    )
}

export default Input;