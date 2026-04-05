import axios from "axios"
import { BACKEND_URL } from "../../../config"
import { useCookies } from "react-cookie"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"



const RemoveProduct = ({ setToggleRemove, toggleRemove, setToggleAlert }) => {

    const [ cookies ] = useCookies(['token'])

    const navigator = useNavigate()

    useEffect(() => {

        document.body.style.overflow = 'hidden'
        return () => document.body.style.overflow = ''

    },[]); //disabling body scrolling when component is triggered

    const handleDelete = async() => {
        try{

            const response = await axios.delete(`${BACKEND_URL}/api/product/${toggleRemove.productId}`, {headers : {Authorization : `Bearer ${cookies.token}`}})
            
            if(response.status === 200) setToggleAlert({status: true, type: "Success", statusCode: response.status, message: "Product Deleted Successfully."});
                
            setTimeout(() => {setToggleEdit({status : false, product: null})}, 3000)

        }catch(err){

            if(err.status === 400) return setToggleAlert({status: true, type: "Failed", statusCode: err.status, message: String(err.response?.data?.message || err.message || 'Unknown error')});
            return setToggleAlert({status: true, type: "Internal_Error", statusCode: err.status, message: String(err.response?.data?.message || err.message || 'Unknown error')});

        }
    }

    return(
        <div className="manage-product-container position-absolute bg-danger" style={{zIndex : 999}}>
            <h3>Delete Product</h3>
            <button className="btn btn-danger" onClick={() => handleDelete()}>Delete</button>
            <button className="btn btn-secondary" onClick={() => setToggleRemove({status : false, productId : null})}>Cancel</button>
        </div>
    )
}

export default RemoveProduct;