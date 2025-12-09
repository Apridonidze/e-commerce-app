import axios from 'axios'
import { useEffect, useState } from "react"

import User from "../component/User"

import {BACKEND_URL} from '../../config'
import { useCookies } from 'react-cookie'

const Dashboard = () => {

    const [ cookies ] = useCookies(['token'])

    const [user,setUser] = useState(null)
    const [products, setProducts] = useState([])
    const [saved , setSaved] = useState([])

    useEffect(() => {
        
        const fetchUser = async() => {
            try{

                await Promise.all([
                    await axios.get(`${BACKEND_URL}/users` , {headers : {Authorization : `Bearer ${cookies.token}`}}).then(resp => console.log(resp)),
                    await axios.get(`${BACKEND_URL}/products/my-products` , {headers : {Authorization : `Bearer ${cookies.token}`}}).then(resp => console.log(resp)),
                    await axios.get(`${BACKEND_URL}/products/saved-products` , {headers : {Authorization : `Bearer ${cookies.token}`}}).then(resp => console.log(resp)),
                ])

            }catch(err){
                console.log(err)
            }
        }

        fetchUser();
    },[])

    //TODO : create component for saved products
    //TODO : create component for producfts created by me (make it updatable , delatable)
    //TODO : create chars for statistics
    
    return(
        <div className="dashboard-container">
            <User />
            
        </div>
    )
}

export default Dashboard