import { useState, useContext } from "react"
import "../App.css"
import { DBContext } from "../components/contexts/DBContext"

export default function Register() {

    const {db} = useContext(DBContext);

    const [inputUsername, setInputUsername] = useState();
    const [inputPassword, setInputPassword] = useState();
    const [inputPasswordConfirm, setInputPasswordConfirm] = useState();
    const [inputEmail, setInputEmail] = useState();
    const [errorMsg, setErrorMsg] = useState("");
    //TODO CHECK password length


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
            const record = await db.collection('Users').create(data);
            const recordLogin = await db.collection('Users').authWithPassword(inputEmail, inputPassword);
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
        <form className="max-w-sm mx-auto border-solid rounded-2xl border-2 px-20 py-6">
            <div className="mb-5">
                <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nom d'utilisateur</label>
                <input type="text" id="username" onChange={usernameHandleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John Doe" required />
            </div>
            <div className="mb-5">
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                <input type="email" id="email" onChange={emailHandleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@sntechs.com" required />
            </div>
            <div className="mb-5">
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mot de passe</label>
                <input type="password" id="password" onChange={passwordHandleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
            </div>
            <div className="mb-5">
                <label htmlFor="repeat_password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirmer le mot de passe</label>
                <input type="password" id="repeat_password" onChange={passwordConfirmHandleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
            </div>
            <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={handleClick}>Submit</button>
        </form>
    )
}