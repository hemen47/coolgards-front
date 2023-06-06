import * as React from "react";
import { useContext } from "react";
import { AlertContext } from "../_app";
import styles from "./privacy.module.scss";
import Link from "next/link";

export default function PrivacyPolicy({ data, error }) {
  const { setError } = useContext(AlertContext);

  if (error) {
    setError(error);
  }

  return (
    <div className={styles.container}>
      <div className={styles.about}>
        <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-10">
          <div className="mt-5 max-w-xl text-center mx-auto">
            <h1 className="block text-gray-800 text-4xl md:text-5xl lg:text-6xl">
              <span className="text-logo">COOLGARDS</span> Privacy Policy
            </h1>
          </div>
          <div className="mt-8 max-w-3xl text-center mx-auto ql-align-right">
            <h2> SECTION 1 - WHAT DO WE DO WITH YOUR INFORMATION?</h2>
            <p className="text-lg text-gray-600">
              When you purchase something from our store, as part of the buying and selling process, we collect the personal information you give us such as your name, address, phone number and email address.
              When you browse our store, we also automatically receive your computer’s internet protocol (IP) address in order to provide us with information that helps us learn about your browser and operating system.
              With your permission, we may send you emails about our store, new products and other updates.
            </p>
          </div>

          <div className="mt-8 max-w-3xl text-center mx-auto ql-align-right">
            <h2> SECTION 2 - CONSENT</h2>
            <p className="text-lg text-gray-600">
              When you purchase something from our store, as part of the buying and selling process, we collect the personal information you give us such as your name, address, phone number and email address.
              When you browse our store, we also automatically receive your computer’s internet protocol (IP) address in order to provide us with information that helps us learn about your browser and operating system.
              With your permission, we may send you emails about our store, new products and other updates.
            </p>
          </div>


        </div>
      </div>
    </div>
  );
}
