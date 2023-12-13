import React from "react";

const about = () => {
  return (
    <div>
      <div className="flex justify-center items-center h-screen  space-y-5">
        {/* <div className='flex'> */}
        <div className="flex flex-col w-1/3 justify-start space-y-5">
          <p className="flex justify-centers font-bold text-[25px]">Forgot Password?</p>
          <p className="font-sans">
            Enter the email address you used when you joined and we’ll send you
            instructions to reset your password.
          </p>
          <div className="relative mb-4">
        <label className="leading-7 text-sm  font-bold text-black">Email Address</label>
        <input type="email" id="email" name="email" className="w-full bg-white rounded border border-gray-300 focus:border-green-500 focus:ring-1 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
      </div>
      <button className="text-white bg-green-500 border-0 py-2 px-6 focus:outline-none hover:bg-green-400 rounded-md text-lg">Send Instructions</button>
        </div>
        </div>
      </div>
    // </div>
  );
};

export default about;
