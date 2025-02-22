import React from 'react'
import { BrowserRouter, Route, Routes} from 'react-router-dom'
import Landpage from './Pages/Landpage'
import Login from './Pages/Login';
import Home from './Pages/Homepage';

function Rotas() {
    return(
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Landpage/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/home' element={<Home/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default Rotas;