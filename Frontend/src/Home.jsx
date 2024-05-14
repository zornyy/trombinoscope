
import { useContext, useEffect } from 'react'
import './App.css'
import { DBContext } from "./components/contexts/DBContext";
import { useNavigate } from "react-router-dom"

export default function Home() {
  const navigate = useNavigate();
  const {db} = useContext(DBContext);
  const [records, setRecords] = useState([])
  const currentUser = db.authStore.model;
  
  
  const getRecords = async() => {
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
      {
        records.map(function(item, i) {
          <img key={i} src={item.url}></img>
        })
      }
    </>
  )
}
