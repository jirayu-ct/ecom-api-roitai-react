import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { payment } from "../../api/stripe";
import useEcomStore from "../../store/ecom-store";
import CheckoutForm from "../../components/CheckoutForm";

const stripePromise = loadStripe("pk_test_51RJadxD7xQalmP2G8wOJzdvk9LurghcY3pVJkKNbmkKCndJqnv4PlWSOt5h4NtMRWoF8Ha8NpVkCDMT3IQOq3NXu00ApCKJYjz");

const Payment = () => {
    const token = useEcomStore((state) => state.token)

    const [clientSecret, setClientSecret] = useState("");

    useEffect(() => {
        handlePayment()
    }, [])

    const handlePayment = async () => {
        try {
            const res = await payment(token)
            setClientSecret(res.data.clientSecret)
        } catch (error) {
            console.log(error)
        }
    }

    const appearance = {
        theme: 'stripe',
    };
    // Enable the skeleton loader UI for optimal loading.
    const loader = 'auto';

    return (
        <div>
            {
                clientSecret && (
                    <Elements options={{clientSecret, appearance, loader}} stripe={stripePromise}>
                        <CheckoutForm />
                    </Elements>
                )
            }
        </div>
    )
}
export default Payment