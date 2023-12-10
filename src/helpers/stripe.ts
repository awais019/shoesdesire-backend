import Stripe from "stripe";
import logger from "../startup/logger";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
});

export default {
  createPrice: async (
    productName: string,
    orderId: string,
    charges: number
  ) => {
    const order = await stripe.products.create({
      name: productName,
      id: orderId,
      description: "Product Purchase",
      type: "good",
    });

    const price = await stripe.prices.create({
      unit_amount: Math.floor(charges * 100),
      currency: "pkr",
      product: order.id,
    });

    return price;
  },
  createPaymentLink: async (price: Stripe.Price, quantity: number) => {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price: price.id,
          quantity,
        },
      ],
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}/?orderId=${price.product}`,
      cancel_url: `${process.env.CLIENT_URL}/cancel`,
    });
    return session;
  },
};
