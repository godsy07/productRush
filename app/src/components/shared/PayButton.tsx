import React, { useEffect, useState } from "react";
import axios from "axios";

import { RAZORPAY_KEY_ID, REST_API_URL } from "@/config";

function loadScript(src: string) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    // script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    document.body.appendChild(script);
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
  });
}

const PayButton = () => {
  const [orderID, setOrderID] = useState('');

  async function displayRazorpay() {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("failed!!");
    }

    const options = {
      key: RAZORPAY_KEY_ID, // Enter the Key ID generated from the Dashboard
      amount: "50000", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: "Acme Corp",
      description: "Test Transaction",
      // "image": "https://example.com/your_logo",
      order_id: orderID, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      // order_id: "order_IluGWxBm9U8zJ8", //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      handler: function (response: any) {
        alert(response.razorpay_payment_id);
        alert(response.razorpay_order_id);
        alert(response.razorpay_signature);
      },
      prefill: {
        name: "Gaurav Kumar",
        email: "gaurav.kumar@example.com",
        contact: "9000090000",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const _window = window as any;
    const paymentObject = new _window.Razorpay(options);
    paymentObject.open();
  }

  
  // useEffect(() => {
  //   const controller = new AbortController();
  //   axios.post(`${REST_API_URL}/order/create-order`,{},{ signal: controller.signal }).then((res: any) => {
  //     if (res && res.data && res.data.order) {
  //       setOrderID(res.data.order.id)
  //     }
  //   }).catch((err: any) => {
  //     if (err.name === 'AbortError') return;
  //    });
  //   // axios.get(`${REST_API_URL}/order/create-order`,{ signal: controller.signal }).then((res: any) => {
  //   //   if (res && res.data && res.data.order) {
  //   //     setOrderID(res.data.order.id)
  //   //   }
  //   // }).catch((err: any) => {
  //   //   if (err.name === 'AbortError') return;
  //   //   console.log(err)
  //   //  });
  //   return () => controller.abort();
  // },[])

  return (
    <div>
      <button className="button button--info" onClick={() => displayRazorpay()}>
        Place Order
      </button>
    </div>
  );
};

export default PayButton;
