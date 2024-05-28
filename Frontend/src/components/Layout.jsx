import { Outlet } from "react-router-dom";
import Header from "./Header";
import "../App.css";

export default function Layout() {

    return(
        <div className="Layout">
            <Header />
            <div className="Outlet">
                <Outlet />
            </div>
        </div>
    )
}