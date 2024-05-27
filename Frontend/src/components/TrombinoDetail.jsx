import { useContext, useEffect, useState } from 'react'
import '../App.css'
import { DBContext } from "./contexts/DBContext";
import NewSectionModal from './NewSectionModal';
import NewSubjectModal from './NewSubjectModal';
import { usePDF } from 'react-to-pdf';

export default function TrombinoDetails({ id }) {

	const [showCreateSectionModal, setShowCreateSectionModal] = useState(false)
	const [showCreateSubjectModal, setShowCreateSubjectModal] = useState(false)
	const [record, setRecord] = useState([])
	const {db} = useContext(DBContext);
	db.autoCancellation(false);
	const { toPDF, targetRef } = usePDF({filename: 'page.pdf'});

	const getRecords = async() => {
		// console.log(await db.send("api/trombino"))
		try {
			const record = await db.collection('Trombino').getOne(id)
			setRecord(record)
		} catch(e) {
			
		}
	}

	const handleAddSection = () => {
		setShowCreateSectionModal(true);
	}

	const handleAddSubject = () => {
		setShowCreateSubjectModal(true);
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
					<NewSubjectModal show={showCreateSubjectModal} onShowChanged={setShowCreateSubjectModal}></NewSubjectModal>
					<NewSectionModal show={showCreateSectionModal} onShowChanged={setShowCreateSectionModal}></NewSectionModal>
					<div className='flex flex-col' ref={targetRef}>
						<div>{record.name}</div>
						<div>{record.description}</div>
					</div>
					
					<button onClick={handleAddSection} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white dark:hover:bg-gray-700 group w-full hover:text-white hover:bg-[#646cff] duration-75">
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
							<path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
						</svg>

						<span className="ms-3">Nouvelle section</span>
					</button>
					<button onClick={handleAddSubject} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white dark:hover:bg-gray-700 group w-full hover:text-white hover:bg-[#646cff] duration-75">
						<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
  							<path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
  							<path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
						</svg>

						<span className="ms-3">Nouveau sujet</span>
					</button>
					<button onClick={() => toPDF()}>Exporter en PDF</button>
			</div>
	)
}