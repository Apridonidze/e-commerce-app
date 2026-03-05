import { useContext } from "react"
import { UserContext } from "../context/UserContext"

const CardHolder = ({ setToggleCard, generateCustomerId }) => {

    const { cardDetails } = useContext(UserContext)

    return(
        <div className="card-holder-container">
            <div className="col"><h1>Card Details</h1></div>
            <div className="col">{<button onClick={() => {cardDetails?.customer_id ? setToggleCard(true) :  generateCustomerId()}}>{cardDetails?.last4 ? 'Edit Card' : 'Add Card'}</button>}</div>
        </div>
    )
}

export default CardHolder