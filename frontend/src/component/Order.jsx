const Order = () => {

    const orderItems = async() => {
        try{

            const order = await axios.post(`${BACKEND_URL}/api/order` , {} , {headers : {Authorization : `Bearer ${cookies.token}`}})

            console.log(order)

        }catch(err){
            console.log(err)
        }
    }

    return(
        <div className="order-container">
            <h1>Choose Items to be delivered</h1>

        </div>
    )
}

export default Order