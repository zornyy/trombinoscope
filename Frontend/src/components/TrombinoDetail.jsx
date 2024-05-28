import { useContext, useEffect, useState } from 'react'
import '../App.css'
import { DBContext } from "./contexts/DBContext";
import NewSectionModal from './NewSectionModal';
import NewSubjectModal from './NewSubjectModal';
import { useRef } from 'react';
import generatePDF, { Resolution, Margin } from "react-to-pdf";
import SectionDetails from './SectionDetails';
import Spinner from './Spinner';


export default function TrombinoDetails({ id }) {

	const [showCreateSectionModal, setShowCreateSectionModal] = useState(false)
	const [showCreateSubjectModal, setShowCreateSubjectModal] = useState(false)
	const [record, setRecord] = useState()
	const [loading, setLoading] = useState()
	const { db } = useContext(DBContext);
	db.autoCancellation(false);
	const targetRef = useRef();

	const options = {
		fileName: "record.name",
		method: 'open',
		resolution: Resolution.EXTREME,
		page: {
			format: 'letter',
			orientation: 'portrait',
			margin: Margin.SMALL,
		},
		canvas: {
			mimeType: 'image/png',
			qualityRatio: 1,
			width: 1000,
			height: 1000
		},

		overrides: {
			pdf: {
				compress: false,
			},
			canvas: {
				useCORS: false,
				backgroundColor: '#314155',
			}
		},
	};

	const getRecords = async () => {
		try {
			setLoading(true)
			const record = await db.collection('Trombino').getOne(id)
			setRecord(record)
			setLoading(false)
		} catch (e) {
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
	}, [id])


	if (id == "") {
		return (
			<div>
				Sélectionnez un trobminoscope pour voir les détails :
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
			<NewSubjectModal show={showCreateSubjectModal} onShowChanged={setShowCreateSubjectModal} sections={record.sections} onSave={getRecords}></NewSubjectModal>
			<NewSectionModal show={showCreateSectionModal} trombinoId={id} onShowChanged={setShowCreateSectionModal} onSave={getRecords}></NewSectionModal>

			<div className="flex gap-4">
				<button onClick={handleAddSection} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white dark:hover:bg-gray-700 group w-full hover:text-white hover:bg-[#646cff] duration-75">
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
						<path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
					</svg>

					<span className="ms-3">Nouvelle section</span>
				</button>
				<button onClick={handleAddSubject} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white dark:hover:bg-gray-700 group w-full hover:text-white hover:bg-[#646cff] duration-75">
					<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
						<path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
						<path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1" />
					</svg>

					<span className="ms-3">Nouveau sujet</span>
				</button>
				<button className='flex items-center p-2 text-gray-900 rounded-lg dark:text-white dark:hover:bg-gray-700 group w-full hover:text-white hover:bg-[#646cff] duration-75' onClick={() => generatePDF(targetRef, options)}>Exporter en PDF</button>
			</div>
			<div className="flex flex-col items-start mb-4" ref={targetRef}>
				<h1>{record.name}</h1>
				{record.description?.length > 0 && <span className="text-md text-gray-500 dark:text-gray-400">{record.description}</span>}
			</div>
			{record.sections.map((x) => <SectionDetails section={x} key={x.id} />)}
		</div>
	)
}