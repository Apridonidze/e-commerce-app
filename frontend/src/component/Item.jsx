const Item = ({ prod, prodId , key , cartIds , savedIds }) => {

    

    return(
        <div className="item-container d-flex">
            <div className="item-start">
                {<img className="w-100 h-100 rounded-1" src={`data:image/svg+xml;base64,${JSON.parse(prod.images)[0]}`} style={{maxHeight:'80px' , maxWidth : '80px'}}/>}
            </div>
            <div className="item-main">
                <h5>{prod.title}</h5>
                <small>{prod.description.length < 40 ? `${prod.description.slice(0,40)}...` : prod.description}</small>
            </div>
            <div className="item-end">
                <i class="fa-regular fa-heart"></i>
                <i class="fa-solid fa-heart"></i>
                <i class="fa-solid fa-cart-shopping"></i>
            </div>
        </div>
    )
}


export default Item