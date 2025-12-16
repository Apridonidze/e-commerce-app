const DashboardCart = ({ cart }) => {
    return(
        <div className="dashboard-cart">
            <div className="dasboard-start">
                <h3>Cart</h3>
            </div>
            <div className="dasboard-center">
                {cart.length < 1 ? <h1>No Items In Cart Yet.</h1> : cart?.map((item,itemId) => (
                    <span key={itemId}>{item}</span>
                ))}
            </div>
            <div className="dasboard-end">

            </div>
        </div>
    )
}

export default DashboardCart