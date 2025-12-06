import { useRef, useState } from "react";

const Sign = () => {

    const NumberRegex = /\d/;
    const regexContainsSpecial = /[^\w\s]/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const [nameErr, setNameErr] = useState()
    const [emailErr, setEmailErr] = useState()
    const [phoneErr, setPhoneErr] = useState()
    const [passwordErr, setPasswordErr] = useState()
    const [confrimPassErr, setConfrimPassErr] = useState()

    const nameRef = useRef(null)
    const emailRef = useRef(null)
    const phoneRef = useRef(null)
    const passwordRef = useRef(null)
    const submitPasswordRef = useRef(null)


    const SubmitForm = () => {

        let isValid
        let data = {}



    }

    return(
        <div className="sign-container" onSubmit={SubmitForm}>
            <form>
                <div className="form-floating"> 
                    <input className="form-control" type="text" id="name" placeholder="Full Name" ref={nameRef}/>
                    <label htmlFor="name">Full Name</label>
                </div>
                <div className="form-floating"> 
                    <input className="form-control" type="text" id="email" placeholder="Email" ref={emailRef}/>
                    <label htmlFor="email">Email</label>
                </div>
                <div className="form-floating"> 
                    <input className="form-control" type="text" id="phonenumber" placeholder="Full Name" ref={phoneRef}/>
                    <label htmlFor="phonenumber">Phone Number</label>
                </div>
                <div className="form-floating"> 
                    <input className="form-control" type="text" id="name" placeholder="Full Name" ref={passwordRef}/>
                    <label htmlFor="name">Password</label>
                </div>
                <div className="form-floating"> 
                    <input className="form-control" type="text" id="name" placeholder="Full Name" ref={submitPasswordRef}/>
                    <label htmlFor="name">Confrim Password</label>
                </div>
                <input type="submit" value="Create Account" />
            </form>
        </div>
    )
}


export default Sign