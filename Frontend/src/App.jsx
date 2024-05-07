import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from './auth/Register';
import Login from './auth/Login';
import Account from "./auth/Account";
import Home from "./Home";
import NoPage from "./components/NoPage";
import './App.css'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/account" element={<Account />} />
          </Route>
          <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
