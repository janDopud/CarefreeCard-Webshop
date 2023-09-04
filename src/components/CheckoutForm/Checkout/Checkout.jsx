import React, { useState, useEffect } from "react";
import {
  Paper,
  Stepper,
  Step,
  StepLabel,
  Typography,
  CircularProgress,
  Divider,
  Button,
  CssBaseline,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import AddressForm from "../AddressForm";
import PaymentForm from "../PaymentForm";
import { commerce } from "../../../lib/commerce";

import "./Checkout.css";

const steps = ["Shipping adress", "Payment details"];

const Checkout = ({ cart, order, onCaptureCheckout, error }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [checkoutToken, setCheckoutToken] = useState(null);
  const [shippingData, setShippingData] = useState({});
  const [isFinished, setIsFinished] = useState(false);

  const history = useNavigate();

  useEffect(() => {
    if (cart.id) {
      const generateToken = async () => {
        try {
          const token = await commerce.checkout.generateToken(cart.id, {
            type: "cart",
          });
          console.log("GenerateToken", token);
          setCheckoutToken(token);
        } catch (error) {
          history("/", { replace: true });
        }
      };

      generateToken();
    }
  }, [cart]);

  const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);

  const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

  const next = (data) => {
    setShippingData(data);
    nextStep();
  };

  const timeout = () => {
    setTimeout(() => {
      setIsFinished(true);
    }, 3000);
  };

  let Confirmation = () =>
    order.customer ? (
      <>
        <div>
          <Typography variant="h5">
            Thank you for your purchase, {order.customer.firstname}{" "}
            {order.customer.lastname}
          </Typography>
          <Divider className="divider"></Divider>
          <Typography variant="subtitle2">
            Order ref: {order.customer_reference}
          </Typography>
        </div>
        <br />
        <Button href="/" variant="outlined" type="button">
          Back To Home
        </Button>
      </>
    ) : (
      // ) : isFinished ? (
      //   <>
      //     <div>
      //       <Typography variant="h5">Thank you for your purchase</Typography>
      //       <Divider className="divider"></Divider>
      //     </div>
      //     <br />
      //     <Button href="/" variant="outlined" type="button">
      //       Back To Home
      //     </Button>
      //   </>
      <div className="spinner">
        <CircularProgress />
      </div>
    );

  if (error) {
    <>
      <Typography variant="h5">Error: {error}</Typography>
      <br />
      <Button href="/" variant="outlined" type="button">
        Back To Home
      </Button>
    </>;
  }

  const Form = () =>
    activeStep === 0 ? (
      <AddressForm checkoutToken={checkoutToken} next={next} />
    ) : (
      <PaymentForm
        shippingData={shippingData}
        checkoutToken={checkoutToken}
        backStep={backStep}
        onCaptureCheckout={onCaptureCheckout}
        nextStep={nextStep}
        timeout={timeout}
      />
    );

  console.log("ShippingData", shippingData);

  if (checkoutToken === null) {
    console.log("Null");
  } else {
    console.log("CheckoutToken", checkoutToken);
  }

  return (
    <>
      <CssBaseline />
      <div className="toolbar" />
      <main className="layout">
        <Paper className="paper">
          <Typography variant="h3" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} className="stepper">
            {steps.map((step) => (
              <Step key={step}>
                <StepLabel>{step}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
            <Confirmation />
          ) : (
            checkoutToken && <Form />
          )}
        </Paper>
      </main>
    </>
  );
};

export default Checkout;
