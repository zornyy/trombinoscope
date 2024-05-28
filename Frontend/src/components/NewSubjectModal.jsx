import { useState } from "react"
import ModalBase from "./ModalBase"

export default function NewSubjectModal() {

    const [visible, setVisible] = useState(false);
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
            <form className="max-w-sm mx-auto flex flex-col gap-4">
                <div className="mb-5">
                    <label htmlFor="nameInput" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name:</label>
                    <input id="nameInput" type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={handleNameInputChange} />
                </div>
                <div className="mb-5">
                    <label htmlFor="surnameInput" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Surname:</label>
                    <input id="surnameInput" type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={handleSurnameInputChange} />
                </div>
                <div className="mb-5">
                    <label htmlFor="descriptionInput" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description:</label>
                    <input id="descriptionInput" type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={handleDescriptionInputChange} />
                </div>
                <div className="mb-5">
                    <label htmlFor="sectionInput" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Section:</label>
                    <input id="sectionInput" type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={handleSectionInputChange} />
                </div>
                <div className="mb-5">
                    <label htmlFor="picturesInput" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Image:</label>
                    <input type="file" accept="image/*" id="picturesInput" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={handleFileInputChange} />
                </div>
            </form>
        </ModalBase>
    )
}