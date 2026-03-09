import axios from "axios"
import { useEffect, useState } from "react"
import { useCookies } from "react-cookie"
import { useLocation } from "react-router-dom"

import { BACKEND_URL } from "../../config"

import Sidebar from "../layout/Sidebar"
import AdminList from '../admin/components/AdminList'
import AdminItem from "../admin/components/AdminItem"
import CreateProduct from "../admin/components/CreateProduct"

const AdminDashboard = () => {

    const { hash } = useLocation();
    const [ cookies ] = useCookies(['token'])

    const [ admins, setAdmins ] = useState(null)

    const [ pendings, setPendings] = useState([])
    const [ onway, setOnway ] = useState([])
    const [ delivered, setDelivered ] = useState([])

    const [ reports , setReports ] = useState([])
    const [ feedback, setFeedback ] = useState([])

    const [toggleCreateNew, setToggleCreateNew] = useState(false);

    const config = {headers: { Authorization: `Bearer ${cookies.token}`}}

    useEffect(() => {

        const fetchStatus = async () => {
            try {

                const response = await axios.get(`${BACKEND_URL}/api/dashboard`, config)

                setPendings(response.data.pending)
                setOnway(response.data.onWay)
                setDelivered(response.data.delivered)
                setAdmins(response.data.admins)


            } catch (error) {
                console.error("Dashboard fetch error:", error);
            }
        };

        return () => fetchStatus();

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

                            {pendings?.length > 0 ? delivered?.map((item, itemId) => (
                                <AdminItem item={itemId} prodId={prodId} key={key}/>
                            )) : "no pending items"} 

                            {onway?.length > 0 ? delivered?.map((item, itemId) => (
                                <AdminItem item={itemId} prodId={prodId} key={key}/>
                            )) : "no onway items"} 

                            {delivered?.length > 0 ? delivered?.map((item, itemId) => (
                                <AdminItem item={itemId} prodId={prodId} key={key}/>
                            )) : "no delivered items"} 


                        </section>

                        <section id="reports">
                            {/* <Reports reports={reports}/>
                            <Feedbacks feedback={feedback}/> */}
                        </section>

                    </div>
                </div>
            
        </div>
    )
}

export default AdminDashboard