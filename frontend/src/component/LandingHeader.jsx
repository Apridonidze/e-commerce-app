import { Link } from "react-router-dom"

const LandingHeader = () => {
    return(
        <div className="landing-header-container">
            <div className="landing-header-start">
                <span>E-Commerce</span>
            </div>
            <div className="landing-header-end">
                <Link to='/sign'>Sign Up</Link>
                <Link to='/login'>Log In</Link>
            </div>
        </div>
    )
}

export default LandingHeader