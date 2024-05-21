import { useState } from "react"
import ModalBase from "./ModalBase"

export default function NewSubjectModal() {

    const [visible, setVisible] = useState(true);
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [description, setDescription] = useState("");
    const [section, setSection] = useState("");
    const [file, setFile] = useState();

    const handleSubmit = () => {
        console.log("BRUH");
    }

    const handleNameInputChange = (v) => {
        setName(v);
    }

    const handleSurnameInputChange = (v) => {
        setSurname(v);
    }

    const handleDescriptionInputChange = (v) => {
        setDescription(v);
    }

    const handleSectionInputChange = (v) => {
        setSection(v);
    }
    
    const handleFileInputChange = (v) => {
        setFile(document.getElementById('picturesInput').files[0]);
    }


    return (
        <ModalBase title="Ajouter un sujet" show={visible} onShowChanged={setVisible} onOk={handleSubmit}>
            <form>
                <label htmlFor="">
                    Name:
                    <input type="text" onChange={handleNameInputChange}/>
                </label>
                <label htmlFor="">
                    Surname:
                    <input type="text" onChange={handleSurnameInputChange}/>
                </label>
                <label htmlFor="">
                    Description:
                    <input type="text" onChange={handleDescriptionInputChange}/>
                </label>
                <label htmlFor="">
                    Section:
                    <input type="text" onChange={handleSectionInputChange}/>
                </label>
                <label htmlFor="">
                    Image:
                    <input type="file" accept="image/*" id="picturesInput" onChange={handleFileInputChange} />
                </label>
            </form>
        </ModalBase>
    )
}