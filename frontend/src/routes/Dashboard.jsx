import axios from 'axios'
import { useEffect, useState } from "react"


import User from "../component/User"
import Header from '../layout/Header'
import Sidebar from '../layout/Sidebar'
import Cart from '../component/Cart'

import { useLocation } from 'react-router-dom'


const Dashboard = () => {
    
    const { hash } = useLocation();


    useEffect(() => {
        if (hash) {
        
            const el = document.querySelector(hash);
            if (el) {el.scrollIntoView({ behavior: "smooth" })}

        }
        return
    }, [hash]);

    return(
        <div className="dashboard-container container-fluid d-flex">
            
            <div className="dashboard-start col">
                <Sidebar />
            </div>
            <div className="dashboard-end col">
                <Header />
                <User />
                <CardDetails />
                <section id='cart-items'><Cart /></section>
            </div>
        </div>
    )
}

export default Dashboard