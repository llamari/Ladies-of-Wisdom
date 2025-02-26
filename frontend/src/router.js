import React from 'react'
import { BrowserRouter, Route, Routes} from 'react-router-dom'
import Landpage from './Pages/Landpage'
import Login from './Pages/Login';
import Home from './Pages/Homepage';
import Subject from './Pages/Subject';

function Rotas() {
    return(
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Landpage/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/home' element={<Home/>}/>
                <Route path='/subject/:id' element={<Subject/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default Rotas;