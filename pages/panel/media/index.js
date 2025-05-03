import React from 'react';
import Uploader from '../../../components/Uploader';
import { FiImage } from 'react-icons/fi';

export default function Index() {
  return (
    <div className="ml-20 mr-4 p-2 h-screen lg:ml-64 lg:mr-8">
      <div className="flex items-center mb-10 mt-4">
        <div className="h-12 w-0.5 bg-blue-500 mr-4"></div>
        <FiImage className="text-blue-500 mr-3" size={28} />
        <h1 className="text-2xl font-light text-gray-800 tracking-wide">
          Media Management
          <span className="block h-[2px] w-12 bg-blue-500 mt-1"></span>
        </h1>
      </div>
      <Uploader mediaMode />
    </div>
  );
}
