import OrderBox from "./OrderBox";

const ManageOrders = ({ orders, setOrders }) => {

    const orderStatuses = ['Pending' , 'OnWay' , 'Delivered'];

    // add function here to remove orders or change statuses
    console.log(orders)
    return (
        <div className="manage-orders-container">
            <h1>Orders</h1>
            <div className="orders-container">

                {orderStatuses?.map((status => (    
                    <>
                        <h3>{status} Orders : </h3>
                        <h4>{orders?.filter(ord => ord.status == status).length > 0 ? orders?.filter(ord => ord.status == status).map(order => <OrderBox setOrders={setOrders} order={order}/>) : 'Empty State'}</h4>
                    </>
                )))}

            </div>
           
            
        </div>
    );
};

export default ManageOrders ; 