import { Link } from "react-router-dom"
const NotFound = () => {
    return(
        <div className="not-found-container">
            Page Not Found
            <Link to='/'>Home</Link>
        </div>
    )
}

export default NotFound