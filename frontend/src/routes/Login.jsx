import axios from 'axios'
import { useRef, useState } from "react"

import {BACKEND_URL} from '../../config'
import { useCookies } from 'react-cookie';
import { Link, useNavigate } from 'react-router-dom';

import '../styles/auth.css'
import Sidebar from '../layout/Sidebar';
import Header from '../layout/Header';
import Footer from '../layout/Footer';

const Login =  () =>  {
    
    const NumberRegex = /\d/;
    const regexContainsSpecial = /[^\w\s]/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const [email, setEmail] = useState('')
    const [password,setPassword] = useState('')

    const [emailErr , setEmailErr] = useState('')
    const [passwordErr, setPasswordErr] = useState('')

    const emailRef = useRef(null)
    const passwordRef = useRef(null)

    const [ cookies, setCookies ] = useCookies(['token'])
    const [toggleAlert, setToggleAlert] = useState({status : false , type: '', statusCode : null, message : ''}); //states to toggle components


    const navigator = useNavigate()

    const submitLogin = async (e) => {

        e.preventDefault()

        let isValid 
        let data

        if(email.trim() == '' || password.trim() == email || password.trim() == email){isValid = false; setEmailErr(`This Field Can't Be Empty`) ; emailRef.current.classList.add('is-invalid'); emailRef.current.classList.remove('is-valid')}
        else if(emailRegex.test(email) === false){isValid = false ; emailRef.current.classList.add('is-invalid') ; emailRef.current.classList.remove('is-valid'); setEmailErr('Invalid Email Format')}
        else {isValid = true ;emailRef.current.classList.add('is-valid') ; emailRef.current.classList.remove('is-invalid'); setEmailErr(''); data = {...data, email : email}}

        if(password.trim() == '' || password.trim() == null || password.trim() == undefined){isValid = false; setPasswordErr(`This Field Can't Be Empty`) ; passwordRef.current.classList.add('is-invalid'); passwordRef.current.classList.remove('is-valid')}
        else if (password.trim().length <= 8 ){isValid == false ; setPasswordErr('Invalid Password Format'); passwordRef.current.classList.add('is-invalid');passwordRef.current.classList.remove('is-valid')}
        else if (NumberRegex.test(password) === false ) {isValid = false ; setPasswordErr('Invalid Password Format');passwordRef.current.classList.add('is-invalid');passwordRef.current.classList.remove('is-valid')}
        else if (regexContainsSpecial.test(password) === false ){isValid = false; setPasswordErr('Invalid Password Format');passwordRef.current.classList.add('is-invalid');passwordRef.current.classList.remove('is-valid')}
        else {isValid = true; setPasswordErr('') ; passwordRef.current.classList.remove('is-invalid'); passwordRef.current.classList.add('is-valid'); data = {...data, password : password}}
        // add error that says invalid mail/password do not say which one is incorrect for security
        if(isValid){
            try{

                await axios.post(`${BACKEND_URL}/api/auth/login` , {data}).then(resp => {
                    console.log(resp);
                    setCookies('token' , resp.data.token , {path : '/' , maxAge :  2592000})
                    navigator('/' , {replace : true})
                    window.location.reload()
                })


            }catch(err){
                if(err.status === 400)isValid = false; setPasswordErr(err.response.data.err) ; setEmailErr('') ; passwordRef.current.classList.add('is-invalid'); passwordRef.current.classList.remove('is-valid'); emailRef.current.classList.add('is-invalid'); emailRef.current.classList.remove('is-valid')
                if(err.status === 500) setToggleAlert({status: true, type: "Internal_Error", statusCode: err.status, message: String(err.response?.data?.message || err.message || 'Unknown error')});
            };
        };
    };

    return(
        <div className="main-container container-fluid d-flex flex-column justify-content-start " style={{maxWidth : '3000px'}}> 

            {toggleAlert.status ? <StatusMessage setToggleAlert={setToggleAlert} toggleAlert={toggleAlert}/> : <></>}
            <div className="main-body">
                
                <div className="main-start"><Sidebar /></div>
                <div className="main-end">
                    <div className="main-header"><Header /></div>
                    <div className="auth-container">
                    <form onSubmit={submitLogin}>
                        <div className="form-floating"> 
                            <input className="form-control" type="text" id="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} value={email} ref={emailRef}/>
                            <label htmlFor="email">Email</label>
                            {emailErr}
                        </div>
                        <div className="form-floating"> 
                            <input className="form-control" type="text" id="name" placeholder="Full Name" onChange={(e) => setPassword(e.target.value)} value={password} ref={passwordRef}/>
                            <label htmlFor="name">Password</label>
                            {passwordErr}
                        </div>
                        <input type="submit" value="Log In" />
                    </form>
                    <Link to='/sign' replace>Do Not Have A Account? Sign Up Here!</Link>
                </div>

                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Login