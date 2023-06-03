import Image from "next/image";
import logo from "../public/logo.png";
import Link from "next/link";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import PinterestIcon from "@mui/icons-material/Pinterest";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import Button from "@mui/material/Button";
import * as React from "react";
import { useContext } from "react";
import {AlertContext, CartContext} from "../pages/_app";

export default function AddButton({ data }) {
  const { cart, setCart } = useContext(CartContext);
  const { setMessage } = useContext(AlertContext);

  const addToCart = () => {
    if (typeof window !== "undefined") {
      if (cart?.length === 0) {
        setCart([{ ...data, quantity: 1 }]);
        localStorage.setItem("cart", JSON.stringify([{ ...data, quantity: 1 }]));
        setMessage("Product was added to the cart successfully")

      } else {
        let repeated = false;
        const newData = cart.map((item) => {
          if (item._id === data._id) {
            item.quantity = item.quantity + 1;
            repeated = true;
          }
          return (item);
        });
        if (repeated) {
          setCart(() => newData)
          localStorage.setItem("cart", JSON.stringify(newData));
          setMessage("Product quantity increased")

          repeated = false;
        } else {
          if (!data.quantity) {
            data.quantity = 1;
          }
          setCart((prev) => [...prev, data]);
          localStorage.setItem("cart", JSON.stringify([...cart, data]));

          setMessage("Product was added to the cart successfully")
        }
      }
    }
  };
  return (
    <Button
      onClick={addToCart}
      variant="contained"
      sx={{ margin: ".5rem", height: "50px" }}
    >
      Add to Cart
    </Button>
  );
}
