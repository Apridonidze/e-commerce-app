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
import AdminHeader from "../admin/components/AdminHeader"

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
        const fetchLowStockItems = async(status) => {
            try{
                const response = await axios.get(`${BACKEND_URL}/api/dashboard/low-stock/${offset}`, config)
                
                setIsLowStockLoading(false)
                if(response.status === 204) return setLowStock([]);

                setLowStock(response.data.data)

            }catch(err){
                setIsLowStockLoading(false)
                setLowStock([])
                setToggleAlert({status: true, type: "Internal_Error", statusCode: err.status, message: String(err.response?.data?.message || err.message || 'Unknown error')}); //toggling error message
            }
        } 

        fetchLowStockItems();
    }, [offset])

    console.log(lowStock)
                

    return(
        <div className="main-container container-fluid d-flex flex-column justify-content-center border-2" style={{maxWidth : '3000px' , margin : 'auto'}}>
            {toggleAlert.status ? <StatusMessage setToggleAlert={setToggleAlert} toggleAlert={toggleAlert}/> : <></>}

            {toggleRemove.status ? <><div className="manage-product-background" style={{zIndex : 1000}} onClick={() => setToggleRemove({status : false, product  :null})}></div><RemoveProduct setToggleRemove={setToggleRemove} toggleRemove={toggleRemove} setToggleAlert={setToggleAlert}/></> : <></> }
            {toggleEdit.status ? <><div className="manage-product-background" style={{zIndex : 1000}} onClick={() => setToggleEdit({status : false, product  :null})}></div> <EditProduct setToggleEdit={setToggleEdit} toggleEdit={toggleEdit} setToggleAlert={setToggleAlert}/> </> : <></> }


            <div className="main-body">
                <div className="main-start"><Sidebar /></div>
                <div className="main-end">

                    <div className="main-header">

                        <AdminHeader />
                        
                        <div className="orders-page-header-buttons d-flex justify-content-between pt-3">
                            <div className="order-page-header-start">
                                <button className="return d-flex gap-2 align-items-center btn border-0 fs-6" onClick={() =>    {navigator('/admin-dashboard', {replace : true})}}><i class="fa-solid fa-arrow-left"></i> Return</button>
                            </div>
                        </div>
                    
                    </div>

                    <div className="low-stock-page-main rounded-3 my-4 py-2">

                        <section className="mt-1">
                            <h4><i class="fas fa-chart-line p-2 w-auto rounded-1" style={{color : '#f49600', backgroundColor : "rgba(244, 150, 0, 0.2)"}}></i> Low Stock Items</h4>
                            {lowStock.low?.length !== 0 ? <div className="products">{lowStock.low?.map(prod => <LowStockProduct prod={prod} setToggleEdit={setToggleEdit} setToggleRemove={setToggleRemove }/>)}</div> 
                            : <EmptyLowStock />}

                            {lowStock.low?.length % 5 !== 0 || lowStock.low?.length === 0 ? <></> : 
                                <button className="btn d-flex text-white fw-bold my-5 align-items-center py-2 justify-content-center mx-auto w-25 " style={{backgroundColor : "#10b981", height : '50px', textAlign: 'center'}} onClick={() => setOffset((prev) => {if(lowStock.length % 5 === 0){return prev + 5} return prev})}>Load More Items...</button>
                            }
                        </section>

                        <section className="mt-5">
                            <h4><i class="fas fa-ban p-2 w-auto rounded-1" style={{color : '#d13242', backgroundColor : "rgba(196, 48, 62, 0.2)"}}></i> Out Of Stock Items</h4>

                            {lowStock.out?.length !== 0 ? <div className="products">{lowStock.out?.map(prod => <LowStockProduct prod={prod} setToggleEdit={setToggleEdit} setToggleRemove={setToggleRemove }/>)}</div> 
                            : <EmptyLowStock />}

                            {lowStock.out?.length % 5 !== 0 || lowStock.out?.length === 0 ? <></> : 
                                <button className="btn d-flex text-white fw-bold my-5 align-items-center py-2 justify-content-center mx-auto w-25 " style={{backgroundColor : "#10b981", height : '50px', textAlign: 'center'}} onClick={() => setOffset((prev) => {if(lowStock.length % 5 === 0){return prev + 5} return prev})}>Load More Items...</button>
                            }
                        </section>

                    </div>

                </div>
            </div>
            <Footer />
        </div>
    )
}

export default LowStockPage;