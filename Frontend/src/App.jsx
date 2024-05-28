import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from './auth/Register';
import Login from './auth/Login';
import Home from "./Home";
import NoPage from "./components/NoPage";
import Layout from "./components/Layout";
import './App.css'
import { DBContext } from "./components/contexts/DBContext";
import PocketBase from 'pocketbase';
import Share from "./Share";

function App() {

  const db = new PocketBase(import.meta.env.VITE_BACKEND_URL);

  return (
    <>
      <DBContext.Provider value={{ db }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/share/:slug" element={<Share />} />
            </Route>
            <Route path="*" element={<NoPage />} />
          </Routes>
        </BrowserRouter>
      </DBContext.Provider>
    </>
  )
}

export default App
