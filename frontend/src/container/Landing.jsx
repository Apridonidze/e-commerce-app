import LandingHeader from "../component/LandingHeader"
import Sidebar from "../component/Sidebar"

const Landing = () => {
    return(
        <div className="landing-container">
            <div className="landing-start">
                <Sidebar />
            </div>
            <div className="landing-end">
                <LandingHeader />
            </div>
            
        </div>
    )
}

export default Landing