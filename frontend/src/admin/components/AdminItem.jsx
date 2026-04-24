const AdminItem = ({item}) => {
    return(
        <div className="admin-item border" key={item.products_id}>

            <div className="item-start">
                {<img className="w-100 h-100 rounded-1" src={`data:image/svg+xml;base64,${JSON.parse(item.images)[0]}`} style={{maxHeight:'80px' , maxWidth : '80px'}}/>}
            </div>

            <div className="item-main">
                <h5>{item.title}</h5>
                <small>{item.description.length < 40 ? `${item.description.slice(0,40)}...` : item.description}</small>
            </div>

        </div>
    )
}

export default AdminItem;