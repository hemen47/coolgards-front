import React from "react";
import Uploader from "../../../components/Uploader";

export default function Index() {

  return (
      <div className="ml-20 mr-4 p-2 h-screen lg:ml-64 lg:mr-8">
          <div className="flex justify-center">
              <h1 className="font-thin	text-gray-400	">Media Files</h1>
        </div>
      <Uploader mediaMode/>
    </div>
  );
}
