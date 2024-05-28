import { useContext, useEffect, useState } from 'react'
import '../App.css'
import { DBContext } from "./contexts/DBContext";
import NewSectionModal from './NewSectionModal';
import NewSubjectModal from './NewSubjectModal';
import { useRef } from 'react';
import generatePDF, { Resolution, Margin } from "react-to-pdf";
import SectionDetails from './SectionDetails';
import ImportCsvModal from './ImportCsvModal';


export default function TrombinoDetails({ id }) {

	const [showCreateSectionModal, setShowCreateSectionModal] = useState(false)
	const [showCreateSubjectModal, setShowCreateSubjectModal] = useState(false)
	const [showImportCsv, setShowImportCsv] = useState(false)
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

	const handleCSV = () => {
		setShowImportCsv(true);
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
			<div role="status">
				<svg aria-hidden="true" className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-purple-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
					<path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
				</svg>
				<span className="sr-only">Loading...</span>
			</div>
		)
	}

	return (
		<div>
			<NewSubjectModal show={showCreateSubjectModal} onShowChanged={setShowCreateSubjectModal} sections={record.sections}></NewSubjectModal>
			<ImportCsvModal show={showImportCsv} onShowChanged={setShowImportCsv} id={id}></ImportCsvModal>
			<NewSectionModal show={showCreateSectionModal} trombinoId={id} onShowChanged={setShowCreateSectionModal}></NewSectionModal>
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
					<path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
					<path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1" />
				</svg>

				<span className="ms-3">Nouveau sujet</span>
			</button>
			<button className='flex items-center p-2 text-gray-900 rounded-lg dark:text-white dark:hover:bg-gray-700 group w-full hover:text-white hover:bg-[#646cff] duration-75' onClick={() => generatePDF(targetRef, options)}>Exporter en PDF</button>
			<button className='flex items-center p-2 text-gray-900 rounded-lg dark:text-white dark:hover:bg-gray-700 group w-full hover:text-white hover:bg-[#646cff] duration-75' onClick={handleCSV}>Importer CSV</button>
			{record.sections.map((x) => <SectionDetails section={x} key={x.id} />)}
		</div>
	)
}