import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    // stripe@22.x requires this exact version string (the only accepted value).
    apiVersion: "2026-04-22.dahlia",
});