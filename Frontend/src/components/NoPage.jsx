import { useNavigate } from "react-router-dom"
import "../App.css"

export default function NoPage() {

    const navigate = useNavigate()

    return(
        <div className="Nopage">
            <div>YOU GOT 404'D</div>
            <button className="button" onClick={() => navigate("/")}>← Back</button>    
        </div>
    )
}