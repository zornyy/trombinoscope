import { useContext, useEffect, useState } from 'react'
import '../App.css'
import { DBContext } from "./contexts/DBContext";
import SectionDetails from './SectionDetails';
import Spinner from './Spinner';

export default function ShareTrombinoDetails({ id }) {
	const [record, setRecord] = useState()
	const [loading, setLoading] = useState()
	const [err, setErr] = useState()
	const { db } = useContext(DBContext);
	db.autoCancellation(false);

	const getRecords = async () => {
		try {
			setLoading(true)
			const record = await db.send("trombino/" + id);
			setRecord(record)
			setLoading(false)
		} catch (e) {
			setErr(true)
		}
	}
	useEffect(() => {
		getRecords()
	}, [])

	if (err) {
		return (
			<div>
				404 not found
			</div>
		)
	}

	if (loading) {
		return (
			<Spinner />
		)
	}

	return (
		<div>
			<div className="flex flex-col items-start mb-4" >
				<h1>{record.name}</h1>
				{record.description?.length > 0 && <span className="text-md text-gray-500 dark:text-gray-400">{record.description}</span>}
			</div>
			{record.sections.map((x) => <SectionDetails section={x} key={x.id} />)}
		</div>
	)
}