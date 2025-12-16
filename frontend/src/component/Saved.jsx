import Product from "./Product"

import axios from "axios"
import { useEffect,useState } from "react"

import { BACKEND_URL } from "../../config"
import { useCookies } from "react-cookie"

const Saved = ( { handleSave , handleAddToCart , isSaved , setIsSaved} ) => {

    const [cookies] = useCookies(['token'])

    const [saved , setSaved] = useState([])

    useEffect(() => {
        const fetchSavedItems = async() => {
            try{
                await axios.get(`${BACKEND_URL}/products/saved-products` , {headers : {Authorization : `Bearer ${cookies.token}`}}).then(resp => {console.log(resp) , setSaved(resp.data.products)})

            }catch(err){
                console.log(err)
            }
        }

        return () => {fetchSavedItems()};
    },[])

    return(
        <>
            <div className="saved-header position-relative d-flex justify-content-between" style={{bottom: '15px'}}>
                    
                <span className='bg-white' >{'Saved Products'|| <Skeleton />}</span> 
            </div>
            <div className="products">
                {saved.length < 1 ? <h1>No Saved Items Found.</h1> :saved?.map((prod , prodId) => (
                    <Product prod={prod} prodId={prodId} key={prodId} handleSave={handleSave} handleAddToCart={handleAddToCart}/>
                ))}
            </div>
        </>
    )
}


export default Saved