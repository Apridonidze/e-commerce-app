import { Link } from "react-router-dom";
import { useCookies } from "react-cookie"; //importing react libraries

import { useEffect, useRef, useState } from "react"; //importing react hooks

import OrderCheckbox from "./OrderCheckbox";
import PaymentMessage from "../../alerts/SuccessPaymentMessage"; //importing react componenets

import '../../styles/checkbox.css'; //importing css file
import ItemSkeleton from "../../skeletons/ItemSkeleton";

const Order = ({ cartIds ,setToggleOrder, handleDeleteFromCart, setToggleAddress, setSelectedItems , selectedItems , setTotalPrice , totalPrice, toggleOrder}) => {
    
    const checkboxRef = useRef([null]); //defining checkbox refs
    const selectAllRef = useRef(null); //defining select all buttons ref

    const [togglePayment, setTogglePayment] = useState(false) ; //deffinign state to toggle payment messages

    useEffect(() => {
        
        const total = cartIds.reduce((sum, item) => {

            const price = item.sales_price ?? item.price ?? 0; //defining items price (if it has sales price or regular one)
            const amount = item.amount ?? 1; //defining items amount

            return sum + Number(price) * Number(amount); //returning total price

        }, 0); //calculating total price of items 

        if(total < 40) return setToggleOrder(false)

    }, [cartIds]);

    const handleSelectAll = (e) => {

        const checked = e.target.checked; //checking select all checkboxs checked statys

        if(checked && cartIds.length !== 0){

            let items = cartIds.map((cartIds, _) => (cartIds.price * cartIds.amount)); //calculation each items price and amount

            const total = items.reduce((sum, item) => {
                const price = item.sales_price ?? item.price ?? 0; //defining items price (if it has sales price or regular one)
                const amount = item.amount ?? 1; //defining items amount

                return sum + Number(price) * Number(amount); //returning total price
            }, 0); //summing total price of selected items

            let allItems = cartIds.map((cartIds,_) => (cartIds)); //returning all items in array form
            
            setTotalPrice(total); 
            setSelectedItems(allItems); //setting order data in states

            checkboxRef?.current.filter(c => c !== null).map((c) => c.checked = true); //checking all items checkboxes 
            
        }else {
            checkboxRef?.current.filter(c => c !== null).map((c) => c.checked = false); //unchecking all items
            setSelectedItems([]); //settign empty array as in selectedItems states
            return setTotalPrice(0); //setting 0 as a totalprice
        };
    };

    const handleCheckbox = (e, amount, price) => {

        const id = e.target.id; //defining id of item
        const checked = e.target.checked; //defining checked state of item

        if (checked) { //if item is checked , it is inserted into selectedItems state
            setSelectedItems((prev) => [...prev, {id , amount, price}]);
        } else { //else item is removed from selectedItems state
            setSelectedItems((prev) => prev.filter((item) => item.id !== id));
        };
    };

    useEffect(() => {

        if(selectedItems.length === cartIds.length){//checking if selectedItems length is same as total items length
            selectAllRef.current.checked = true; //if so then select all checkbox is checked
        }else { //else its disabled
            selectAllRef.current.checked = false;
        };

        const total = selectedItems.reduce((sum, item) => {
            const price = item.sales_price ?? item.price ?? 0; //defining items price (if it has sales price or regular one)
            const amount = item.amount ?? 1; //defining items amount

            return sum + Number(price) * Number(amount); //returning total price
        }, 0); //calculating total price of items 

        setTotalPrice(total); //setting total price in state
        
    },[selectedItems, selectAllRef]) ; //logic executes on this dependencies cheange

    useEffect(() => { //handing page scrolling for bg and mian container aligmnet

        if (toggleOrder) { //checking if toggleOrder is true (if this component is mounted)
            document.documentElement.scrollTop = 0; //scrolling user at the very top of the page

            document.body.style.overflow = 'hidden';
            document.documentElement.style.overflow = 'hidden'; // hidding page overflow to prevent users from scrolling page when component is triggered
        } else {
            document.body.style.overflow = '';
            document.documentElement.style.overflow = ''; //disabling overflow styling if component is not triggered
        }

        return () => {document.body.style.overflow = ''; document.documentElement.style.overflow = ''}; //cleanup function to remove styling after component unmounts

    }, [toggleOrder]); //logic executes on toggleOrder dependency change

    return(
        <div className="order-container w-100" >

            {togglePayment ? <div><div className="payment-success-bg position-absolute start-0 top-0 w-100 h-100 bg-warning"  onClick={() => {setTogglePayment(false)}}></div> <PaymentMessage /> </div> : <></>}
            
            <div className="order-top d-flex flex-column mb-2" >

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
                {cartIds.map(prod => (
                    <OrderCheckbox prod={prod} cartIds={cartIds} handleCheckbox={handleCheckbox} checkboxRef={checkboxRef} handleDeleteFromCart={handleDeleteFromCart}/>
                )) || <ItemSkeleton />}
            </div>

            <div className="order-bottom align-items-end">
                <div className="order-bottom-start">
                    <Link to='/'><i class="fa-solid fa-arrow-left-long me-2"></i>Continue Browsing</Link>
                </div>
                <div className="order-bottom-end d-flex gap-2">
                    <button className="btn bg-none border-danger border-2 text-danger" onClick={(() => setToggleOrder(false))}>Cancle</button>
                    <button className="btn" onClick={() => setToggleAddress(true)} disabled={totalPrice < 40 ? true : false}>Order Items</button>
                </div>
            </div>
        </div>
    );
};

export default Order; //exporting component