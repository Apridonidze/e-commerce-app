import searchIcon from '../assets/icons/search.png'
import moonIcon from '../assets/icons/moon.png'
import cartIcon from '../assets/icons/cart.png'
import notificationIcon from '../assets/icons/bell.png'

const Header = () => {
    return(
        <div className="header-container">

            <div className="header-start">
                <div className="input-group">
                    <img src={searchIcon} alt="Search Icon" />
                    <input type="text" />
                </div>
            </div>

            <div className="header-end">
                <img src={moonIcon} alt="Moon Icon" />
                <img src={cartIcon} alt="Cart Icon" />
                <img src={notificationIcon} alt="Notifications Icon" />
            </div>
            
        </div>
    )
}

export default Header