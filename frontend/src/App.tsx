import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {MainPage} from "./pages/mainPage.tsx";
import {Registration} from "./pages/registration.tsx";

function App() {

    return (
        <>
            <div>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<MainPage/>}/>
                        <Route path="/register" element={<Registration/>}/>
                    </Routes>
                </BrowserRouter>
            </div>
        </>
    )
}

export default App
