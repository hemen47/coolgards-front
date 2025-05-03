import Image from "next/image";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";

export default function Shipment() {
  const [display, setDisplay] = useState(false);

  useEffect(() => {
    // Check if this is the first visit
    const hasVisitedBefore = localStorage.getItem("hasVisitedBefore");

    // If first visit, show the notification and set the flag
    if (!hasVisitedBefore) {
      setDisplay(true);
      localStorage.setItem("hasVisitedBefore", "true");
    }
  }, []);

  return (
      <>
        {display && (
            <div className="rounded-[2rem] z-50 bg-logo right-5 fixed bottom-5 p-4 text-white w-[22rem]">
              <p>
                We currently offer free shipping to Europe now!
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
