
import { useContext, useEffect } from 'react'
import './App.css'
import { useNavigate } from "react-router-dom"
import { DBContext } from './components/contexts/DBContext'

export default function Home() {
  const navigate = useNavigate();
  const {db} = useContext(DBContext);
  const currentUser = db.authStore.model;
  
  useEffect(() => {
    if (currentUser == null) {
      navigate("/login");
    }  
  })
  

  return (
    <>
      Hello
    </>
  )
}
