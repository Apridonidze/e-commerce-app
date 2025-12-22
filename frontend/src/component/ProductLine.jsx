import { Link } from "react-router-dom"

const ProductLine = ({ prod, prodId, key }) => {
    return(
        <div className="product-line-container border my-2 d-flex justify-content-between" key={key}>
            <div className="product-start">
                <Link >{prod.title}</Link> <span>Ordered By : {prod.fullname}</span> <span>Status : {prod.status} Ordered In : {prod.date}</span>
            </div> {/** add link to product */}

            <div className="product-end">
                {prod.status == 'pending' || prod.status == 'on way' ? 
                <button>Change Status</button> : <></>}
            </div>
        </div>
    )
}

export default ProductLine