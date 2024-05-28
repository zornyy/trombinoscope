import { useContext, useState } from "react"
import ModalBase from "./ModalBase"
import { DBContext } from "./contexts/DBContext";

export default function NewSubjectModal({ show, onShowChanged, sections, onSave = undefined }) {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [formattedName, setFormattedName] = useState("");
    const [description, setDescription] = useState("");
    const [section, setSection] = useState("");
    const [image, setImage] = useState();

    const { db } = useContext(DBContext)

    const handleSubmit = async () => {
        const data = {
            first_name: firstName,
            last_name: lastName,
            formatted_name: formattedName,
            description: description,
            section_id: section,
            image: image,
            is_archived: false
        };
        try {
            await db.collection('Subject').create(data);
            onShowChanged(false)
        }
        catch (error) {
            console.error(error);
        }

    }


    return (
        <ModalBase title="Ajouter un sujet" show={show} onShowChanged={onShowChanged} onOk={handleSubmit}>
            <form className="max-w-sm mx-auto flex flex-col gap-4">
                <div className="flex">
                    <div className="mb-5">
                        <label htmlFor="lastname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nom :</label>
                        <input id="lastname" type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={(e) => setLastName(e.target.value)} />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="firstname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Prénom :</label>
                        <input id="firstname" type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={(e) => setFirstName(e.target.value)} />
                    </div>
                </div>
                <div className="mb-5">
                    <label htmlFor="formattedname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nom Formatté :</label>
                    <input id="formattedname" type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={(e) => setFormattedName(e.target.value)} />
                </div>
                <div className="mb-5">
                    <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description :</label>
                    <input id="description" type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={(e) => setDescription(e.target.value)} />
                </div>
                <div className="mb-5">
                    <label htmlFor="sections" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Section :</label>
                    <select id="sections" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={(e) => setSection(e.target.value)}>
                        <option value={null}>Choisit une section</option>
                        {sections.map((x) => <option value={x.id} key={x.id}>{x.name}</option>)}
                    </select></div>
                <div className="mb-5">
                    <label htmlFor="image" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Image :</label>
                    <input type="file" accept="image/*" id="image" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={(e) => setImage(e.target.files[0])} />
                </div>
            </form>
        </ModalBase>
    )
}