import { useContext } from "react"
import { UserContext } from "../context/UserContext"

const CardHolder = ({ setToggleCard, generateCustomerId }) => {

    const { cardDetails } = useContext(UserContext)

    return(
        <div className="card-holder-container">
            <div className="col">
                <h1>Card Details</h1>
                <button onClick={() => {cardDetails?.customer_id ? setToggleCard(true) :  generateCustomerId()}}>{cardDetails?.last4 ? 'Edit Card' : 'Add Card'}</button>
            </div>
            
            <div className="col">
                {cardDetails ? 
                    <div className="card-details">
                        <h4>**** **** **** {cardDetails.last4}</h4>
                        <h4>{cardDetails.brand}</h4>
                    </div> : <></>}
            </div>
        </div>
    )
}

export default CardHolder