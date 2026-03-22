import { useCookies } from "react-cookie"
import { BACKEND_URL } from "../../config"
import axios from "axios"
import OrderCheckbox from "./OrderCheckbox"
import { useEffect, useRef, useState } from "react"
import SubmitOrder from "./SubmitOrder"

const Order = ({ setCart, cart }) => {

    const [cookies] = useCookies(['token'])
    const [selectedItems, setSelectedItems] = useState([])
    const [totalPrice, setTotalPrice] = useState(0)
    const [address, setAddress] = useState('');

    const checkboxRef = useRef([null])
    const selectAllRef = useRef(null)

    const [toggleOrder , setToggleOrder] = useState(false)
    
    const orderItems = async() => {

        let itemsIds = selectedItems?.map(prod => ({product_id: prod.product_id, amount : prod.product_id, price : prod.price}))

        try{

            setToggleOrder(false)
            const order = await axios.post(`${BACKEND_URL}/api/order` , {itemsIds, address , totalPrice} , {headers : {Authorization : `Bearer ${cookies.token}`}})

            if(order.status === 200){
                // toggle success message
                window.location.reload()
            }

        }catch(err){

            //toggle error message
            console.log(err)
        }
    }

    const handleSelectAll = (e) => {

        const checked = e.target.checked

        if(checked && cart.length !== 0){

            let items = cart.map((cart, _) => (cart.price * cart.amount))
            let total = items.reduce((sum, item) => sum + item);
            let allItems = cart.map((cart,_) => (cart))
            
            setTotalPrice(total)
            setSelectedItems(allItems)

            checkboxRef?.current.filter(c => c !== null).map((c) => c.checked = true)
            
        }

        else {
            checkboxRef?.current.filter(c => c !== null).map((c) => c.checked = false)
            setSelectedItems([])
            return setTotalPrice(0)
        }

    }

    const handleCheckbox = (e, amount, price) => {

        const id = e.target.id
        const checked = e.target.checked;

        if (checked) {
            setSelectedItems((prev) => [...prev, {id , amount, price : price * amount}]);
        } else {
            setSelectedItems((prev) => prev.filter((item) => item.id !== id));
        }

    }

    useEffect(() => {

        if(selectedItems.length === cart.length){
            selectAllRef.current.checked = true
        }else {
            selectAllRef.current.checked = false
        }

        let total = selectedItems.reduce((sum, item) => sum + item.price, 0);
       
        setTotalPrice(total)
        
    },[selectedItems, selectAllRef])

    return(
        <div className="order-container bg-white position-relative" style={{right : '25vw', bottom : '25vw'}}>

            {toggleOrder ? <div><div className="order-submit-bg position-absolute start-0 top-0 w-100 h-100 bg-warning"  onClick={() => {setToggleOrder(false), setAddress('')}}></div> <SubmitOrder setToggleOrder={setToggleOrder} orderItems={orderItems} setAddress={setAddress} address={address}/> </div> : <></>}
            
            <div className="order-top">
                <div className="top-start">
                    <h3>Choose Products To Be Ordered</h3>
                </div>

                <div className="top-end d-flex">
                    <h4>Total Price : {totalPrice}</h4>

                    <label htmlFor="selectAll">Select All ({cart.length})</label>
                    <input type="checkbox" id="selectAll" name="selectAll" ref={selectAllRef} onChange={(e) => handleSelectAll(e)}/>
                </div>

            </div>
            
            {cart?.map((prod,prodId) => (
                <OrderCheckbox prod={prod} prodId={prodId} key={prodId} setCart={setCart} cart={cart} handleCheckbox={handleCheckbox} checkboxRef={checkboxRef}/>
            ))}

            <div className="order-bottom">
                <button className="btn btn-primary" onClick={() => setToggleOrder(true)} disabled={totalPrice < 40 ? true : false}>Order Items</button>
            </div>
        </div>
    )
}

export default Order