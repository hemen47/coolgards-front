import * as React from "react";
import { useContext, useEffect, useState } from "react";
import { AlertContext, CartContext, UserContext } from "../_app";
import styles from "./cart.module.scss";
import Link from "next/link";
import { ax } from "../../utils/axios";
import { useRouter } from "next/router";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { Select } from "@mui/material";
import AddButton from "../../components/AddButton";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import dropin from "braintree-web-drop-in";

export default function Cart() {
  const router = useRouter();
  const { setMessage, setError } = useContext(AlertContext);
  const { cart, setCart } = useContext(CartContext);
  const { user, setUser } = useContext(UserContext);
  const [shippingValue, setShippingValue] = useState(10);
  const [clientToken, setClientToken] = useState(null);
  const [braintreeInstance, setBraintreeInstance] = useState(undefined);

  const calculateTotalPrice = (crt, shp = 0) => {
    let total = 0;
    for (let item of crt) {
      total += item.price * item.quantity;
    }
    return total + shp;
  };

  useEffect(() => {
    if (cart.length !== 0) {
      ax.post("/api/cart", cart)
        .then((res) => {})
        .catch((e) => {
          setError(e.response?.data?.message || e.message);
        });
    }
  }, []);

  const onPaymentCompleted = (nonce) => {
    ax.post("/api/checkout", nonce)
        .then((res) => {})
        .catch((e) => {
          setError(e.response?.data?.message || e.message);
        });
  }

  const getToken = () => {
    ax.get("/api/client-token")
      .then((res) => {
        console.log("res", res);
        const initializeBraintree = () =>
          dropin.create(
            {
              authorization: res.data.clientToken,
              container: "#dropin-container",
            },
            function (error, instance) {
              if (error) console.error(error);
              else setBraintreeInstance(instance);
            }
          );

        if (braintreeInstance) {
          braintreeInstance.teardown().then(() => {
            initializeBraintree();
          });
        } else {
          initializeBraintree();
        }
        setClientToken(res.data.clientToken);
      })
      .catch((e) => {
        setError(e.response?.data?.message || e.message || e);
      });
  };

  const checkOut = () => {
    if (!localStorage.getItem("authenticated")) {
      setMessage("please Login first to continue");
      router.push("/login");
    }
    // if (!user.address) {
    //   setMessage('please add your address');
    //   router.push('/profile');
    // }
    getToken();
  };



  return (
    <div className={styles.container}>
      <div className={styles.cartContainer} style={{ display: `${!clientToken ? {} : "none"}` }}>
        <div className="bg-white">
          <div className="flex justify-between border-b mx-10">
            <h1 className="font-semibold text-2xl">Shopping Cart</h1>
            <h2 className="font-semibold text-2xl">{cart.length} Items</h2>
          </div>
          <div className={styles.titlesContainer}>
            <h3 className="font-semibold text-gray-600 text-xs uppercase w-[22rem] ml-10">
              Product Details
            </h3>
            <h3 className="font-semibold text-center text-gray-600 text-xs uppercase align-middle w-[5rem] text-center">
              Quantity
            </h3>
            <h3 className="font-semibold text-center text-gray-600 text-xs uppercase align-middle w-[5rem] text-center">
              Price
            </h3>
            <h3 className="font-semibold text-center text-gray-600 text-xs uppercase align-middle w-[5rem] text-center">
              Total
            </h3>
          </div>

          {/*start*/}
          {cart.map((item) => {
            return (
              <div
                key={item?._id}
                className="flex shadowCard flex-wrap items-center hover:bg-gray-100 p-6"
              >
                <Link
                  className="flex items-center w-[20rem]"
                  href={"/products/" + item.slug}
                >
                  <div>
                    <img
                      className="h-24"
                      src={item?.imageUrls[0]}
                      alt={item?.title}
                    />
                  </div>
                  <div className="flex flex-col justify-between ml-4 flex-grow">
                    <p className="font-bold m-3 text-sm">{item?.title}</p>
                  </div>
                </Link>
                <div className="flex items-center justify-center">
                  <AddButton data={item} />
                  <p className="text-center w-15 font-semibold text-sm">
                    € {item?.price}
                  </p>
                  <p className="text-center  w-15  font-semibold text-sm">
                    € {item?.price * item?.quantity}
                  </p>
                </div>
              </div>
            );
          })}

          {/*end*/}

          <Link href="/products">
            <Button
              variant="standard"
              sx={{ margin: "1rem", fontSize: "1rem" }}
            >
              <ReplyOutlinedIcon sx={{ marginRight: "1rem" }} />
              Continue Shopping
            </Button>
          </Link>
        </div>

        <div className="shadowCard w-[20rem] px-8 py-2">
          <h1 className="font-semibold text-2xl border-b pb-8">
            Order Summary
          </h1>
          <div className="flex justify-between mt-10 mb-5">
            <span className="font-semibold text-sm uppercase">
              Items {cart?.length}
            </span>
            <span className="font-semibold text-sm">
              € {calculateTotalPrice(cart)}
            </span>
          </div>
          <div className={styles.shippingContainer}>
            <label className="font-medium inline-block mb-3 text-sm uppercase">
              Shipping
            </label>
            <Select
              sx={{ margin: "1rem" }}
              label="Shipping"
              variant="standard"
              name="shipping"
              value={shippingValue}
              onChange={(e) => setShippingValue(e.target.value)}
            >
              <MenuItem value={10}>Standard shipping - €10.00</MenuItem>
              <MenuItem value={99}>Express shipping - €99.00</MenuItem>
            </Select>
          </div>

          <div className="border-t my-10">
            <div className="flex font-semibold justify-between py-6 text-sm uppercase">
              <span>Total cost</span>
              <span>€ {calculateTotalPrice(cart, shippingValue)}</span>
            </div>
            <Button variant="contained" fullWidth onClick={checkOut}>
              Checkout
            </Button>
          </div>
        </div>
      </div>

      <div
        style={{ display: `${clientToken ? "block" : "none"}` }}
        className={styles.gateWayContainer}
      >
        <div id="dropin-container" />
        <div className="flex justify-center">
          <Button
            className={"braintreePayButton"}
            type="primary"
            disabled={!braintreeInstance}
            onClick={() => {
              if (braintreeInstance) {
                braintreeInstance.requestPaymentMethod((error, payload) => {
                  if (error) {
                    console.error(error);
                  } else {
                    console.log('payload received', payload);
                    setMessage(
                      `Payment completed`
                    );
                    onPaymentCompleted({
                      ...payload,
                      amount : calculateTotalPrice(cart, shippingValue),
                    });
                  }
                });
              }
            }}
          >
            {"Pay"}
          </Button>
        </div>
      </div>
    </div>
  );
}
