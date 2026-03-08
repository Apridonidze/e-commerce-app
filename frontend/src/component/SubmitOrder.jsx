const SubmitOrder = ({ setToggleOrder, orderItems }) => {
    return(
        <div className="submit-order-container position-relative">
            Are you sure?
            <button onClick={() => setToggleOrder(false)}>No</button>
            <button onClick={() => orderItems()}>yes</button>
        </div>
    )
}

export default SubmitOrder