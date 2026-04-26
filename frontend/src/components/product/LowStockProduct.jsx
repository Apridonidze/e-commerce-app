const LowStockProduct = ({ prod , setToggleEdit, setToggleRemove }) => {
    return(
        <div className={`low-stock-product ${prod.amount === 0 ? 'danger' : 'warning'}`} key={prod.products_id} >
            <div>
                {prod.amount === 0 ? 
                <div className="outOfStockText d-flex justify-content-between align-items-center">
                    <span >OUT OF STOCK</span>
                    <i class="fa-solid fa-box-archive"></i>
                </div>
            :   <div className="lowStockText d-flex justify-content-between align-items-center">
                    <span >LOW STOCK</span>
                    <i class="fa-solid fa-triangle-exclamation"></i>
                </div>}
            </div>
            <div className="d-flex flex-column">
                <h5>{prod.title}</h5>
                <span className="small fw-bold text-secondary">{prod.amount} Units remaining</span>
            </div>
            <div className="d-flex gap-1 justify-content-between">
                <button className="restockBtn btn d-flex align-items-center py-2 border-0 text-white " onClick={() => setToggleEdit({status : true , product : prod})}>Restock</button>
                <button className="removeBtn btn text-danger d-flex align-items-center py-2 border-0" onClick={() => setToggleRemove({status : true , product : prod})}><i class="fa-regular fa-trash-can"></i></button>
            </div>
        </div>
    );
};

export default LowStockProduct; //exporting component