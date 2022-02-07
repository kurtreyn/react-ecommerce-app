import React from 'react';
import { Typography, Button, Divider } from '@material-ui/core';
import {
  Elements,
  CardElement,
  ElementsConsumer,
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Review from './Review';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const PaymentForm = ({
  checkoutToken,
  nextStep,
  backStep,
  shippingData,
  onCaptureCheckout,
  // timeout,
}) => {
  const handleSubmit = async (event, elements, stripe) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      console.log('[error]', error);
    } else {
      const orderData = {
        payment: {
          gateway: 'stripe',
          stripe: {
            payment_method_id: paymentMethod.id,
          },
        },
        shipping: {
          name: 'domestic',
          street: shippingData.address,
          town_city: shippingData.city,
          county_state: shippingData.shippingSubdivision,
          postal_zip_code: shippingData.zip,
          country: shippingData.shippingCountry,
        },
        customer: {
          firstname: shippingData.firstName,
          lastname: shippingData.lastName,
          email: shippingData.email,
        },
        line_items: checkoutToken.live.line_items,
        fulfillment: { shipping_method: shippingData.shippingOption },
      };
      console.log({ orderData });
      console.log(`checkoutToken ID: ${checkoutToken.id}`);
      onCaptureCheckout(checkoutToken.id, orderData);
      // timeout();
      nextStep();
    }
  };

  return (
    <>
      <Review checkoutToken={checkoutToken} />
      <Divider />
      <Typography variant="p" style={{ margin: '12px 0' }}>
        Use card # 4242 4242 4242 4242, Exp: 04/24, CVC: 424, Zip: 42424
      </Typography>
      <Typography variant="h6" gutterBottom style={{ margin: '20px 0' }}>
        Payment method
      </Typography>

      <Divider />
      <Elements stripe={stripePromise}>
        <ElementsConsumer>
          {({ elements, stripe }) => (
            <form onSubmit={(e) => handleSubmit(e, elements, stripe)}>
              <CardElement />
              <br /> <br />
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button variant="outlined" onClick={backStep}>
                  Back
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={!stripe}
                  color="primary"
                >
                  Pay {checkoutToken.live.subtotal.formatted_with_symbol}
                </Button>
              </div>
            </form>
          )}
        </ElementsConsumer>
      </Elements>
    </>
  );
};

export default PaymentForm;
