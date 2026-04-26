import Footer from "../layout/Footer"
import Sidebar from "../layout/Sidebar"
import Header from "../layout/Header"

import SupportChatContainer from "../components/supportchat/SupportChatContainer"

import { useContext, useState } from "react"
import { UserContext } from "../context/UserContext"

import '../styles/landing.css'

const Landing = () => {

    const { user } = useContext(UserContext)

    const [toggleAlert, setToggleAlert] = useState({status : false , type: '', statusCode : null, message : ''}); //states to toggle components
    

    return(
        <div className="main-container container-fluid d-flex flex-column justify-content-start " style={{maxWidth : '3000px'}}> 
            <div className="main-body" >

                <div className="main-start"><Sidebar /></div>

                <div className="main-end">

                    <div className="main-header"><Header /></div>
                
                    <div className="landing-container">
                        <section className="hero">
                            <h1 className="fw-bold">Discover Products Faster. Shop Smarter.</h1>
                            <p>A modern marketplace for fast, secure, and simple online shopping.</p>

                            <div className="hero-buttons">
                                <button className="btn primary"><i className="fa-solid fa-cart-shopping"></i> Start Shopping</button>
                                <button className="btn secondary"><i className="fa-solid fa-play"></i> View Products</button>
                            </div>

                            <small>Secure payments • Fast delivery • Live support</small>
                        </section>

                        <section className="section">
                            <h2 className="fw-bold">Everything You Need in One Platform</h2>

                            <div className="grid">
                            <div className="card">
                                <i className="fa-solid fa-bolt "></i>
                                <h3>Fast Ordering</h3>
                                <p>Place orders in seconds with a smooth checkout process.</p>
                            </div>

                            <div className="card">
                                <i className="fa-solid fa-lock "></i>
                                <h3>Secure Payments</h3>
                                <p>All transactions are protected with Stripe security.</p>
                            </div>

                            <div className="card">
                                <i className="fa-solid fa-truck "></i>
                                <h3>Reliable Delivery</h3>
                                <p>Track your orders from purchase to delivery.</p>
                            </div>

                            <div className="card">
                                <i className="fa-solid fa-comments "></i>
                                <h3>Live Support</h3>
                                <p>Get instant help through our support chat.</p>
                            </div>
                            </div>
                        </section>

                        <section className="section">
                            <h2 className="fw-bold">Explore Categories</h2>

                            <div className="categories">
                                <span className="category">Electronics <i className="fa-solid fa-arrow-right"></i></span>
                                <span className="category">Fashion <i className="fa-solid fa-arrow-right"></i></span>
                                <span className="category">Home <i className="fa-solid fa-arrow-right"></i></span>
                                <span className="category">Accessories <i className="fa-solid fa-arrow-right"></i></span>
                                <span className="category">Trending <i className="fa-solid fa-arrow-right"></i></span>
                            </div>
                        </section>

                        <section className="section">
                            <h2 className="fw-bold">How It Works</h2>

                            <div className="grid">
                                <div className="card">
                                    <h3>1. Browse Products</h3>
                                    <p>Find items you like from our catalog.</p>
                                </div>

                                <div className="card">
                                    <h3>2. Add to Cart</h3>
                                    <p>Save and manage your selected products.</p>
                                </div>

                                <div className="card">
                                    <h3>3. Secure Checkout</h3>
                                    <p>Complete your purchase safely.</p>
                                </div>

                                <div className="card">
                                    <h3>4. Receive Order</h3>
                                    <p>Track delivery in real time.</p>
                                </div>
                            </div>
                        </section>

                        <section className="trust">
                            <h2 className="fw-bold" style={{color : '#10b981'}}>Built for Trust</h2>
                            <p>Secure payments, verified users, and transparent feedback system ensure safety and reliability.</p>
                        </section>

                        <section className="support">
                            <h2 className="fw-bold" style={{color : '#10b981'}}>Still Need Help?</h2>
                            <p>Our support team is available anytime through live chat.</p>
                            <button className="btn border-0 px-4 py-2" onClick={() => setToggleChat(true)}>Open Support Chat</button>
                        </section>

                        <section className="cta">
                            <h2 className="fw-bold" style={{color : '#10b981'}}>Start Shopping Today</h2>
                            <p>Join now and experience a faster way to shop online.</p>

                            <button className="btn secondary">Get Started <i className="fa-solid fa-arrow-right"></i></button>
                        </section>

                        {!user ||  user?.role !== 'admin'  ? <></> : <SupportChatContainer setToggleAlert={setToggleAlert}/>}
                        
                    </div>
                    
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default Landing