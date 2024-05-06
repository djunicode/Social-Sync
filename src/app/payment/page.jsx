"use-client";
import React from "react";
import dynamic from "next/dynamic";

const payment = () => {
  return (
    <div className="m-10">
      <h4 className="">Payment page</h4>
      <button className="bg-gray">
        <a
          href="https://buy.stripe.com/test_7sIcQs6cFb1f33acMM"
          // className="bg-white text-black"
        >
          Chat Pay: 100Rs
        </a>
      </button>
      {/* <MakePaymentComponent /> */}
      <div>
        <h4>Payment page</h4>
        {/* <MakePaymentComponent /> */}
      </div>
    </div>
  );
};

export default payment;
