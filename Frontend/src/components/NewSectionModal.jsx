import { useContext, useState } from "react"
import ModelBase from "./ModalBase"
import { DBContext } from "./contexts/DBContext";

export default function NewSectionModal({show, onShowChanged, onSave=undefined}) {
    const {db} = useContext(DBContext);

    const [name, setName] = useState();
    const [description, setDescription] = useState();

    const handleClick = async() => {
        const data = {
            name: name,
            description: description
        };
        try {
            const record = await db.collection('Trombino').create(data);
            onShowChanged(false)
        }
        catch(error) {
            console.error(error);
        }
        
    }

    const nameHandleChange = (e) => {
        setName(e.target.value);
    }
    const descriptionHandleChange = (e) => {
        setDescription(e.target.value);
    }
    return (
        <ModelBase title="Nouvelle section" show={show} onShowChanged={onShowChanged} onOk={handleClick}>
            <div className="p-4 md:p-5 space-y-4">
                <form className="max-w-sm mx-auto flex flex-col gap-4">
                    <div className="mb-5">
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nom</label>
                        <input type="text" id="name" onChange={nameHandleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Nom" required />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                        <input type="text" id="description" onChange={descriptionHandleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                    </div>
                </form>
            </div>
        </ModelBase>
    )
}