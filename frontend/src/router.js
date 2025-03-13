import React from 'react'
import { BrowserRouter, Route, Routes} from 'react-router-dom'
import Landpage from './Pages/Landpage'
import Login from './Pages/Login';
import Home from './Pages/Homepage';
import Subject from './Pages/Subject';
import Users from './Pages/Users';
import MasterRoute from './Components/MasterRoute';
import ForgotPassword from './Pages/ForgotPassword';
import VerifyToken from './Components/Token';
import Spreadsheet from './Pages/Spreadsheet';

function Rotas() {
    return(
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Landpage/>}/>
                <Route path='/login' element={<Login/>}/>

                <Route element={<VerifyToken/>}>
                    <Route path='/home' element={<Home/>}/>
                    <Route path='/subject/:id' element={<Subject/>}/>
                    <Route path='/planilhas' element={<Spreadsheet/>}/>
                </Route>
                
                <Route path='/forgotpass' element={<ForgotPassword/>}/>

                <Route element={<MasterRoute/>}>
                    <Route path='/users' element={<Users/>}/>                
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default Rotas;