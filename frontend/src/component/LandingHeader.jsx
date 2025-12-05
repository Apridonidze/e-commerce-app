import Icon from '../assets/icons/logo-base.png'
import moonIcon from '../assets/icons/moon.png'

const LandingHeader = () => {
    return(
        <div className="landing-header-container">
            <div className="landing-header-start">
                <img src={Icon} alt="Logo Icon" />
                <span>E-Commerce</span>
            </div>
            <div className="landing-header-end">
                <img src={moonIcon} alt="Moon Icon" />
            </div>
        </div>
    )
}

export default LandingHeader