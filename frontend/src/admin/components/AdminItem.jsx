const AdminItem = ({prod, prodId, key}) => {
    return(
        <div className="admin-item">

            <div className="item-start">
                {<img className="w-100 h-100 rounded-1" src={`data:image/svg+xml;base64,${JSON.parse(prod.images)[0]}`} style={{maxHeight:'80px' , maxWidth : '80px'}}/>}
            </div>

            <div className="item-main">
                <h5>{prod.title}</h5>
                <small>{prod.description.length < 40 ? `${prod.description.slice(0,40)}...` : prod.description}</small>
            </div>

        </div>
    )
}

// add admin visible data
export default AdminItem;