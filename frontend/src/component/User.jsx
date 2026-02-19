import { useContext } from 'react'
import { UserContext } from '../context/UserContext'

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'


const User = () => {

    const { user, cartIds } = useContext(UserContext)
    

    return(
        <section id="user">
            
            <div className="user-container border border-2">
                <span className='position-relative bg-white' style={{bottom: '15px'}}>{'Account'|| <Skeleton />}</span>

                <h1>{user?.id || <Skeleton />}</h1>
                <h1>{user?.fullname || <Skeleton />} {user !== null && user.role === 'admin' ? `Admin` : <></> || <Skeleton />}</h1>
                <h1>{user?.email || <Skeleton />}</h1>
                <h1>{[user?.country_code , ' ' , user?.phone]|| <Skeleton />}</h1>
                    {/* add logout btn */}
            </div>

        </section>
    )
}
//add logout button at the end of div

//TODO : remove fetchUser function from top since we will have usercontext.jsx
//TODO : create skeletons for each sections here separately

export default User