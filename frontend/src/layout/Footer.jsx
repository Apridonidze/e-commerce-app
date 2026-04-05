import { Link } from "react-router-dom"

const Footer = () => {
    return(
        <footer className="footer-component mt-5 mb-2 d-flex">

            <div className="footer-row"><span className='fs-3 fw-bold' style={{color : "#10b981"}}>Shoptic</span></div>
            <div className="footer-row">
                <Link to={'/faq'}>FAQ</Link>
                <Link to={'/legal'}>Terms & Policy</Link>
                <Link to={'/report-platform'} >Report</Link>   
            </div>
            <div className="footer-row">
                <span>© {new Date().getFullYear()} Shoptic. All rights reserved.</span>
            </div>

        </footer>
    );
};

export default Footer;