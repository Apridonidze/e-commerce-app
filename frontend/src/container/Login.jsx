import axios from 'axios'
import { useRef, useState } from "react"

import {BACKEND_URL} from '../../config'

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

    const submitLogin = async (e) => {

        e.preventDefault()

        let isValid 
        let data

        if(email.trim() == '' || password.trim() == email || password.trim() == email){isValid = false; setEmailErr(`This Field Can't Be Empty`) ; emailRef.current.classList.add('is-invalid'); emailRef.current.classList.remove('is-valid')}
        else if(emailRegex.test(email) === false){isValid = false ; emailRef.current.classList.add('is-invalid') ; emailRef.current.classList.remove('is-valid'); setEmailErr('Insert Valid Email!')}
        else {isValid = true ;emailRef.current.classList.add('is-valid') ; emailRef.current.classList.remove('is-invalid'); setEmailErr(''); data = {...data, email : email}}

        if(password.trim() == '' || password.trim() == null || password.trim() == undefined){isValid = false; setPasswordErr(`This Field Can't Be Empty`) ; passwordRef.current.classList.add('is-invalid'); passwordRef.current.classList.remove('is-valid')}
        else if (password.trim().length <= 8 ){isValid == false ; setPasswordErr('Your Password Should Be 8 Letters Long'); passwordRef.current.classList.add('is-invalid');passwordRef.current.classList.remove('is-valid')}
        else if (NumberRegex.test(password) === false ) {isValid = false ; setPasswordErr('Your Password Should Contain Numbers');passwordRef.current.classList.add('is-invalid');passwordRef.current.classList.remove('is-valid')}
        else if (regexContainsSpecial.test(password) === false ){isValid = false; setPasswordErr('Your Password Should Contain Special Characters');passwordRef.current.classList.add('is-invalid');passwordRef.current.classList.remove('is-valid')}
        else {isValid = true; setPasswordErr('') ; passwordRef.current.classList.remove('is-invalid'); passwordRef.current.classList.add('is-valid'); data = {...data, password : password}}
        
        if(isValid){
            try{

                await axios.post(`${BACKEND_URL}/login` , {data : data}).then(resp => console.log(resp))


            }catch(err){
                console.log(err)
            }
        }
    
    }

    return(
        <div className="login-container">
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
        </div>
    )
}

export default Login