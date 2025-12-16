import Category from "../component/Category"
import Header from "../component/Header"
import Sidebar from "../component/Sidebar"

import axios from "axios"
import { useEffect } from "react"
import { useState } from "react"
import { useCookies } from "react-cookie"
import { BACKEND_URL } from "../../config"

const Main = () => {

    


    return(
        <div className="main-container container-fluid row border" style={{height : '100vh'}}>
            <div className="main-start col-3">
                <Sidebar isAdmin={isAdmin}/> 
            </div>
            <div className="main-end col">
                <Header />
                <Category />
            </div>
        </div>
    )
}

export default Main