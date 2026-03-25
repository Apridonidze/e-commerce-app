import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const PaymentMessage = () => {

    const navigator = useNavigate();

    useEffect(() => {
        
        setTimeout(() => {
            
            navigator('/', {replace : true})
            window.location.reload();
        }, 3000)

    }, [])

    return(
        <div className="payment-message-container position-relative bg-white border">
            Payment Message
            
        </div>
    )
}

export default PaymentMessage