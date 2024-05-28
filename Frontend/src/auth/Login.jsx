import { useContext, useState } from "react";
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
        <form id="login" className="form max-w-sm mx-auto border-solid rounded-2xl border-2 px-20 py-6">
            <div className="mb-5">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nom d'utilisateur:</label>
                <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" onChange={usernameHandleChange} placeholder="enter your username..."></input>
            </div>
            <div className="mb-5">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password:</label>
                <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="password" onChange={passwordHandleChange} placeholder="enter your password..."></input>
            </div>
            <div style={{color: "red"}}>{errorMsg}</div>
            
            <div className="buttons">
                <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={handleClick}>Login</button>
            </div>
        </form>
    )
}