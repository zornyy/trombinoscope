import { useContext, useEffect, useState } from "react"
import ModelBase from "./ModalBase"
import { DBContext } from "./contexts/DBContext";
import {CSVImporter} from "csv-import-react";

export default function ImportCsvModal({ show, onShowChanged, id }) {
    const { db } = useContext(DBContext);

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
        onShowChanged(false)
        const newSectionsId = {}
        const sections =e.rows.reduce((acc, x )=>{
            if(!acc[x.values.section_id])acc[x.values.section_id] = {name: x.values.section_name, description: x.values.section_description, trombino_id: id}
            return acc
        }, {})
        console.log(sections)
        for(const section of Object.keys(sections)) {
            const record = await db.collection('Section').create(sections[section]);
            newSectionsId[section]=record.id
        }

        for (const row of e.rows) {
            // get new id of old section
            
            const data = {
                first_name: row.values.first_name,
                last_name: row.values.last_name,
                formatted_name: row.values.formatted_name,
                description: row.values.description,
                section_id: newSectionsId[row.values.section_id],
                image: null,
                is_archived: false
            };
            console.log(data)
            try {
                const record = await db.collection('Subject').create(data);
            }
            catch(error) {
                console.error(error);
            }
        }
    }


    return (
        <ModelBase title="Importer Ficher CSV" show={show} onShowChanged={onShowChanged} onOk={handleClick}>
            <div className="p-4 md:p-5 space-y-4">
            <CSVImporter
                modalIsOpen={show}
                modalOnCloseTriggered={()=>onShowChanged(false)}
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