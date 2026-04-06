import { useContext, useState } from 'react'; //importing react hooks
import { UserContext } from '../context/UserContext'; //importing user context

import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom'; //importing react libraries

import StatusMessage from '../alerts/StatusMessage';//importing alert message component

const User = () => {

    const navigator = useNavigate();//defining navigaotor 

    const { user } = useContext(UserContext); //defining user data from user context
    const [ cookies , setCookies, removeCookies] = useCookies(['token']);//defining user cookies

    const [toggleAlert, setToggleAlert] = useState({status : false , type: '', statusCode : null, message : ''}); //states to toggle components

    const handleLogout = async() => { //logout function
        try{

            removeCookies('token' , {path : '/'}); //removing cookies from UseCookies
            navigator('/', {replace : true}); //navigating user to main page
            window.location.reload(); //reloading page

        }catch(err){
            setToggleAlert({status: true, type: "Internal_Error", statusCode: err.status, message: String(err.response?.data?.message || err.message || 'Unknown error')}); //toggling internal error message
        };
    };

    return(
        <section id="user">

            {toggleAlert.status ? <StatusMessage setToggleAlert={setToggleAlert} toggleAlert={toggleAlert}/> : <></>}

            <div className="user-container">

                <div className="user-container-top">
                    
                    <div className="user-container-top-start">
                        
                    </div>
                    <div className="user-container-top-end">
                        <h6>{user?.fullname}</h6>
                        <small>{user !== null && user.role === 'admin' ? `Admin` : "Customer"}</small>
                    </div>
    
                </div>

                <div className="user-container-bottom">
                    <h1>{user?.email}</h1>
                    <h1>{[user?.country_code , ' ' , user?.phone]}</h1>
                    <button className='btn btn-danger' onClick={() => {handleLogout()}}>Logout</button>
                </div>

            </div>

        </section>
    );
};

export default User; //exporting component