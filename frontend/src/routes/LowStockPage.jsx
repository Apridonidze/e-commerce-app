import axios from "axios"
import { BACKEND_URL } from "../../config"

import Header from "../layout/Header"
import Sidebar from "../layout/Sidebar"
import Footer from "../layout/Footer"

import EmptyLowStock from "../empty/EmptyLowStock"
import Product from "../components/product/Product"
import StatusMessage from "../alerts/StatusMessage"

import EditProduct from "../admin/components/EditProduct"
import RemoveProduct from "../admin/components/RemoveProduct"
import ReportProduct from "../components/report/ReportProduct"

import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { useCookies } from "react-cookie"

import { NavLink } from "react-router-dom"

import LowStockProduct from "../components/product/LowStockProduct"
import StockRow from "../admin/components/StockRow"

const LowStockPage = () => {

    const [ cookies ] = useCookies(['token'])
    const config = { headers : {Authorization : `Bearer ${cookies.token}`}}
    const navigator = useNavigate()

    const [toggleEdit , setToggleEdit] = useState({status : false, product: null});
    const [toggleRemove , setToggleRemove] = useState({status : false, product: null});

    const [isLowStockLoading, setIsLowStockLoading] = useState(true)
    const [lowStock, setLowStock] = useState([])
    const [toggleAlert, setToggleAlert] = useState({status : false , type: '', statusCode : null, message : ''}); //states to toggle components
    const [offset, setOffset] = useState(0)

    useEffect(() => {
        const fetchLowStockItems = async() => {
            try{
                const response = await axios.get(`${BACKEND_URL}/api/dashboard/low-stock/${offset}`, config)
                
                setIsLowStockLoading(false)
                if(response.status === 204) return setLowStock([]);

                setLowStock(response.data.items)

            }catch(err){
                setIsLowStockLoading(false)
                setLowStock([])
                setToggleAlert({status: true, type: "Internal_Error", statusCode: err.status, message: String(err.response?.data?.message || err.message || 'Unknown error')}); //toggling error message
            }
        } 

        fetchLowStockItems();
    }, [offset])

                

    return(
        <div className="main-container container-fluid d-flex flex-column justify-content-center border-2" style={{maxWidth : '3000px' , margin : 'auto'}}>
            {toggleAlert.status ? <StatusMessage setToggleAlert={setToggleAlert} toggleAlert={toggleAlert}/> : <></>}

            {toggleRemove.status ? <><div className="manage-product-background" style={{zIndex : 1000}} onClick={() => setToggleRemove({status : false, product  :null})}></div><RemoveProduct setToggleRemove={setToggleRemove} toggleRemove={toggleRemove} setToggleAlert={setToggleAlert}/></> : <></> }
            {toggleEdit.status ? <><div className="manage-product-background" style={{zIndex : 1000}} onClick={() => setToggleEdit({status : false, product  :null})}></div> <EditProduct setToggleEdit={setToggleEdit} toggleEdit={toggleEdit} setToggleAlert={setToggleAlert}/> </> : <></> }


            <div className="main-body">
                <div className="main-start"><Sidebar /></div>
                <div className="main-end">

                    <div className="main-header">

                        <Header />
                        
                        <div className="orders-page-header-buttons d-flex justify-content-between pt-3">
                            <div className="order-page-header-start">
                                <button className="return d-flex gap-2 align-items-center btn border-0 fs-6" onClick={() =>    {navigator('/admin-dashboard', {replace : true})}}><i class="fa-solid fa-arrow-left"></i> Return</button>
                            </div>
                            <div className="order-page-header-end">
                                <NavLink to='/admin-dashboard/orders/OnWay' className={({ isActive }) => isActive ? "active-order" : ""}>OnWay</NavLink>
                                <NavLink to='/admin-dashboard/orders/Delivered' className={({ isActive }) => isActive ? "active-order" : ""}>Delivered</NavLink>
                            </div>
                        </div>
                    
                    </div>

                    <div className="low-stock-page-main rounded-3 mt-4 py-2">

                        <section id="">{isLowStockLoading ? 'laoding' : <StockRow lowStock={lowStock} setToggleEdit={setToggleEdit} setToggleRemove={setToggleRemove} setOffset={setOffset}/>}</section>
                        <section id="">{isLowStockLoading ? 'laoding' : <StockRow lowStock={lowStock} setToggleEdit={setToggleEdit} setToggleRemove={setToggleRemove} setOffset={setOffset}/>}</section>

                    </div>

                </div>
            </div>
            <Footer />
        </div>
    )
}

export default LowStockPage;