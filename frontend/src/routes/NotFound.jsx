import { Link } from "react-router-dom"
import Footer from "../layout/Footer"
const NotFound = () => {
    return(
        <div className="not-found-page-container">
            <div className="not-found-start">
                <div className="not-found-container mx-auto">
                    <h1 className="fw-bold">Page Not Found</h1>
                    <h6 className="small mb-5">The page you’re looking for doesn’t exist or may have been moved.</h6>
                    <Link to='/'><button className="btn border-0 bg-0 fs-6 text-white"><i class="fa-solid fa-house text-white"></i> Back to Home</button></Link>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default NotFound