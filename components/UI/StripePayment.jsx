import { loadStripe } from "@stripe/stripe-js";
import { Button, Input } from "@nextui-org/react";

const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

export default function BalanceButton(props) {
    const { creditBalance } =  props
    const handleCheckout = async () => {
        try {
            const stripe = await stripePromise;
            if (!stripe) {
                return;
            }

            const { session } = await (
                await fetch("/api/stripe-payment", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        quantity: 10,
                    }),
                })
            ).json();

            await stripe.redirectToCheckout({
                sessionId: session.id,
            });
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="flex justify-center items-center border-large rounded-xl">
            <p className="mx-2 text-sm" size="small">
                {creditBalance} tokens
            </p>
            <Button
                className="rounded-l-none"
                color="primary"
                size="sm"
                onClick={handleCheckout}
            >
                <span>Buy Tokens</span>
            </Button>
        </div>
    );
}