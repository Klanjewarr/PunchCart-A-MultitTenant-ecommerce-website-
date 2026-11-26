import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder_for_build', {
    apiVersion:"2025-08-27.basil",
    typescript: true,
})