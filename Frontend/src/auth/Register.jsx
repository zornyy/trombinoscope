import { useState, useEffect } from "react";
import Pocketbase from "pocketbase";
import "../App.css";

export default function Register() {

    const pb = new Pocketbase('http://127.0.0.1:8090');

    const [inputUsername, setInputUsername] = useState();
    const [inputPassword, setInputPassword] = useState();
    const [inputPasswordConfirm, setInputPasswordConfirm] = useState();
    const [inputEmail, setInputEmail] = useState();
    const [errorMsg, setErrorMsg] = useState("");


    /**
     * fonction asynchrone pour enregister et authentifier l'utilisateur
     */
    const handleClick = async() => {
        const data = {
            username : inputUsername,
            password : inputPassword,
            passwordConfirm : inputPasswordConfirm,
            email : inputEmail,
        };
        try {
            const record = await pb.collection('users').create(data);
            const recordLogin = await pb.collection('users').authWithPassword(inputEmail, inputPassword);
            window.location.replace("/");
        }
        catch(error) {
            console.log(error);
            setErrorMsg("Register Failed");
        }
        
    }

    /**
     * fonction pour changer la valeur du pseudo
     * @param {input qui envoie la requete} e 
     */
    const usernameHandleChange = (e) => {
        setInputUsername(e.target.value);
    }

    /**
     * fonction pour changer la valeur du mail
     * @param {input qui envoie la requete} e 
     */
    const emailHandleChange = (e) => {
        setInputEmail(e.target.value);
    }

    /**
     * fonction pour changer la valeur du mot de passe
     * @param {input qui envoie la requete} e 
     */
    const passwordHandleChange = (e) => {
        setInputPassword(e.target.value);
    }

    /**
     * fonction pour changer la valeur de la confirmation du mot de passe
     * @param {input qui envoie la requete} e 
     */
    const passwordConfirmHandleChange = (e) => {
        setInputPasswordConfirm(e.target.value);
    }

    return(
        <div id="register" className="form">
            <label>Username:</label>
            <input type="text" onChange={usernameHandleChange} placeholder="ex. John Doe"></input>
            <label>Email:</label>
            <input type="email" onChange={emailHandleChange} placeholder="ex. john.doe@gmail.com"></input>
            <label>Password:</label>
            <input type="password" onChange={passwordHandleChange} placeholder="choose a password..."></input>
            <label>Confirm Password:</label>
            <input type="password" onChange={passwordConfirmHandleChange} placeholder="confirm your password..."></input>
            <div style={{color: "red"}}>{errorMsg}</div>
            <div className="buttons">
                <button className="button-form" onClick={handleClick}>Register</button>
            </div>
        </div>
    )
}