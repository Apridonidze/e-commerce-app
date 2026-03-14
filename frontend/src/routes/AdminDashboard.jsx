import axios from "axios"
import { useEffect, useState } from "react"
import { useCookies } from "react-cookie"
import { useLocation } from "react-router-dom"

import { BACKEND_URL } from "../../config"

import Sidebar from "../layout/Sidebar"
import AdminList from '../admin/components/AdminList'
import CreateProduct from "../admin/components/CreateProduct"
import AdminOrder from "../admin/components/AdminOrder"

import { Link } from "react-router-dom"

const AdminDashboard = () => {

    const { hash } = useLocation();
    const [ cookies ] = useCookies(['token'])

    const [ admins, setAdmins ] = useState(null)
    const [ orders,  setOrders ] = useState([])
    const [ reports , setReports ] = useState([])
    const [ feedback, setFeedback ] = useState([])

    const [toggleCreateNew, setToggleCreateNew] = useState(false);

    const [reportsOffset, setReportsOffset] = useState(0)

    const config = {headers: { Authorization: `Bearer ${cookies.token}`}}

    useEffect(() => {

        const fetchStatus = async () => {
            try {

                const response = await axios.get(`${BACKEND_URL}/api/dashboard`, config)
                const data = [...response.data.pending, response.data.onWay, response.data.delivered].filter((arr) => arr.length !== 0).flat()
                
                setOrders(data)
                setAdmins(response.data.admins) 


            } catch (error) {
                console.log("Dashboard fetch error:", error);
            }
        };


        const fetchReports = async () => {
            try{

                const response = await axios.get(`${BACKEND_URL}/api/report/${reportsOffset}`, config)
                console.log(response)

            }catch(err){
                console.log(err)
            }
        }

        fetchStatus();
        fetchReports();

    }, []);

    useEffect(() => {
        if (hash) {const el = document.querySelector(hash);if (el) {el.scrollIntoView({ behavior: "smooth" })}} ; return;
    }, [hash]);

    

    return(
        <div className="admin-dashboard-container">

                {toggleCreateNew ? <div><div className="create-product-bg position-fixed w-100 h-100 opacity-25" onClick={() => setToggleCreateNew(false)} style={{backgroundColor : 'black'}} tabIndex={999}></div><CreateProduct /></div> : <></> }
            
                <div className="row">
                        
                    <div className="admin-dashboard-start col">
                        <Sidebar />
                    </div>

                    <div className="admin-dashboard-end col">

                    <AdminList admins={admins} />

                        <section id="manage-products">

                            <button onClick={() => setToggleCreateNew(!toggleCreateNew)}>Add</button>

                            <div className="order-container">
                                <div className="order-header d-flex ">
                                    <h2>Pending Orders : {orders?.filter(prod => prod.status == 'Pending')?.length}</h2>
                                    <h4><Link to='/admin-dashboard/orders/pending-orders'>Visit</Link></h4>
                                </div>
                                {orders?.filter(prod => prod.status == 'Pending').length > 0 ? orders?.filter(prod => prod.status == 'Pending').map(order => (
                                    <AdminOrder order={order} orderId={order.order_id} key={order.order_id} setOrders={setOrders}/>
                                )) : "no pending items"}
                            </div>

                             <div className="order-container">
                                <div className="order-header d-flex ">
                                    <h2>On Way Orders : {orders?.filter(prod => prod.status == 'OnWay')?.length}</h2>
                                    <h4><Link to='/admin-dashboard/orders/onway-orders'>Visit</Link></h4>
                                </div>
                                {orders?.filter(prod => prod.status == 'OnWay').length > 0 ? orders?.filter(prod => prod.status == 'OnWay').map(order => (
                                    <AdminOrder order={order} orderId={order.order_id} key={order.order_id} setOrders={setOrders}/>
                                )) : "no on way items"}
                            </div>

                             <div className="order-container">
                                <div className="order-header d-flex ">
                                    <h2>Delivered Orders : {orders?.filter(prod => prod.status == 'Delivered')?.length}</h2>
                                    <h4><Link to='/admin-dashboard/orders/delivered-orders'>Visit</Link></h4>
                                </div>
                                {orders?.filter(prod => prod.status == 'Delivered').length > 0 ? orders?.filter(prod => prod.status == 'Delivered').map(order => (
                                    <AdminOrder order={order} orderId={order.order_id} key={order.order_id} setOrders={setOrders}/>
                                )) : "no delivered items"}
                            </div>

                        </section>

                        <section id="reports">
                            {/* <Report report={report} reportId={reportId} key={reportId}/> */}
                        </section>

                    </div>
                </div>
            
        </div>
    )
}

export default AdminDashboard