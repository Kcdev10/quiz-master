import React from "react";

export default function Loader() {
  return (
    <div className="w-full h-full fixed top-0 left-0 flex justify-center items-center bg-black/10">
      <div className="max-w-xl w-full min-h-72 bg-gray-200/90 flex justify-center items-center">
        <div className="w-10 h-10 border-t-4 border-black rounded-full animate-spin" />
      </div>
    </div>
  );
}
