import Privacy from "../components/legal/Privacy"
import Terms from "../components/legal/Terms"
import Sidebar from "../layout/Sidebar"
import { useEffect } from "react"
import { useLocation } from "react-router-dom"

const Legal = () => {

    const { hash } = useLocation()

    useEffect(() => {
        if (hash) {const el = document.querySelector(hash);if (el) {el.scrollIntoView({ behavior: "smooth" })}} ; return;
    }, [hash]);

    return(
        <div className="legal-container d-flex">
            <Sidebar />
            <div className="legal-main-container">
                <section id="terms"><Terms /></section>
                <section id="privacy"><Privacy /></section>
            </div>
        </div>
    )
}

export default Legal