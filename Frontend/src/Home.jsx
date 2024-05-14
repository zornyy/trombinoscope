
import { useContext, useEffect, useState } from 'react'
import './App.css'
import { DBContext } from "./components/contexts/DBContext";
import { useNavigate } from "react-router-dom"
import TrombinoDisp from './components/TrombinoDisp';

export default function Home() {
  const navigate = useNavigate();
  const {db} = useContext(DBContext);
  const [records, setRecords] = useState([])
  const currentUser = db.authStore.model;
  
  
  const getRecords = async() => {
    // console.log(await db.send("api/trombino"))
    try {
      const fetched = await db.collection('Picture').getFullList({
        sort: '-created', requestKey: null 
      });
      setRecords(records)
    } catch(e) {
      console.log(e)
    }
  }

  useEffect(() => {
    getRecords()
  }, [])

  useEffect(() => {
    if (currentUser == null) {
      navigate("/login");
    }  
  }, [])

  return (
    <>

      {/* Div to display all trombinos */}
      <div className="flex justify-around flex-wrap"> 
        <TrombinoDisp/>
        <TrombinoDisp/>
        <TrombinoDisp/>
        <TrombinoDisp/>
        <TrombinoDisp/>
        <TrombinoDisp/>
      </div>
      
    </>
  )
}
