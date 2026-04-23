import { Link } from "react-router-dom"

const Footer = () => {
    return(
        <footer className="footer-component mt-5 pt-5 d-flex flex-column w-100 justify-content-space-between">

            <div className="footer-row1 w-100 justify-content-evenly align-items-start">
                <div className="footer-row">
                    <span className='fs-3 fw-bold' style={{color : "#10b981"}}>Shoptic</span>
                    
                </div>

                <div className="footer-column pt-1 fw-medium ">
                    <h6 className="fw-bold">Shop</h6>
                    <Link to={'/faq'}>Home</Link>
                    <Link to={'/sales'}>On Sale</Link>
                    <Link to={'/landing-page'} >About Us</Link>   
                </div>

                <div className="footer-column pt-1 fw-medium">
                    <h6 className="fw-bold">Support</h6>
                    <Link to={'/faq'}>FAQ</Link>
                    <Link to={'/legal'}>Terms & Policy</Link>
                    <Link to={'/report-platform'} >Report</Link>
                </div>

                <div className="footer-column pt-1 fw-medium">
                    <h6 className="fw-bold">Leave Your Feedback Here : </h6>
                    <Link to={'/leave-feedback'}>Feedback</Link>
                </div>

            </div>

            <div className="footer-row2">
                <span>© {new Date().getFullYear()} Shoptic. All rights reserved.</span>

                <div className="footer-icons">
                    <i className="fa-brands fa-cc-stripe"></i>
                    <i className="fa-solid fa-building-columns"></i>
                    <i className="fa-solid fa-truck"></i>
                    <i className="fa-solid fa-bag-shopping"></i>
                </div>
            </div>
        </footer>
    );
};

export default Footer;