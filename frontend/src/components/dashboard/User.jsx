import { useContext, useState } from 'react'; //importing react hooks
import { UserContext } from '../context/UserContext'; //importing user context

import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom'; //importing react libraries

const User = ({ setToggleAlert }) => {

    const navigator = useNavigate();//defining navigaotor 

    const { user } = useContext(UserContext); //defining user data from user context
    const [ cookies , setCookies, removeCookies] = useCookies(['token']);//defining user cookies

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

            <div className="user-container p-3 rounded-2">

                <div className="user-container-top d-flex align-items-center gap-2">
                    
                    <div className="user-container-top-start">
                        <div class="icon-bg"><i class="fa-regular fa-circle-user"></i></div>
                    </div>

                    <div className="user-container-top-end">
                        <h5 className='fw-medium'>{user.fullname}</h5>
                        <small>{user !== null && user.role === 'admin' ? `Admin` : "Customer"}</small>
                    </div>
    
                </div>

                <div className="user-container-bottom">
                    
                    <div className="user-row">
                        <span>Email Address</span>
                        <h6>{user.email}</h6>
                    </div>

                    <div className="user-row">
                        <span>Contact Number</span>
                        <h6>{[user.country_code , ' ' , user.phone]}</h6>
                    </div>
                    
                    <button className='logoutBtn btn w-100' onClick={() => {handleLogout()}}><i class="fa-solid fa-arrow-right-from-bracket"></i> Logout</button>
                </div>

            </div>

        </section>
    );
};

export default User; //exporting component