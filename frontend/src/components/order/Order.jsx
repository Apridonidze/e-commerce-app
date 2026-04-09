import { useCookies } from "react-cookie"
import { BACKEND_URL } from "../../../config"
import axios from "axios"
import OrderCheckbox from "./OrderCheckbox"
import { useEffect, useRef, useState } from "react"
import SubmitOrder from "../order/SubmitOrder"
import PaymentMessage from "../../alerts/PaymentMessage"
import '../../styles/checkbox.css'

import { Link } from "react-router-dom"

const Order = ({ setCartIds, cartIds ,setToggleOrder, handleDeleteFromCart}) => {
    
    const [cookies] = useCookies(['token'])
    const [selectedItems, setSelectedItems] = useState([])
    const [totalPrice, setTotalPrice] = useState(0)
    const [address, setAddress] = useState('');

    const checkboxRef = useRef([null])
    const selectAllRef = useRef(null)

    const [toggleSubmitOrder , setToggleSubmitOrder] = useState(false)
    const [togglePayment, setTogglePayment] = useState(false)

    const orderItems = async() => {
        
        let itemsIds = selectedItems?.map(prod => ({product_id: prod.id, amount : prod.amount, price : prod.sales_price ?? prod.price ?? 0}))
        
        try{

            setToggleSubmitOrder(false)
            const order = await axios.post(`${BACKEND_URL}/api/order` , {itemsIds, address , totalPrice} , {headers : {Authorization : `Bearer ${cookies.token}`}})

            if(order.status === 200){
                setTogglePayment(true)
                
            }

        }catch(err){

            //toggle error message
            console.log(err)
        }
    }

    useEffect(() => {
        
        const total = cartIds.reduce((sum, item) => {

            const price = item.sales_price ?? item.price ?? 0; //defining items price (if it has sales price or regular one)
            const amount = item.amount ?? 1; //defining items amount

            return sum + Number(price) * Number(amount); //returning total price

        }, 0); //calculating total price of items 

        if(total < 40) return setToggleOrder(false)

    }, [cartIds])

    const handleSelectAll = (e) => {

        const checked = e.target.checked

        if(checked && cartIds.length !== 0){

            let items = cartIds.map((cartIds, _) => (cartIds.price * cartIds.amount))
            const total = items.reduce((sum, item) => {

            const price = item.sales_price ?? item.price ?? 0; //defining items price (if it has sales price or regular one)
            const amount = item.amount ?? 1; //defining items amount

            return sum + Number(price) * Number(amount); //returning total price

    }, 0); //calculating total price of items 
            let allItems = cartIds.map((cartIds,_) => (cartIds))
            
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
            
            setSelectedItems((prev) => [...prev, {id , amount, price}]);
        } else {
            setSelectedItems((prev) => prev.filter((item) => item.id !== id));
        }

    }

    useEffect(() => {

        if(selectedItems.length === cartIds.length){
            selectAllRef.current.checked = true
        }else {
            selectAllRef.current.checked = false
        }

        const total = selectedItems.reduce((sum, item) => {

        const price = item.sales_price ?? item.price ?? 0; //defining items price (if it has sales price or regular one)
        const amount = item.amount ?? 1; //defining items amount

        return sum + Number(price) * Number(amount); //returning total price

    }, 0); //calculating total price of items 

        setTotalPrice(total)
        
    },[selectedItems, selectAllRef])

    return(
        <div className="order-container w-100" >

            {toggleSubmitOrder ? <div><div className="order-submit-bg position-absolute start-0 top-0 w-100 h-100 bg-warning"  onClick={() => {setToggleSubmitOrder(false), setAddress('')}}></div> <SubmitOrder setToggleSubmitOrder={setToggleSubmitOrder} orderItems={orderItems} setAddress={setAddress} address={address}/> </div> : <></>}
            {togglePayment ? <div><div className="payment-success-bg position-absolute start-0 top-0 w-100 h-100 bg-warning"  onClick={() => {setTogglePayment(false)}}></div> <PaymentMessage /> </div> : <></>}
            
            <div className="order-top d-flex flex-column mb-2">
                <div className="order-top-start d-flex align-items-start justify-content-between">
                    <div className="order-top-left">
                        <h4>Choose Products To Be Ordered</h4>
                        <span>Review your cart items before finalizing the order.</span>
                    </div>
                    <div className="order-top-right">
                        <button className="btn btn-none border-0"><i class="fa-solid fa-xmark"></i></button>
                    </div>
                </div>
                

                <div className="order-top-end d-flex my-2 px-2 py-3 rounded-2 gap-3 align-items-center justify-content-start">
                    
                    <div className="d-flex align-items-center my-auto gap-2">
                        <label className="checkbox-wrapper">
                            <input type="checkbox" id="selectAll" name="selectAll" ref={selectAllRef} onChange={(e) => handleSelectAll(e)}/>

                            <span className="custom-box"><span className="checkmark"><i class="fa-solid fa-check text-white"></i></span></span>
                            <span className="checkbox-label ps-2 my-auto">Select All ({cartIds.length})</span>
                        </label>
                    </div>

                    <div className="d-flex">
                        <h5 className="my-auto d-flex align-items-center fs-6 gap-1">Total Price : <span className="fs-5" style={{color : '#10b981'}}>${totalPrice.toFixed(2)}</span></h5>
                    </div>

                </div>

            </div>
            
            <div className="order-body">
                {cartIds?.map(prod => (
                <   OrderCheckbox prod={prod} cartIds={cartIds} handleCheckbox={handleCheckbox} checkboxRef={checkboxRef} handleDeleteFromCart={handleDeleteFromCart}/>
                ))}
            </div>

            <div className="order-bottom align-items-end">
                <div className="order-bottom-start">
                    <Link to='/'><i class="fa-solid fa-arrow-left-long me-2"></i>Continue Browsing</Link>
                </div>
                <div className="order-bottom-end d-flex gap-2">
                    <button className="btn bg-none border-danger border-2 text-danger" onClick={(() => setToggleOrder(false))}>Cancle</button>
                    <button className="btn" onClick={() => setToggleSubmitOrder(true)} disabled={totalPrice < 40 ? true : false}>Order Items</button>
                </div>
            </div>
        </div>
    )
}

export default Order