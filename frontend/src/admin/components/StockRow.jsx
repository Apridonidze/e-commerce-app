import LowStockProduct from "../../components/product/LowStockProduct";
import EmptyLowStock from "../../empty/EmptyLowStock";


const StockRow = ({ lowStock, setToggleEdit, setToggleRemove , setOffset }) => {
    return(
        <div className="stock-row">

            {lowStock?.length !== 0 ? <div className="products">{lowStock?.map(prod => <LowStockProduct prod={prod} setToggleEdit={setToggleEdit} setToggleRemove={setToggleRemove }/>)}</div> 
            : <EmptyLowStock />}

            {lowStock?.length % 5 !== 0 || lowStock?.length === 0 ? <></> : 
                <button className="btn d-flex text-white fw-bold my-5 align-items-center py-2 justify-content-center mx-auto w-25 " style={{backgroundColor : "#10b981", height : '50px', textAlign: 'center'}} onClick={() => setOffset((prev) => {if(lowStock.length % 5 === 0){return prev + 5} return prev})}>Load More Items...</button>
            }
        </div>
    );
};

export default StockRow;