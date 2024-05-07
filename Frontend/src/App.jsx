import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from './auth/Register';
import Login from './auth/Login';
import Account from "./auth/Account";
import Home from "./Home";
import NoPage from "./components/NoPage";
import Layout from "./components/Layout";
import './App.css'

function App() {

  return (
    <>
<<<<<<< Updated upstream
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home/>}/>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/account" element={<Account />} />
          </Route>
          <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
=======
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <h1 className="text-3xl font-bold underline">
      Hello world!
    </h1>
>>>>>>> Stashed changes
    </>
  )
}

export default App
