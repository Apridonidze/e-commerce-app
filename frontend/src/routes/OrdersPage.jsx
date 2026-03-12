import { useEffect, useState } from "react"
import Sidebar from "../layout/Sidebar"
import axios from "axios";
import { BACKEND_URL } from "../../config";
import { useNavigate, useParams } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

const OrdersPage = () => {

    const params = useParams()
    
    const { user } = useContext(UserContext)

    const [offset, setOffset] = useState(0);
    const [orders,setOrders] = useState([])

    const navigator = useNavigate();

    const allowedParams = ["pending-orders", "onway-orders", "delivered-orders"]
    

    useEffect(() => {

        if(!allowedParams.includes(params?.orderStatus) && user?.role !== 'admin'){
            navigator('/*', {replace : true})
        }

        const fetchOrder = async() => {
            try{

                const response = await axios.get(`${BACKEND_URL}/api/dashboard/${params.orderStatus}/${offset}`)
                console.log(response)

            }catch(err){
                console.log(err)
            }
        }

        fetchOrder()

    },[offset, params])

    return(

        <div className="pending-orders-container d-flex">
            <Sidebar />
            <div className="main-container">
                <div className="prevbtn">
                    <button>PrevUrl</button>
                </div>
            </div>
        </div>
    )
}

export default OrdersPage