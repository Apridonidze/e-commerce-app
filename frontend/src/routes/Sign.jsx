import { useRef, useState } from "react";

import CountryCode from "../components/auth/CountryCode";
import axios from "axios";

import { BACKEND_URL } from '../../config'
import { Link, useNavigate } from 'react-router-dom'
import { useCookies } from "react-cookie";

import '../styles/auth.css'
import Footer from "../layout/Footer";

import Sidebar from "../layout/Sidebar";
import Header from "../layout/Header";

const Sign = () => {

    const NumberRegex = /\d/;
    const regexContainsSpecial = /[^\w\s]/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const [name , setName] = useState('')
    const [email,setEmail] = useState('')
    const [countryCode, setCountryCode] = useState('')
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const [confrimPass, setConfrimPass] = useState('')

    const [nameErr, setNameErr] = useState('')
    const [emailErr, setEmailErr] = useState('')
    const [countryCodeErr , setCountryCodeErr] = useState('')
    const [phoneErr, setPhoneErr] = useState('')
    const [passwordErr, setPasswordErr] = useState('')
    const [confrimPassErr, setConfrimPassErr] = useState('')

    const nameRef = useRef(null)
    const emailRef = useRef(null)
    const countryRef = useRef(null)
    const phoneRef = useRef(null)
    const passwordRef = useRef(null)
    const submitPasswordRef = useRef(null)

    const [showPass,setShowPass] = useState(false)
    const [showConfPass , setShowConfPass] = useState(false)

    const [ cookies , setCookies ] = useCookies(['token'])
    const [toggleAlert, setToggleAlert] = useState({status : false , type: '', statusCode : null, message : ''}); //states to toggle components


    const navigator = useNavigate()

    const SubmitForm = async (e) => {

        e.preventDefault()

        let isValid
        let data

        
        if(name.trim() == '' || name.trim() == null || name.trim() == undefined){isValid = false ; setNameErr(`This Field Can't Be Empty`); nameRef.current.classList.add('is-invalid');nameRef.current.classList.remove('is-valid')}
        else if(name.trim().length <= 1){isValid = false; setNameErr('Enter Your Full Name (name , surname)'); nameRef.current.classList.add('is-invalid');nameRef.current.classList.remove('is-valid')}
        else if(regexContainsSpecial.test(name) === true){isValid = false; setNameErr('Your Full Name Should Not Contain Special Characters'); nameRef.current.classList.add('is-invalid');nameRef.current.classList.remove('is-valid')}
        else if(NumberRegex.test(name) === true){isValid = false; setNameErr('Your Full name Should Not Contain Numbers'); nameRef.current.classList.add('is-invalid');nameRef.current.classList.remove('is-valid')}
        else if (name.split(' ').length < 2){isValid = false; setNameErr('Enter Your Full Name (Exp: John Smith)'); nameRef.current.classList.add('is-invalid');nameRef.current.classList.remove('is-valid')}
        else {isValid = true; setNameErr('') ;nameRef.current.classList.add('is-valid') ;nameRef.current.classList.remove('is-invalid'); data = {...data,name:name}}

        if(email.trim() == '' || password.trim() == email || password.trim() == email){isValid = false; setEmailErr(`This Field Can't Be Empty`) ; emailRef.current.classList.add('is-invalid'); emailRef.current.classList.remove('is-valid')}
        else if(emailRegex.test(email) === false){isValid = false ; emailRef.current.classList.add('is-invalid') ; emailRef.current.classList.remove('is-valid'); setEmailErr('Insert Valid Email!')}
        else {isValid = true ;emailRef.current.classList.add('is-valid') ; emailRef.current.classList.remove('is-invalid'); setEmailErr(''); data = {...data, email : email}}
        
        if(countryCode.trim() == '') {isValid = false ;setCountryCodeErr('Select Your Country Code') ; countryRef.current.classList.add('is-invalid'), countryRef.current.classList.remove('is-valid'); phoneRef.current.classList.add('is-invalid'); phoneRef.current.classList.remove('is-valid')}
        else if (phone.trim().length <= 8){isValid = false ; setPhoneErr('Your Phone Number Length Should Be Atleast 8 Numbers Length');isValid = false;phoneRef.current.classList.add('is-invalid'), phoneRef.current.classList.remove('is-valid'); countryRef.current.classList.add('is-invalid'), countryRef.current.classList.remove('is-valid') }
        else if (phone.trim() == ''){isValid = false ; setPhoneErr(`This Field Can't Be Empty`); isValid = false; phoneErr.current.classList.add('is-invalid'), phoneErr.current.classList.remove('is-valid'); countryRef.current.classList.add('is-invalid'), countryRef.current.classList.remove('is-valid')}
        else if (NumberRegex.test(phone) === false){isValid = false ; setPhoneErr('Only Numbers Allowed'); isValid = false; phoneRef.current.classList.add('is-invalid'), phoneRef.current.classList.remove('is-valid')}
        else {isValid = true; setPhoneErr(''); setCountryCodeErr(''); countryRef.current.classList.add('is-valid'), countryRef.current.classList.remove('is-invalid'); phoneRef.current.classList.add('is-valid'), phoneRef.current.classList.remove('is-invalid'); data = {...data , phoneNumber : `${countryCode} ${phone}`}}
     
        if(password.trim() == '' || password.trim() == null || password.trim() == undefined){isValid = false; setPasswordErr(`This Field Can't Be Empty`) ; passwordRef.current.classList.add('is-invalid'); passwordRef.current.classList.remove('is-valid')}
        else if (password.trim().length <= 8 ){isValid == false ; setPasswordErr('Your Password Should Be 8 Letters Long'); passwordRef.current.classList.add('is-invalid');passwordRef.current.classList.remove('is-valid')}
        else if (NumberRegex.test(password) === false ) {isValid = false ; setPasswordErr('Your Password Should Contain Numbers');passwordRef.current.classList.add('is-invalid');passwordRef.current.classList.remove('is-valid')}
        else if (regexContainsSpecial.test(password) === false ){isValid = false; setPasswordErr('Your Password Should Contain Special Characters');passwordRef.current.classList.add('is-invalid');passwordRef.current.classList.remove('is-valid')}
        else {isValid = true; setPasswordErr('') ; passwordRef.current.classList.remove('is-invalid'); passwordRef.current.classList.add('is-valid'); data = {...data, password : password}}

        if(confrimPass.trim() == '' || confrimPass.trim() == null || confrimPass.trim() == undefined){isValid = false; setConfrimPassErr(`This Field Can't Be Empty`) ; submitPasswordRef.current.classList.add('is-invalid'); submitPasswordRef.current.classList.remove('is-valid')}
        else if (confrimPass !== password){isValid = false; setConfrimPassErr('Input Does Not Match Password');submitPasswordRef.current.classList.add('is-invalid');submitPasswordRef.current.classList.remove('is-valid')}
        else {isValid = true; setConfrimPassErr('') ; submitPasswordRef.current.classList.remove('is-invalid'); submitPasswordRef.current.classList.add('is-valid')}
        
        if(!isValid) return;

        try{

            const response = await axios.post(`${BACKEND_URL}/api/auth/sign` , {data})

            setCookies('token' , resp.data.token , {path : '/' , maxAge :  2592000})
            setToggleAlert({status: true, type: "Success", statusCode: response.status, message: "Account Created Successfully."});

            setTimeout(() => {
                navigator('/' , {replace : true})
                window.location.reload()
            }, 3000)
                
        }catch(err){
            if(err.status === 400 & err.response.data.state === 'name') isValid = false ; setNameErr(`Name Already In Use`); nameRef.current.classList.add('is-invalid');nameRef.current.classList.remove('is-valid')
            if(err.status === 400 & err.response.data.state === 'email') isValid = false ; setEmailErr(`Email Already In Use`); emailRef.current.classList.add('is-invalid');emailRef.current.classList.remove('is-valid')
            if(err.status === 400 & err.response.data.state === 'phone') isValid = false ; setPhoneErr(`Phone Number Already In Use`); phoneRef.current.classList.add('is-invalid');phoneRef.current.classList.remove('is-valid')
            if(err.status === 500) setToggleAlert({status: true, type: "Internal_Error", statusCode: err.status, message: String(err.response?.data?.message || err.message || 'Unknown error')});
        }
    }

    return(
        <div className="main-container container-fluid d-flex flex-column justify-content-start " style={{maxWidth : '3000px'}}> 

            {toggleAlert.status ? <StatusMessage setToggleAlert={setToggleAlert} toggleAlert={toggleAlert}/> : <></>}
            
            <div className="main-body">
                
                <div className="main-start"><Sidebar /></div>
                <div className="main-end">
                    <div className="main-header"><Header /></div>

                    <div className="auth-container p-3 rounded-3 mt-3">

                        <h1 className='fw-bold' style={{color : '#10b981'}}>Create Your Account</h1>
                        <h4 className='mb-5'>Join us and start your journey today</h4>

                        <form onSubmit={SubmitForm}>

                            <div className="form-floating"> 
                                <input className="form-control" type="text" id="name" placeholder="" ref={nameRef} onChange={(e) => setName(e.target.value)} value={name}/>
                                <label htmlFor="name">Full Name</label>
                                <span className='errorMessage small'>{nameErr}</span>
                            </div>

                            <div className="form-floating"> 
                                <input className="form-control" type="email" id="email" placeholder="" ref={emailRef} onChange={(e) => setEmail(e.target.value)} value={email}/>
                                <label htmlFor="email">Email</label>
                                <span className='errorMessage small'>{emailErr}</span>
                            </div>

                            <div className="number-group h-100">
                                <div className="input-group m-0 p-0" style={{margin : '0px', padding : '0px'}}>
                                    <CountryCode setCountryCode={setCountryCode} countryRef={countryRef} countryCodeErr={countryCodeErr} phoneErr={phoneErr}/>
                                    
                                    <div className="form-floating" style={{margin : '0px'}}> 
                                        <input className="form-control" type="text " id="phonenumber" placeholder="" ref={phoneRef} onChange={(e) => setPhone(e.target.value)} value={phone}/>
                                        <label htmlFor="phonenumber">Phone Number</label>
                                    </div>
                                </div>

                                    <span className='errorMessage small'>{countryCodeErr}</span>
                                        <span className='errorMessage small'>{phoneErr}</span>
                            </div>
                            <div className="d">
                                <div className="input-group"> 
                                    <div className="form-floating">
                                        <input className="form-control" type={showPass ? 'text' : 'password'} id="name" placeholder="" ref={passwordRef} onChange={(e) => setPassword(e.target.value)} value={password}/>
                                        <label htmlFor="name">Password</label>
                                        <span className='errorMessage small'>{passwordErr}</span>
                                        
                                    </div>
                                    <button className={`showBtn ${passwordErr !== '' ?  'isInvalid' : ''} btn border-0 btn-0`} onClick={() => setShowPass(!showPass)}>{showPass ? <i class="fa-regular fa-eye-slash"></i> : <i class="fa-regular fa-eye"></i>}</button>
                                </div>
                            </div>
                            
                            <div className="input-group"> 
                                <div className="form-floating">
                                    <input className="form-control" type={showConfPass ? 'text' : 'password' } id="name" placeholder="" ref={submitPasswordRef} onChange={(e) => setConfrimPass(e.target.value)} value={confrimPass}/>
                                    <label htmlFor="name">Confrim Password</label>
                                    <span className='errorMessage small'>{confrimPassErr}</span>
                                    
                                </div>
                                <button className={`showBtn ${passwordErr !== '' ?  'isInvalid' : ''} btn border-0 btn-0`} onClick={() => setShowConfPass(!showConfPass)}>{showConfPass ? <i class="fa-regular fa-eye-slash"></i> : <i class="fa-regular fa-eye"></i>}</button>
                            </div>
                            <input className="submitBtn btn w-100" type="submit" value="Create Account" />
                        </form>
                        <Link to='/login' className="my-2 mx-2" replace>Already Have An Account?</Link>
                    </div>

                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Sign;