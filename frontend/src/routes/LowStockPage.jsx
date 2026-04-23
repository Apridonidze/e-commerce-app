import Header from "../layout/Header"
import Sidebar from "../layout/Sidebar"
import Footer from "../layout/Footer"

import { useNavigate } from "react-router-dom"

const LowStockPage = () => {

    const navigator = useNavigate()

    return(
        <div className="main-container container-fluid d-flex flex-column justify-content-center border-2" style={{maxWidth : '3000px' , margin : 'auto'}}>

            <div className="main-body">
                <div className="main-start"><Sidebar /></div>
                <div className="main-end">

                    <div className="main-header">

                        <Header />
                        
                        <div className="orders-page-header-buttons d-flex justify-content-between pt-3">
                            <div className="order-page-header-start"><button className="return d-flex gap-2 align-items-center btn border-0 fs-6" onClick={() => {navigator('/admin-dashboard', {replace : true})}}><i class="fa-solid fa-arrow-left"></i> Return</button></div>
                        </div>
                    
                    </div>

                    <div className="low-stock-page-main rounded-3 mt-4 py-2">

                        
                    </div>

                </div>
            </div>
            <Footer />
        </div>
    )
}

export default LowStockPage;