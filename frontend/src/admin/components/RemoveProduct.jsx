import axios from "axios"
import { BACKEND_URL } from "../../../config"
import { useCookies } from "react-cookie"

const RemoveProduct = ({ setToggleRemove, toggleRemove }) => {

    const [ cookies ] = useCookies(['token'])

    const handleDelete = async() => {
        try{

            const response = await axios.delete(`${BACKEND_URL}/api/product/${toggleRemove.productId}`, {headers : {Authorization : `Bearer ${cookies.token}`}})
            console.log(response)
            if(response.status === 400){
                // toggle error message
            }
            // toggle success message
            window.location.reload();
        }catch(err){
            console.log(err)
        }
    }

    return(
        <div className="remove-product-container position-absolute bg-danger" style={{zIndex : 999}}>
            <h3>Delete Product</h3>
            <button className="btn btn-danger" onClick={() => handleDelete()}>Delete</button>
            <button className="btn btn-secondary" onClick={() => setToggleRemove({status : false, productId : null})}>Cancel</button>
        </div>
    )
}

export default RemoveProduct;