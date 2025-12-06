const Sign = () => {
    return(
        <div className="sign-container">
            <form>
                <div className="form-floating"> 
                    <input className="form-control" type="text" id="name" placeholder="Full Name" />
                    <label htmlFor="name">Full Name</label>
                </div>
                <div className="form-floating"> 
                    <input className="form-control" type="text" id="email" placeholder="Email" />
                    <label htmlFor="email">Email</label>
                </div>
                <div className="form-floating"> 
                    <input className="form-control" type="text" id="phonenumber" placeholder="Full Name" />
                    <label htmlFor="phonenumber">Phone Number</label>
                </div>
                <div className="form-floating"> 
                    <input className="form-control" type="text" id="name" placeholder="Full Name" />
                    <label htmlFor="name">Password</label>
                </div>
                <div className="form-floating"> 
                    <input className="form-control" type="text" id="name" placeholder="Full Name" />
                    <label htmlFor="name">Confrim Password</label>
                </div>
                <input type="submit" value="Create Account" />
            </form>
        </div>
    )
}


export default Sign