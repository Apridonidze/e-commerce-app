import OrderBox from "./OrderBox";

const ManageOrders = ({ orders, setOrders }) => {

    const orderStatuses = ['Pending' , 'OnWay' , 'Delivered'];

    // add function here to remove orders or change statuses

    return (
        <div className="manage-orders-container">
            <h1>Orders</h1>
            <div className="order-container">

                {orderStatuses?.map((status => (
                     <>
                        <h2>{status} Orders : {orders?.filter(ord => ord.status == status).length > 0 ? orders?.filter(ord => ord.status == status).map(order => <OrderBox setOrders={setOrders} order={order}/>) : 'Empty State'}</h2>
                    </>
                )))}

            </div>
           
            
        </div>
    );
};

export default ManageOrders ; 