import { useContext, useEffect, useState } from "react"
import ModelBase from "./ModalBase"
import { DBContext } from "./contexts/DBContext";
import {CSVImporter} from "csv-import-react";

export default function ImportCsvModal({ show, onShowChanged, id }) {
    const { db } = useContext(DBContext);
    const [open, setOpen] = useState(false)

    const handleClick = async(e) => {

        const data = {
            name: name,
            description: description,
            user_id: db.authStore.model.id,
            is_archived: false
        };
        try {
            const record = await db.collection('Trombino').create(data);
            onShowChanged(false)
        }
        catch (error) {
            console.error(error);
        }

    }

    const close = async(e) => {
        setOpen(false)
        onShowChanged()
        const newSectionsId = {}
        const sections =e.rows.reduce((acc, x )=>{
            if(!acc[x.values.section_id])acc[x.values.section_id] = {name: x.values.section_name, description: x.values.section_description, trombino_id: id}
            return acc
        }, {})
        console.log(sections)
        for(const section of Object.keys(sections)) {
            const record = await db.collection('Section').create(sections[section]);
            // newSectionsId set id with old id
        }

        // for (let i=0; i < e.rows.length; i++) {
        //     // get new id of old section
            
        //     const data = {
        //         name: e.rows[i].values.name,
        //         description: e.rows[i].values.description,
        //         user_id: db.authStore.model.id 
        //     };
        //     console.log(data)
        //     try {
        //         const record = await db.collection('Trombino').create(data);
        //     }
        //     catch(error) {
        //         console.error(error);
        //     }
        // }
    }

    return (
        <ModelBase title="Importer Ficher CSV" show={show} onShowChanged={onShowChanged} onOk={handleClick}>
            <div className="p-4 md:p-5 space-y-4">
            <CSVImporter
                modalIsOpen={show}
                modalOnCloseTriggered={onShowChanged}
                darkMode={true}
                onComplete={(data) => close(data)}
                template={{
                columns: [
                    {name: "first_name"},{name: "last_name"},{name: "formatted_name"},{name: "description"},{name: "section_id"},{name: "section_name"},{name: "section_description"},
                ],
                }}
            />
            </div>
        </ModelBase>
    )
}