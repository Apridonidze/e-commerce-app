import Product from "./Product"

const Pendings = ({ pendings }) => {
    return(
        <div className="pendings-container">
            <h1>Pending Products</h1>
            {pendings?.map((prod, prodId) => (
                <Product prod={prod} prodId={prodId} key={prodId}/>
            ))}
        </div>
    )
}

export default Pendings