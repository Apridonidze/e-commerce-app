import moonIcon from '../assets/icons/moon.png'
import cartIcon from '../assets/icons/cart.png'
import notificationIcon from '../assets/icons/bell.png'

const Header = () => {
    return(
        <div className="header-container  d-flex justify-content-between">

            <div className="header-start  ">
                <div className="input-group align-items-center">
                    <i class="fa-solid fa-magnifying-glass"></i>
                    <input type="text" className='form-control' />
                </div>
            </div>

            <div className="header-end ">
                <img src={moonIcon} alt="Moon Icon" />
                <img src={cartIcon} alt="Cart Icon" />
                <img src={notificationIcon} alt="Notifications Icon" />
            </div>
            
        </div>
    )
}

export default Header