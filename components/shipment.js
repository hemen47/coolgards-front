import Image from "next/image";
import Button from "@mui/material/Button";
import { useState } from "react";

export default function Shipment() {
  const [display, setDisplay] = useState(true);

  return (
    <>
      {display && (
        <div className="rounded-[2rem] z-50 bg-logo right-5 fixed bottom-5 p-4 text-white w-[22rem]">
          <p>
            We currently ship to{" "}
            <Image
              className="ml-1 mr-1"
              width={20}
              height={15}
              src="/denmark.png"
              alt="denmark flag"
            />
            <Image
              className="ml-1 mr-1"
              width={20}
              height={12}
              src="/germany.png"
              alt="germany flag"
            />
            <Image
              className="ml-1 mr-1"
              width={20}
              height={14}
              src="/iceland.png"
              alt="island flag"
            />
            <Image
              className="ml-1 mr-1"
              width={20}
              height={14}
              src="/malta.png"
              alt="malt flag"
            />
            <Image
              className="ml-1 mr-1"
              width={20}
              height={13}
              src="/sweden.png"
              alt="sweden flag"
            />
            <Image
              className="ml-1 mr-1"
              width={20}
              height={12}
              src="/uk.png"
              alt="united kingdom flag"
            />
            More countries coming soon.
          </p>
          <div className="flex justify-center">
            <Button variant="contained" onClick={() => setDisplay(false)}>
              Ok!
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
