const Stats = ({ chartsData }) => {

    const displayData = [
        {id : 0 , icon : <i className="fa-solid fa-money-bills"></i> , title : "TOTAL REVENUE" , value : chartsData.totalRevenue ? `$${Number(chartsData.totalRevenue).toFixed(2)}` : '--'},
        {id : 1 , icon : <i className="fa-solid fa-bag-shopping"></i> , title : "TOTAL ORDERS" , value : chartsData.totalOrders  ? chartsData.totalOrders :  '--'},
        {id : 2 , icon : <i className="fa-solid fa-user-group"></i> , title : "ACTIVE USERS" , value : chartsData.totalUsers  ? chartsData.totalUsers : '--'},
    ]

    return(
        <div className="stats-container mx-2 mt-4">
            {displayData.map(data => 
                <div className="data-container d-flex flex-column p-3 rounded-3" key={data.id}>
                    {data.icon}
                    <h6>{data.title}</h6>
                    <span>{data.value}</span>
                </div>
            )}
        </div>
    )
}

export default Stats