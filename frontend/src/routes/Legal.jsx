import Sidebar from "../layout/Sidebar"
import Privacy from "../component/Privacy"
import Terms from "../component/Terms"
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