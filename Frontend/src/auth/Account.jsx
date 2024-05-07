import Pocketbase from "pocketbase";
import { useState } from "react";
import Alert from '../components/Alert';
import "../App.css";

export default function Account() {

    const pb = new Pocketbase('http://127.0.0.1:8090');
    const user = pb.authStore.model;

    const [inputUsername, setInputUsername] = useState(user.username);
    const [errorMsg, setErrorMsg] = useState("");
    const [displayAlert, setDisplayAlert] = useState("none")


    /**
     * fonction pour changer la valeur du pseudo
     * @param {input qui envoie la requete} e 
     */
    const usernameHandleChange = (e) => {
        setInputUsername(e.target.value);
    }

    /**
     * fonction pour changer l'affichage du composant Alert.jsx
     */
    const showAlert = () => {
        if (displayAlert == "none") {
            setDisplayAlert("block")
        } else {
            setDisplayAlert("none")
        }
    }

    /**
     * fonction asynchrone pour changer le pseudo dans la base de données
     */
    const handleClickUpdate = async() => {
        const data = {
            username : inputUsername,
        };
        try {
            const record = await pb.collection('users').update(user.id, data);
            window.location.reload(false);
        }
        catch(error) {
            console.log(error);
            setErrorMsg("Couldn't update user infos");
        }
    }

    /**
     * fonction asynchrone pour supprimer le compte de la base de données
     */
    const handleClickDelete = async() => {
        console.log("k deleted");
        await pb.collection('users').delete(user.id);
        window.location.replace("/");
    }

    
    return(
        <div id="account" className="form">
            <div className='alert' style={{display: displayAlert}}>
                <Alert continue={handleClickDelete} cancel={showAlert} />
            </div>
            <h3>Welcome back {user.username}</h3>
            <p>Your current email: <br/>{user.email}</p>
            <label>Username:</label>
            <input type="text" onChange={usernameHandleChange} placeholder={user.username}></input>
            <div style={{color: "red"}}>{errorMsg}</div>
            <div className="buttons">
                <button className="button" onClick={() => setDisplayAlert("block")} style={{color: "red"}}>Delete Account</button>
                <button className="button" onClick={handleClickUpdate}>Update infos</button>
            </div>            
        </div>
    )
}