import { useContext, useEffect, useState } from 'react'
import '../App.css'
import { DBContext } from "./contexts/DBContext";
import NewSectionModal from './NewSectionModal';

export default function TrombinoDetails({ id }) {

	const [showCreateSectionModal, setShowCreateSectionModal] = useState(false)
	const [record, setRecord] = useState([])
	const {db} = useContext(DBContext);
	db.autoCancellation(false);

	const getRecords = async() => {
		// console.log(await db.send("api/trombino"))
		try {
			const record = await db.collection('Trombino').getOne(id)
			setRecord(record)
		} catch(e) {
			
		}
	}

	const handleAddSection = () => {
		setShowCreateSectionModal(true)
	}

	useEffect(() => {
    getRecords()
  }, [])

	useEffect(() => {
		getRecords()
	}, [id])

	
	if (id == "") {
		return(
			<div>
				Sélectionnez un trobminoscope pour voir les détails :)
			</div>
		)
	}

	return(
			<div>
					<NewSectionModal show={showCreateSectionModal} onShowChanged={setShowCreateSectionModal}></NewSectionModal>
					{record.name}<br></br>
					{record.description}
					
					<button onClick={handleAddSection} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white dark:hover:bg-gray-700 group w-full hover:text-white hover:bg-[#646cff] duration-75">
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
							<path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
						</svg>

						<span className="ms-3">Nouvelle section</span>
					</button>
			</div>
	)
}