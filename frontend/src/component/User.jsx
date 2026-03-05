import { useContext } from 'react'
import { UserContext } from '../context/UserContext'

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const User = () => {

    const { user } = useContext(UserContext)

    const handleLogout = async() => {
        try{

            // reset cookies ,redirect to main page and reload page

        }catch(err){
            // toggle errror message
            console.log(err)
        }
    }

    return(
        <section id="user">
            
            <div className="user-container border border-2">
                <span className='position-relative bg-white' style={{bottom: '15px'}}>{'Account'|| <Skeleton />}</span>

                <h1>{user?.fullname || <Skeleton />} {user !== null && user.role === 'admin' ? `Admin` : <></> || <Skeleton />}</h1>
                <h1>{user?.email || <Skeleton />}</h1>
                <h1>{[user?.country_code , ' ' , user?.phone]|| <Skeleton />}</h1>
                <button className='btn btn-danger' onClick={() => {handleLogout()}}>Logout</button>
            </div>

        </section>
    )
}

//TODO : create skeletons for User.jsx

export default User