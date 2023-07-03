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

export default function Cart({ shipments }) {
  const router = useRouter();
  const { user, setUser } = useContext(UserContext);

  const { setMessage, setError } = useContext(AlertContext);
  const { cart } = useContext(CartContext);
  const [refreshedCart, setRefreshedCart] = useState([]);
  const [shipmentPlan, setShipmentPlan] = useState(shipments[0]._id);
  const [orderInfo, setOrderInfo] = useState({
    totalItems: "",
    totalItemsPrice: "",
    totalPrice: ""
  });
  const [clientToken, setClientToken] = useState(null);
  const [braintreeInstance, setBraintreeInstance] = useState(undefined);


  const refreshCart = () => {
    const model = {
      cart,
      shipmentPlan
    }
    ax.post("/api/cart", model)
      .then((res) => {
        setRefreshedCart(res.data.cart);
        setOrderInfo(res.data.orderInfo);
      })
      .catch((e) => {
        setError(e.response?.data?.message || e.message);
      });
  };

  // initial cart refresh
  useEffect(() => {
    if (cart.length !== 0) {
      refreshCart();
    }
  }, []);

  // refresh cart on cart or shipment plan change
  useEffect(() => {
      refreshCart()
  }, [cart, shipmentPlan]);



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

  const placeOrder = () => {
    if (user) {
      console.log('user', user)
      setMessage("please Login first to continue");
    }
    // if (!user.address) {
    //   setMessage('please add your address');
    //   router.push('/profile');
    // }
  };

  return (
    <div className={styles.container}>
      <div
        className={styles.cartContainer}
        style={{ display: `${!clientToken ? {} : "none"}` }}
      >
        <div className="bg-white">
          <div className="flex justify-between border-b mx-10">
            <h1 className="font-semibold text-2xl">Shopping Cart</h1>
            <h2 className="font-semibold text-2xl">{orderInfo.totalItems} Items</h2>
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
          {refreshedCart.map((item) => {
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
                    € {item.price * item.quantity}
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
              Total Items <b className="ml-2">( {orderInfo?.totalItems})</b>
            </span>
            <span className="font-semibold text-sm">
              € {orderInfo.totalItemsPrice}
            </span>
          </div>
          <div className={styles.shippingContainer}>
            <label className="font-medium inline-block text-sm uppercase">
              Location
            </label>
            <Select
              label="Shipping"
              variant="standard"
              name="shipping"
              value={shipmentPlan}
              onChange={(e) => setShipmentPlan(e.target.value)}
            >
              {shipments?.map((shipment) => {
                return (
                  <MenuItem key={shipment._id} value={shipment._id}>
                    {shipment.country} - € {shipment.shipmentPrice}
                  </MenuItem>
                );
              })}
            </Select>
          </div>
          <div className="flex font-semibold justify-between mb-4  text-sm uppercase">
              <span>Shipping <b>(€ {
                shipments.filter (shipment => shipment._id === shipmentPlan)[0].shipmentPrice
              })</b> </span>
            <span>+ € {orderInfo.totalShipmentPrice}</span>
          </div>
          <div className="flex font-semibold justify-between mb-4 text-sm uppercase">
              <span>Vat <b>(% {
                shipments.filter (shipment => shipment._id === shipmentPlan)[0].vat
              })</b> </span>
            <span>+ € {orderInfo.totalVatPrice}</span>
          </div>
          <div className="flex font-semibold justify-between mb-4  text-sm uppercase">
            <span>Total cost</span>
            <span>€ {orderInfo.totalPrice}</span>
          </div>
          <Button sx={{margin: '1.5rem 0rem'}} variant="contained" fullWidth onClick={placeOrder}>
            Place Order & Checkout
          </Button>
        </div>
      </div>


    </div>
  );
}

export async function getServerSideProps() {
  try {
    const res = await fetch(`${process.env.BASE_URL}/shipments`);
    const jsonRes = await res.json();
    return { props: { shipments: jsonRes.data } };
  } catch (err) {
    return { props: { error: err.response?.data?.message || err.message } };
  }
}
