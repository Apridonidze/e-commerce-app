import axios from 'axios'
import { BACKEND_URL } from '../../config'
import { useCookies } from 'react-cookie'

const Item = ({ prod, prodId, key, setCart, cart }) => {

    const [cookies] = useCookies(['token'])


    const handleDeleteFromCart = async(e) => {
        try{

            await axios.delete(`${BACKEND_URL}/api/cart/${e}` , {headers : {Authorization : `Bearer ${cookies.token}`}}).then(resp => {console.log(resp); setCart()})
            setCart(cart.filter(c => c.product_id !== prod.product_id))
            
        }catch(err){

            return
        }
    }

    return(
        <div className="item-container d-flex">
            <div className="item-start">
                {/* {<img className="w-100 h-100 rounded-1" src={`data:image/svg+xml;base64,${JSON.parse(prod?.images)[0]}`} style={{maxHeight:'80px' , maxWidth : '80px'}}/>} */}
            </div>
            <div className="item-main">
                <h5>{prod?.title}</h5>
                <small>{prod.description?.length < 40 ? `${prod?.description.slice(0,40)}...` : prod?.description}</small>
            </div>
            <div className="item-end">
                <img src='' alt="cart-icon" onClick={() => {handleDeleteFromCart(prod?.products_id)}}/> {/* add image */}
            </div>
        </div>
    )
}


export default Item