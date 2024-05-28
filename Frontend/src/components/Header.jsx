import { useNavigate } from "react-router-dom"

export default function Header() {
    const navigate = useNavigate();

    return (
        <div>
            <button onClick={() => navigate("/login")}>login</button>
            <button onClick={() => navigate("/register")}>register</button>
        </div>
    )
}