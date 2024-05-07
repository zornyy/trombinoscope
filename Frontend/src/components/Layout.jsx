import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import "../App.css";

export default function Layout() {

    return(
        <div className="Layout">
            <Header />
            <div className="Outlet">
                <Outlet />
            </div>
            <Footer />
        </div>
    )
}