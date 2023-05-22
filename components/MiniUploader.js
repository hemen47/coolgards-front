import Image from "next/image";

export const MiniUploader = ({ onClick, selectedImageUrl }) => {
  return (
    <div
      onClick={onClick}
      className="p-10 m-5 bg-white drop-shadow-xl rounded-md w-96 relative h-56"
    >
      {selectedImageUrl ? (
        <Image src={selectedImageUrl} alt="main cover image" className="p-5 rounded-[2rem]" fill={true}/>
      ) : (
        <>
          <div className="p-10 border-dashed border-1 border-indigo-400 rounded-md ">
            <p>click to upload cover image</p>
          </div>
        </>
      )}
    </div>
  );
};
