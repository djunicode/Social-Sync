//components->MakePaymentComponent.js
import React from "react";
import razorpay from '../app/razorpay'

const MakePaymentComponent = () => {
  const makePayment = async () => {
    //console.log("here...");
    const res = await initializeRazorpay();
    if (!res) {
      alert("Razorpay SDK Failed to load");
      return;
    }
    // Make API call to the serverless API
    const data = await fetch(
      "razorpay",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          taxAmt: 100,
        }),
      }
    ).then((t) => t.json());
    //console.log(data);
    var options = {
      key: process.env.RAZORPAY_KEY, // Enter the Key ID generated from the Dashboard
      name: "Indradhanu.online",
      currency: data.currency,
      amount: data.amount,
      order_id: data.id,
      description: "Thankyou for your test donation",
      image: "https://manuarora.in/logo.png",
      handler: function (response) {
        // Validate payment at server - using webhooks is a better idea.
        alert("Razorpay Response: " + response.razorpay_payment_id);
        //alert(response.razorpay_order_id);
        //alert(response.razorpay_signature);
      },
      prefill: {
        name: "Sharan Shetty",
        email: "admin@xyz.online",
        contact: "9004699870",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };
  const initializeRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      // document.body.appendChild(script);

      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };

      document.body.appendChild(script);
    });
  };
  return (
    <div>
      <button onClick={() => makePayment()}>Pay 100 now</button>
    </div>
  );
};

export default MakePaymentComponent;
