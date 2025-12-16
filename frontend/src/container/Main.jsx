import Category from "../component/Category"
import Header from "../component/Header"
import Sidebar from "../component/Sidebar"

import axios from "axios"
import { useEffect } from "react"
import { useState } from "react"
import { useCookies } from "react-cookie"

const Main = () => {

    const [ cookies ] = useCookies(['token'])
    const [ isAdmin, setIsAdmin ] = useState(false)

    useEffect(() => {

        const fetchStatus = async() => {

            try{

                await axios.get('/' , {headers : {Authorization : `Bearer ${cookies.token}`}}).then(resp => {console.log(resp) ; setIsAdmin(resp.data.isAdmin)})

            }catch(err){
                console.log(err)
            }

        }
        
        return () => {fetchStatus()};''

    },[])


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