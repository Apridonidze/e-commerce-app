import { useRef, useState } from "react";

const Sign = () => {

    const NumberRegex = /\d/;
    const regexContainsSpecial = /[^\w\s]/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const [name , setName] = useState()
    const [email,setEmail] = useState()
    const [countryCode, setCountryCode] = useState()
    const [phone, setPhone] = useState()
    const [password, setPassword] = useState()
    const [confrimPass, setConfrimPass] = useState()

    const [nameErr, setNameErr] = useState()
    const [emailErr, setEmailErr] = useState()
    const [countryCodeErr , setCountryCodeErr] = useState()
    const [phoneErr, setPhoneErr] = useState()
    const [passwordErr, setPasswordErr] = useState()
    const [confrimPassErr, setConfrimPassErr] = useState()

    const nameRef = useRef(null)
    const emailRef = useRef(null)
    const phoneRef = useRef(null)
    const passwordRef = useRef(null)
    const submitPasswordRef = useRef(null)


    const SubmitForm = (e) => {

        e.preventDefault()

        let isValid
        let data = {}

        
        if(name.trim() == '' || name.trim() == null || name.trim() == undefined){isValid = false ; setNameErr(`This Field Can't Be Empty`); nameRef.current.classList.add('is-invalid');nameRef.current.classList.remove('is-valid')}
        else if(name.trim().length <= 1){isValid = false; setNameErr('Enter Your Full Name (name , surname)'); nameRef.current.classList.add('is-invalid');nameRef.current.classList.remove('is-valid')}
        else if(regexContainsSpecial.test(name) === true){isValid = false; setNameErr('Your Full Name Should Not Contain Special Characters'); nameRef.current.classList.add('is-invalid');nameRef.current.classList.remove('is-valid')}
        else if(NumberRegex.test(name) === true){isValid = false; setNameErr('Your Full name Should Not Contain Numbers'); nameRef.current.classList.add('is-invalid');nameRef.current.classList.remove('is-valid')}
        else if (name.split(' ').length < 2){isValid = false; setNameErr('Enter Your Full Name'); nameRef.current.classList.add('is-invalid');nameRef.current.classList.remove('is-valid')}
        else {isValid = true; setNameErr('') ;nameRef.current.classList.add('is-valid') ;nameRef.current.classList.remove('is-invalid'); data = {...data,name:name}}

        if(email.trim() == '' || password.trim() == email || password.trim() == email){isValid = false; setEmailErr(`This Field Can't Be Empty`) ; emailRef.current.classList.add('is-invalid'); emailRef.current.classList.remove('is-valid')}
        else if(emailRegex.test(email) === false){isValid = false ; emailRef.current.classList.add('is-invalid') ; emailRef.current.classList.remove('is-valid'); setEmailErr('Insert Valid Email!')}
        else {isValid = true ;emailRef.current.classList.add('is-valid') ; emailRef.current.classList.remove('is-invalid'); setEmailErr(''); data = {...data, email : email}}



        if(password.trim() == '' || password.trim() == null || password.trim() == undefined){isValid = false; setPasswordErr(`This Field Can't Be Empty`) ; passwordRef.current.classList.add('is-invalid'); passwordRef.current.classList.remove('is-valid')}
        else if (password.trim().length <= 8 ){isValid == false ; setPasswordErr('Your Password Should Be 8 Letters Long'); passwordRef.current.classList.add('is-invalid');passwordRef.current.classList.remove('is-valid')}
        else if (NumberRegex.test(password) === false ) {isValid = false ; setPasswordErr('Your Password Should Contain Numbers');passwordRef.current.classList.add('is-invalid');passwordRef.current.classList.remove('is-valid')}
        else if (regexContainsSpecial.test(password) === false ){isValid = false; setPasswordErr('Your Password Should Contain Special Characters');passwordRef.current.classList.add('is-invalid');passwordRef.current.classList.remove('is-valid')}
        else {isValid = true; setPasswordErr('') ; passwordRef.current.classList.remove('is-invalid'); passwordRef.current.classList.add('is-valid'); data = {...data, password : password}}


    }

    return(
        <div className="sign-container" onSubmit={SubmitForm}>
            <form>
                <div className="form-floating"> 
                    <input className="form-control" type="text" id="name" placeholder="Full Name" ref={nameRef} onChange={(e) => setName(e.target.value)} value={name}/>
                    <label htmlFor="name">Full Name</label>
                </div>
                <div className="form-floating"> 
                    <input className="form-control" type="text" id="email" placeholder="Email" ref={emailRef} onChange={(e) => setEmail(e.target.value)} value={email}/>
                    <label htmlFor="email">Email</label>
                </div>
                <div className="form-floating"> 
                    <input className="form-control" type="text" id="phonenumber" placeholder="Full Name" ref={phoneRef} onChange={(e) => setPhone(e.target.value)} value={phone}/>
                    <label htmlFor="phonenumber">Phone Number</label>
                </div>
                <div className="form-floating"> 
                    <input className="form-control" type="text" id="name" placeholder="Full Name" ref={passwordRef} onChange={(e) => setPassword(e.target.value)} value={password}/>
                    <label htmlFor="name">Password</label>
                </div>
                <div className="form-floating"> 
                    <input className="form-control" type="text" id="name" placeholder="Full Name" ref={submitPasswordRef} onChange={(e) => setConfrimPass(e.target.value)} value={confrimPass}/>
                    <label htmlFor="name">Confrim Password</label>
                </div>
                <input type="submit" value="Create Account" />
            </form>
        </div>
    )
}


export default Sign