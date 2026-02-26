import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import { STRIPE_PUBLIC_KEY } from '../../config'

const stripePromise = loadStripe(STRIPE_PUBLIC_KEY)

export default function StripeProvider({ children }) {
    return <Elements stripe={stripePromise}>{children}</Elements>
}