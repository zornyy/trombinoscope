import { useContext } from 'react'
import '../App.css'
import { DBContext } from './contexts/DBContext'

export default function Subject({ subject }) {
    return (
        <div>
            <img src={`${import.meta.env.VITE_BACKEND_URL}/api/files/Subject/${subject.id}/${subject.image}`} />
            <div>{subject.formatted_name}</div>
        </div>
    )
}