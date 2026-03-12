import { useEffect, useState } from "react"
import Sidebar from "../layout/Sidebar"
import axios from "axios";
import { BACKEND_URL } from "../../config";

const PendingOrder = () => {

    const [offset, setOffset] = useState(0);
    const [orders,setOrders] = useState([])

    useEffect(() => {

        const fetchOrder = async() => {
            try{

                const response = await axios.get(`${BACKEND_URL}/api/dashboard`)


            }catch(err){
                console.log(err)
            }
        }

        fetchOrder()

    },[offset])

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