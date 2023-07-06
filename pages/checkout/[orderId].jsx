import * as React from "react";
import styles from "./checkout.module.scss";
import {useContext, useEffect, useState} from "react";
import { AlertContext } from "../_app";
import {
  PayPalScriptProvider,
  PayPalButtons,
  FUNDING,
} from "@paypal/react-paypal-js";

export default function Checkout({ localOrderId, error }) {
  const { setError } = useContext(AlertContext);
  const [transactionComplete, setTransactionComplete] = useState(null)
  console.log('localOrderId', localOrderId)

  if (error) {
    setError(error);
  }

  const FUNDING_SOURCES = [
    FUNDING.PAYPAL,
    FUNDING.PAYLATER,
    FUNDING.VENMO,
    FUNDING.CARD,
  ];

  const initialOptions = {
    "client-id": process.env.NEXT_PUBLIC_CLIENT_ID,
    "enable-funding": "paylater,venmo",
    "currency": "EUR",
  };

  return (
    <div className={styles.container}>
      <div className={styles.checkoutContainer} id="paypal-button-container">
        {transactionComplete? <p className="font-bold text-green text-center">
          Transaction was successful! Thank you
        </p>: <>

          <p className="font-bold text-gray-400 text-center">
            Please choose your payment method
          </p>
          <PayPalScriptProvider options={initialOptions}>
            {FUNDING_SOURCES.map((fundingSource) => {
              return (
                  <PayPalButtons
                      fundingSource={fundingSource}
                      key={fundingSource}
                      style={{
                        layout: "vertical",
                        shape: "rect",
                      }}
                      createOrder={async (data, actions) => {
                        try {
                          const response = await fetch("/api/create-order", {
                            headers: {
                              "Content-Type": "application/json",
                              // 'Content-Type': 'application/x-www-form-urlencoded',
                            },
                            method: "POST",
                            body: JSON.stringify({localOrderId: localOrderId})
                          });

                          const details = await response.json();
                          return details.id;
                        } catch (error) {
                          console.error(error);
                          // Handle the error or display an appropriate error message to the user
                        }
                      }}
                      onApprove={async (data, actions) => {
                        try {
                          const response = await fetch(
                              `/api/capture-order/${data.orderID}`,
                              {
                                method: "POST",
                              }
                          );

                          const details = await response.json();
                          // Three cases to handle:
                          //   (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
                          //   (2) Other non-recoverable errors -> Show a failure message
                          //   (3) Successful transaction -> Show confirmation or thank you message

                          // This example reads a v2/checkout/orders capture response, propagated from the server
                          // You could use a different API or structure for your 'orderData'
                          const errorDetail =
                              Array.isArray(details.details) && details.details[0];

                          if (
                              errorDetail &&
                              errorDetail.issue === "INSTRUMENT_DECLINED"
                          ) {
                            return actions.restart();
                            // https://developer.paypal.com/docs/checkout/integration-features/funding-failure/
                          }

                          if (errorDetail) {
                            let msg =
                                "Sorry, your transaction could not be processed.";
                            msg += errorDetail.description
                                ? " " + errorDetail.description
                                : "";
                            msg += details.debug_id
                                ? " (" + details.debug_id + ")"
                                : "";
                            setError(msg)
                          }

                          // Successful capture! For demo purposes:

                          const transaction =
                              details.purchase_units[0].payments.captures[0];

                          setTransactionComplete(transaction.id)
                          sessionStorage.removeItem("cart");

                        } catch (error) {
                          console.error(error);
                          // Handle the error or display an appropriate error message to the user
                        }
                      }}
                  />
              );
            })}
          </PayPalScriptProvider>
        </>}

      </div>
    </div>
  );
}
export async function getServerSideProps(context) {
  try {
    return { props: { localOrderId: context.params.orderId } };
  } catch (err) {
    return { props: { error: err.response?.data?.message || err.message } };
  }
}
