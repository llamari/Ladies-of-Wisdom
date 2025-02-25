import React, {useEffect, useState} from "react";
import axios from "axios";
import { FaRegUserCircle } from "react-icons/fa";
import './index.css'

function Home() {
    const [subj, setSubj] = useState([]);

    async function materias() {
        const response = await axios.get('https://ladies-of-wisdom-production.up.railway.app/subj/subject')
        setSubj(response.data);
        console.log(subj);
        console.log(response.data)
    }

    useEffect(() => {
        materias()
    }, [])

    return(
        <div>
            <header id="header">
                <img src="/assets/LW.png" alt="Logo" />
                <FaRegUserCircle className="icon-user" color="white" size={60}/>
            </header>
            <div style={{display: "flex"}}>
                {subj.map(materia => 
                    <div style={{backgroundImage: `linear-gradient(rgba(242, 154, 207, 0.4), rgba(242, 154, 207, 0.4)), url(${materia.image})`}} key={materia.id} className="card-materia">
                        <h1 className="card-title">{materia.name}</h1>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Home