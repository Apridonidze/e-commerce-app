import axios from "axios"
import { BACKEND_URL } from "../../../config"
import { useCookies } from "react-cookie"
import { useNavigate } from "react-router-dom"
import { use, useEffect } from "react"


const RemoveProduct = ({ setToggleRemove, toggleRemove, setToggleAlert }) => {

    const [ cookies ] = useCookies(['token'])

    const navigator = useNavigate()

    useEffect(() => {

        document.body.style.overflow = 'hidden'
        return () => document.body.style.overflow = ''

    },[]); //disabling body scrolling when component is triggered
    const handleDelete = async() => {
        try{

            const response = await axios.delete(`${BACKEND_URL}/api/product/${toggleRemove.product.products_id}`, {headers : {Authorization : `Bearer ${cookies.token}`}})
            
            if(response.status === 200) setToggleAlert({status: true, type: "Success", statusCode: response.status, message: "Product Deleted Successfully."});
                
            setTimeout(() => {setToggleRemove({status : false, product: null})}, 3000)

        }catch(err){

            if(err.status === 400) return setToggleAlert({status: true, type: "Failed", statusCode: err.status, message: String(err.response?.data?.message || err.message || 'Unknown error')});
            return setToggleAlert({status: true, type: "Internal_Error", statusCode: err.status, message: String(err.response?.data?.message || err.message || 'Unknown error')});

        }
    }

    useEffect(() => {
        document.body.style.overflow = 'hidden'

    },[])

    return(
        <div className="delete-product-container position-absolute bg-danger h-auto border-top border-5 border-danger" style={{zIndex : 999}}>
            
            <div className="delete-close w-100 text-end">
                <button className="btn btn-none border-0" onClick={() => setToggleRemove({status : false , product : null})}><i class="fa-solid fa-xmark"></i></button>
            </div>

            <div className="delete-top">
                <i class="fa-solid fa-trash text-danger"></i>
                <h3 className="fw-bolder">Delete Product</h3>
                <h6>Are you sure you want to delete this product?</h6>
                <small>This action cannot be undone.</small>
            </div>

            <div className="target-product my-3">
                <div className="target-start p-2">
                    <img src={`data:image/svg+xml;base64,${JSON.parse(toggleRemove.product.images)[0]}`}/>
                </div>

                <div className="target-end">
                    <small className="fw-bolder">Selected Item</small>
                    <h6>{toggleRemove.product.title}</h6>
                </div>

            </div>

            <div className="row d-flex flex-column px-4 w-100">
                <button className="btn btn-danger bg-danger mx-auto my-1 fw-medium" style={{height : '40px'}} onClick={() => handleDelete()}>Delete</button>
                <button className="btn mx-auto my-1 fw-medium" style={{height : '40px'}} onClick={() => setToggleRemove({status : false, productId : null})}>Cancel</button>
            </div>
        </div>
    )
}

export default RemoveProduct;