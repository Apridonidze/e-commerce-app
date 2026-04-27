import Privacy from "../components/legal/Privacy"
import Terms from "../components/legal/Terms"
import Footer from "../layout/Footer"
import Header from "../layout/Header"
import Sidebar from "../layout/Sidebar"
import { useEffect } from "react"
import { useLocation } from "react-router-dom"

const Legal = () => {

    const { hash } = useLocation()

    useEffect(() => {
        if (hash) {const el = document.querySelector(hash);if (el) {el.scrollIntoView({ behavior: "smooth" })}} ; return;
    }, [hash]);

    return(
        <div className="main-container container-fluid d-flex flex-column justify-content-start " style={{maxWidth : '3000px'}}> 
            <div className="main-body" >

                <div className="main-start"><Sidebar /></div>
                
                <div className="main-end">

                    <div className="main-header"> <Header /> </div>
                    <div className="legal-main-container">
                        
                        <h1 className="mt-5">Welcome to <strong style={{color : '#10b981'}}>Shoptic</strong></h1>
                        <h5 className="mb-5">These Terms of Service govern your use of our platform. By creating an account or using the platform, you agree to these terms.</h5>
                        
                        <section id="terms"><Terms /></section>
                        <section id="privacy"><Privacy /></section>
                    </div>
                </div>

            </div>
            <Footer />
        </div>
    )
}

export default Legal