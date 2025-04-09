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
import Essay from './Pages/Essay';
import EssayWriting from './Pages/Essay_writing';
import User_essay from './Pages/Users_essays';
import EssayCorrecting from './Pages/User_essay';
import Corrected_essay from './Pages/Corrected_essay';

function Rotas() {
    return(
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Landpage/>}/>
                <Route path='/login' element={<Login/>}/>

                <Route element={<VerifyToken/>}>
                    <Route path='/home' element={<Home/>}/>
                    <Route path='/subject/:id' element={<Subject/>}/>
                    <Route path='/subject/planilhas' element={<Spreadsheet/>}/>
                    <Route path='/subject/essay' element={<Essay/>}/>
                    <Route path='/essay/:id' element={<EssayWriting/>}/>
                    <Route path='/corrected/essay/:tema' element={<Corrected_essay/>}/>
                </Route>
                
                <Route path='/forgotpass' element={<ForgotPassword/>}/>

                <Route element={<MasterRoute/>}>
                    <Route path='/users' element={<Users/>}/> 
                    <Route path='/users/essay/:id' element={<User_essay/>}/>   
                    <Route path='/essay/:user/:tema' element={<EssayCorrecting/>}/>            
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default Rotas;