import React from 'react';
import { useForm } from "react-hook-form";

const SignIn = () => {
  return (
    <>
      <div className="bg-blue-900 text-light h-screen">
        <div className="text-black w-full h-full flex flex-col justify-center items-center bg-primary-dark">
          <div className="sm:row-span-2 sm:col-span-1 relative z-0">
            <div className="jsx-2100177439 site-circle absolute w-[50rem] h-[36rem] -top-[8%] -left-[50%] -z-10"></div>
            <div className="bg-slate-800 rounded-lg px-6 py-4 mx-auto sm:w-[25.625rem] sm:px-12 lg:mt-0 z-10 flex flex-col items-center">
              <span className="box-sizing:border-box;display:inline-block;overflow:hidden;width:initial;height:initial;background:none;opacity:1;border:0;margin:0;padding:0;position:relative;max-width:100%"></span>
              <p className="font-secondary font-normal text-xsm text-center text-gray-500 my-2">
                Log in to your account
              </p>
              <div className="flex items-center my-4 space-x-8 w-full">
                <hr className="grow w-full h-px bg-gray-500 border-none" />
                <div className="text-gray-500 text-center text-xsm">or</div>
                <hr className="grow w-full h-px bg-gray-500 border-none" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
