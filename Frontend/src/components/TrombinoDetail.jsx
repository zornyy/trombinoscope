import { useContext, useEffect, useState } from 'react'
import '../App.css'
import { DBContext } from "./contexts/DBContext";
import NewSectionModal from './NewSectionModal';
import NewSubjectModal from './NewSubjectModal';
import { useRef } from 'react';
import generatePDF, { Resolution, Margin } from "react-to-pdf";
import SectionDetails from './SectionDetails';
import Spinner from './Spinner';
import { v4 as uuidv4 } from 'uuid'

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
			padding: 5
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
				backgroundColor: '#242424',
				imageTimeout: 0,
				height: 1045,
				width: 800
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

	const share = async () => {
		const data = {
			url: uuidv4(),
			trombino_id: id,
			user_id: db.authStore.model.id
		};
		try {
			setLoading(true)
			const record = await db.collection('Link').create(data)
			setLoading(false)
			window.open(`/share/${record.url}`, '_blank')?.focus()
		} catch (e) {
		}
		getRecords();
	}


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
			<ImportCsvModal show={showImportCsv} onShowChanged={setShowImportCsv} id={id}></ImportCsvModal>

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
				<button onClick={() => generatePDF(targetRef, options)} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white dark:hover:bg-gray-700 group w-full hover:text-white hover:bg-[#646cff] duration-75">
				<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-file-pdf" viewBox="0 0 16 16">
					<path d="M4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm0 1h8a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1"/>
					<path d="M4.603 12.087a.8.8 0 0 1-.438-.42c-.195-.388-.13-.776.08-1.102.198-.307.526-.568.897-.787a7.7 7.7 0 0 1 1.482-.645 20 20 0 0 0 1.062-2.227 7.3 7.3 0 0 1-.43-1.295c-.086-.4-.119-.796-.046-1.136.075-.354.274-.672.65-.823.192-.077.4-.12.602-.077a.7.7 0 0 1 .477.365c.088.164.12.356.127.538.007.187-.012.395-.047.614-.084.51-.27 1.134-.52 1.794a11 11 0 0 0 .98 1.686 5.8 5.8 0 0 1 1.334.05c.364.065.734.195.96.465.12.144.193.32.2.518.007.192-.047.382-.138.563a1.04 1.04 0 0 1-.354.416.86.86 0 0 1-.51.138c-.331-.014-.654-.196-.933-.417a5.7 5.7 0 0 1-.911-.95 11.6 11.6 0 0 0-1.997.406 11.3 11.3 0 0 1-1.021 1.51c-.29.35-.608.655-.926.787a.8.8 0 0 1-.58.029m1.379-1.901q-.25.115-.459.238c-.328.194-.541.383-.647.547-.094.145-.096.25-.04.361q.016.032.026.044l.035-.012c.137-.056.355-.235.635-.572a8 8 0 0 0 .45-.606m1.64-1.33a13 13 0 0 1 1.01-.193 12 12 0 0 1-.51-.858 21 21 0 0 1-.5 1.05zm2.446.45q.226.244.435.41c.24.19.407.253.498.256a.1.1 0 0 0 .07-.015.3.3 0 0 0 .094-.125.44.44 0 0 0 .059-.2.1.1 0 0 0-.026-.063c-.052-.062-.2-.152-.518-.209a4 4 0 0 0-.612-.053zM8.078 5.8a7 7 0 0 0 .2-.828q.046-.282.038-.465a.6.6 0 0 0-.032-.198.5.5 0 0 0-.145.04c-.087.035-.158.106-.196.283-.04.192-.03.469.046.822q.036.167.09.346z"/>
				</svg>

					<span className="ms-3">Créer PDF</span>
				</button>

				<button onClick={handleCSV} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white dark:hover:bg-gray-700 group w-full hover:text-white hover:bg-[#646cff] duration-75">
				<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-filetype-csv" viewBox="0 0 16 16">
					<path fillRule="evenodd" d="M14 4.5V14a2 2 0 0 1-2 2h-1v-1h1a1 1 0 0 0 1-1V4.5h-2A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v9H2V2a2 2 0 0 1 2-2h5.5zM3.517 14.841a1.13 1.13 0 0 0 .401.823q.195.162.478.252.284.091.665.091.507 0 .859-.158.354-.158.539-.44.187-.284.187-.656 0-.336-.134-.56a1 1 0 0 0-.375-.357 2 2 0 0 0-.566-.21l-.621-.144a1 1 0 0 1-.404-.176.37.37 0 0 1-.144-.299q0-.234.185-.384.188-.152.512-.152.214 0 .37.068a.6.6 0 0 1 .246.181.56.56 0 0 1 .12.258h.75a1.1 1.1 0 0 0-.2-.566 1.2 1.2 0 0 0-.5-.41 1.8 1.8 0 0 0-.78-.152q-.439 0-.776.15-.337.149-.527.421-.19.273-.19.639 0 .302.122.524.124.223.352.367.228.143.539.213l.618.144q.31.073.463.193a.39.39 0 0 1 .152.326.5.5 0 0 1-.085.29.56.56 0 0 1-.255.193q-.167.07-.413.07-.175 0-.32-.04a.8.8 0 0 1-.248-.115.58.58 0 0 1-.255-.384zM.806 13.693q0-.373.102-.633a.87.87 0 0 1 .302-.399.8.8 0 0 1 .475-.137q.225 0 .398.097a.7.7 0 0 1 .272.26.85.85 0 0 1 .12.381h.765v-.072a1.33 1.33 0 0 0-.466-.964 1.4 1.4 0 0 0-.489-.272 1.8 1.8 0 0 0-.606-.097q-.534 0-.911.223-.375.222-.572.632-.195.41-.196.979v.498q0 .568.193.976.197.407.572.626.375.217.914.217.439 0 .785-.164t.55-.454a1.27 1.27 0 0 0 .226-.674v-.076h-.764a.8.8 0 0 1-.118.363.7.7 0 0 1-.272.25.9.9 0 0 1-.401.087.85.85 0 0 1-.478-.132.83.83 0 0 1-.299-.392 1.7 1.7 0 0 1-.102-.627zm8.239 2.238h-.953l-1.338-3.999h.917l.896 3.138h.038l.888-3.138h.879z"/>
				</svg>

					<span className="ms-3">Importer CSV</span>
				</button>
				
			</div>
			<div className="flex flex-col items-start mb-4 pl-5" ref={targetRef}>
				<h1>{record.name}</h1>
				{record.description?.length > 0 && <span className="text-md text-gray-500 dark:text-gray-400">{record.description}</span>}
				{record.sections.map((x) => <SectionDetails section={x} key={x.id} />)}
			</div>
		</div>
	)
}