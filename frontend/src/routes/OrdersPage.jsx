import { useEffect, useState } from "react"
import Sidebar from "../layout/Sidebar"
import axios from "axios";
import { BACKEND_URL } from "../../config";
import { useNavigate, useParams } from "react-router-dom";

const PendingOrder = () => {

    const params = useParams()
    console.log(params.orderStatus)

    const [offset, setOffset] = useState(0);
    const [orders,setOrders] = useState([])

    const navigator = useNavigate();

    useEffect(() => {

        if(params !== "pending-orders" || params !== "onway-orders" || params !== "delivered-orders"){
            navigator('/', {replace : true})
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

export default PendingOrder