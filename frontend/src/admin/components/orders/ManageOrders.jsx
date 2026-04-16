import { Link } from "react-router-dom";
import AdminOrder from "../AdminOrder";
const ManageOrders = ({ orders, setOrders }) => {
    return (
        <div className="manage-orders-container">

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
                    <AdminOrder order={order} orderId={order.order_id} key={order.order_id} setOrders={setOrders}/>)) : "no on way items"}
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
            
        </div>
    );
};

export default ManageOrders ; 