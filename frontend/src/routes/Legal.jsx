import Sidebar from "../layout/Sidebar"
import Privacy from "../component/Privacy"
import Terms from "../component/Terms"

const Legal = () => {
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