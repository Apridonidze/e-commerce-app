import { Link } from "react-router-dom"

const Footer = () => {
    return(
        <footer className="footer-component mt-5 pt-5 d-flex flex-column w-100 justify-content-space-between">

            <div className="footer-row1 w-100 justify-content-between align-items-start">
                <div className="footer-row">
                    <div className="icon-container d-flex align-items-center gap-3 mb-3" onClick={() => navigator('/', {replace : true})} style={{cursor : 'pointer'}}>
                        <span className="icon"></span>
                        <span className='fs-3 fw-bold' style={{color : "#10b981"}}>Shoptic</span>
                    </div>
                    <span className="small text-secondary text-break" >Your trusted marketplace for quality products, fast delivery, and secure shopping.</span>
                </div>

                <div className="footer-column pt-1 fw-medium ">
                    <h6 className="fw-bold">Shop</h6>
                    <div className="footer-column-row">
                        <Link to={'/faq'}>
                        <div className="link-start"><i class="fa-solid fa-house"></i></div>
                        <div className="link-end">
                            <span>Home</span>
                            <span className="small">/home</span>
                        </div>
                    </Link>
                    <Link to={'/sales'}>
                        <div className="link-start"><i class="fa-solid fa-tag"></i></div>
                        <div className="link-end">
                            <span>On Sale</span>
                            <span className="small">/sale</span>
                        </div>
                    </Link>
                    <Link to={'/landing-page'}>
                        <div className="link-start"><i className="fa-solid fa-circle-info"></i></div>
                        <div className="link-end">
                            <span>About Us</span>
                            <span className="small">/about</span>
                        </div>
                    </Link>
                    </div>
                </div>

                <div className="footer-column pt-1 fw-medium">
                    <h6 className="fw-bold">Support</h6>
                    <div className="footer-column-row">
                        <Link to={'/faq'}>
                        <div className="link-start"><i className="fa-solid fa-circle-question"></i></div>
                        <div className="link-end">
                            <span>FAQ</span>
                            <span className="small">/faq</span>
                        </div>
                    </Link>

                    <Link to={'/legal'}>
                        <div className="link-start"><i className="fa-solid fa-scale-balanced"></i></div>
                        <div className="link-end">
                            <span>Terms & Policy</span>
                            <span className="small">/legal</span>
                        </div>
                    </Link>

                    <Link to={'/report-platform'}>
                        <div className="link-start"><i className="fa-solid fa-flag"></i></div>
                        <div className="link-end">
                            <span>Report</span>
                            <span className="small">/report</span>
                        </div>
                    </Link>
                    </div>
                </div>

                <div className="footer-column pt-1 fw-medium align-items-start">
                    <h6 className="fw-bold">Feedback </h6>
                    <span>Help us improve your experience</span>
                        <Link to={'/leave-feedback'} className="feedback-border">
                        <div className="link-start"><i className="fa-solid fa-comment-dots" style={{color : '#10b981'}}></i></div>
                        <div className="link-end">
                            <span style={{color : '#10b981'}}>Leave Feedback</span>
                            <span className="small mt-1">/feedback</span>
                        </div>
                    </Link>
                </div>

            </div>

            <div className="footer-row2 ">
                <span>© {new Date().getFullYear()} <span className="fw-bold" style={{color : '#10b981'}}>Shoptic</span>. All rights reserved.</span>

                <div className="footer-column d-flex flex-row gap-4 pt-1 fw-medium">

                    <Link to={'/legal'}>
                        <div className="link-end">
                            <span>Terms of Service</span>
                            <span className="small">/terms</span>
                        </div>
                    </Link>

                    <Link to={'/legal'}>
                        <div className="link-end">
                            <span>Privacy Policy</span>
                            <span className="small">/legal</span>
                        </div>
                    </Link>

                </div>

                <div className="footer-icons">
                    <i class="fa-brands fa-cc-visa"></i>
                    <i class="fa-brands fa-cc-mastercard"></i>
                    <i className="fa-brands fa-cc-stripe"></i>
                </div>

                <div className="footer-line">
                    <span><i class="fa-solid fa-truck-fast"></i> Fast Delivery</span>
                    <span><i class="fa-solid fa-lock"></i> Secure Payment</span>
                </div>

            </div>
        </footer>
    );
};

export default Footer;