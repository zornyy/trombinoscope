import { useState } from "react";
import "../App.css";
import { DBContext } from "../components/contexts/DBContext";

export default function Login() {

    const {db} = useContext(DBContext)

    const [inputPassword, setInputPassword] = useState();
    const [inputUsername, setInputUsername] = useState();
    const [errorMsg, setErrorMsg] = useState("");

    /**
     * fonction asynchrone pour authentifier l'utilisateur
     */
    const handleClick = async() => {
        let password = inputPassword;
        let username = inputUsername;
        try {
            const record = await db.collection('users').authWithPassword(username, password);
            window.location.replace("/");
        }
        catch(error) {
            setErrorMsg("Log in Failed");
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
     * fonction pour changer la valeur du pseudo
     * @param {input qui envoie la requete} e 
     */
    const passwordHandleChange = (e) => {
        setInputPassword(e.target.value);
    }

    return(
        <div id="login" className="form">
            <label>Username:</label>
            <input type="text" onChange={usernameHandleChange} placeholder="enter your username..."></input>
            <label>Password:</label>
            <input type="password" onChange={passwordHandleChange} placeholder="enter your password..."></input>
            <div style={{color: "red"}}>{errorMsg}</div>
            <div className="buttons">
                <button className="button-form" onClick={handleClick}>Login</button>
            </div>
        </div>
    )
}