import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import axios from 'axios'

import { useState,useEffect } from 'react'
import { useCookies } from 'react-cookie'

import { BACKEND_URL } from '../../config'

const User = () => {

    const [cookies] = useCookies(['token'])
    const [user,setUser] = useState(null)
    const [isAdmin, setIsAdmin] = useState(null)

    useEffect(() => {
        
        const fetchUser = async() => {
            try{

                await Promise.all([
                    axios.get(`${BACKEND_URL}/users` , {headers : {Authorization : `Bearer ${cookies.token}`}}).then(resp => {console.log(resp) , setUser(resp.data.user)}),
                    axios.get(`${BACKEND_URL}/admin` , {headers : {Authorization : `Bearer ${cookies.token}`}}).then(resp => {console.log(resp) , setIsAdmin(resp.data.isAdmin)}),
                ])

            }catch(err){
                console.log(err)
            }
        }


        return () => {fetchUser()}

    },[cookies.token])

    return(
        <section id="user">
            
            <div className="user-container border border-2">
                <span className='position-relative bg-white' style={{bottom: '15px'}}>{'Account'|| <Skeleton />}</span>

                <h1>{user?.id || <Skeleton />}</h1>
                <h1>{user?.fullname || <Skeleton />} {isAdmin !== null && isAdmin ? `Admin` : <></> || <Skeleton />}</h1>
                <h1>{user?.email || <Skeleton />}</h1>
                <h1>{[user?.country_code , ' ' , user?.phone]|| <Skeleton />}</h1>

            </div>

        </section>
    )
}
//add logout button at the end of div
export default User