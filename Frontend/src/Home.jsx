
import { useContext, useEffect, useState } from 'react'
import './App.css'
import { DBContext } from "./components/contexts/DBContext";
import { useNavigate } from "react-router-dom"
import NewTrombinoModal from "./components/NewTrombinoModal"
import TrombinoDetails from './components/TrombinoDetail';

export default function Home() {
  const navigate = useNavigate();
  const { db } = useContext(DBContext);
  db.autoCancellation(false);
  const [records, setRecords] = useState([])
  const [showCreateModal, setShowCreateModal] = useState(false)
  const currentUser = db.authStore.model;
  const [tromId, setTromId] = useState("")
  const [showSidebar, setShowSidebar] = useState(false)

  const getRecords = async () => {
    try {
      const fetched = await db.send("trombino");
      setRecords(fetched)

    } catch (e) {

    }
  }

  const handleAddTrombino = async () => {
    setShowCreateModal(true);
  }

  useEffect(() => {
    if (currentUser == null) {
      navigate("/login");
    }
    getRecords()
  }, [])

  useEffect(() => {
    getRecords()
  }, [showCreateModal])

  return (
    <>

      <NewTrombinoModal show={showCreateModal} onShowChanged={setShowCreateModal}></NewTrombinoModal>
      <TrombinoDetails id={tromId}></TrombinoDetails>
      <div id="account" className="form">
        <button className="z-30 md:invisible " onClick={() => setShowSidebar(true)}>Show sidebar</button>
        {showSidebar && <span className="fixed top-0 bottom-0 left-0 right-0 bg-black opacity-5" onClick={() => setShowSidebar(false)} />}
        <aside id="default-sidebar" className={`fixed top-0 left-0 z-20 md:w-64 h-screen transition-transform ${showSidebar ? "" : "-translate-x-full"} sm:translate-x-0`} aria-label="Sidebar">
          <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
            <ul className="space-y-2 font-medium">
              <li>
                <button onClick={handleAddTrombino} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white dark:hover:bg-gray-700 group w-full hover:text-white hover:bg-[#646cff] duration-75">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>

                  <span className="ms-3">Nouveau Trombino</span>
                </button>
              </li>
              {
                records.map((item, i) =>
                  <li key={i}>
                    <a href="#" onClick={() => setTromId(item.id)} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group dark:focus:bg-gray-700 focus:bg-gray-200">
                      <svg className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white group-focus:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
                        <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                        <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                      </svg>
                      <span className="ms-3">{item.name}</span>
                    </a>
                  </li>
                )
              }
            </ul>
          </div>
        </aside>
      </div>
    </>
  )
}
