import OrderBox from "./OrderBox";

const ManageOrders = ({ orders, setOrders }) => {

    const orderStatuses = ['Pending' , 'OnWay' , 'Delivered'];



    const handleStatusChange = async(id) => {
        try{

            const response = await axios.put(`${BACKEND_URL}/api/dashboard/${order.order_id}` , {status}, {headers : {Authorization : `Bearer ${cookies.token}`}})
            if(response.status === 200){
                setStatus(response.data.status)
                setOrders(prevOrders => prevOrders?.map(ord => ord.order_id === order.order_id ? { ...ord, status: response.data.status } : ord))
            }

        }catch(err){
            console.log(err)
        }
    }


    const removeOrder = async(id) => {
        try{

            const response = await axios.delete(`${BACKEND_URL}/api/order/admin-remove/${id}` , {headers: {Authorization : `Bearer ${cookies.token}`}})

            if(response.status === 200)return setOrders(prev => prev.filter(ord => ord.order_id !== order.order_id))
            // toggle stattus 400 alert messagee
            setToggleDrop(false)

        }catch(err){
            // toggle alert message
            console.log(err)
        }
    }

    return (
        <div className="manage-orders-container">
            <h1>Orders</h1>
            <div className="orders-container">

                {orderStatuses?.map((status => (    
                    <>
                        <h3 className="d-flex align-items-center gap-2 fs-4">{status} Orders <span className="text-secondary fs-6">( {orders?.filter(ord => ord.status == status).length} )</span></h3>
                        <h4>{orders?.filter(ord => ord.status == status).length > 0 ? orders?.filter(ord => ord.status == status).map(order => <OrderBox order={order} orderStatuses={orderStatuses} handleStatusChange={handleStatusChange} removeOrder={removeOrder}/>) : 'Empty State'}</h4>
                    </>
                )))}

            </div>
           
            
        </div>
    );
};

export default ManageOrders ; 