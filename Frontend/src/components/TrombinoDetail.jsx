import { useContext, useEffect, useState } from 'react'
import '../App.css'
import { DBContext } from "./contexts/DBContext";

export default function TrombinoDetails({ id }) {

	const [record, setRecord] = useState([])
	const {db} = useContext(DBContext);
	db.autoCancellation(false);

	const getRecords = async() => {
		// console.log(await db.send("api/trombino"))
		try {
			const record = await db.collection('Trombino').getOne(id)
			setRecord(record)
			console.log(record)
		} catch(e) {
			console.log(e)
		}
	}

	useEffect(() => {
    getRecords()
  }, [])

	return(
			<div>
					{record.name}
			</div>
	)
}