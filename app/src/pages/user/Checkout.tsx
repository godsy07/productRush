import React from "react";

const Checkout = () => {
  return (
    <div className="mx-3 flex flex-col items-center">
      <div className="w-full sm:w-5/6 md:w-3/5 lg:w-2/3">
        <div className="p-3 mt-5 rounded border border-3 border-slate-500">
          <h2 className="text-center mb-2">Products</h2>
          <div className="w-full flex flex-col p-2">

            <div className="grid grid-cols-3 gap-y-4">
              <div>Product1 (Rs. 32)</div>
              <div className="text-center">X</div>
              <div className="grid grid-cols-3">
                <div>2 items</div>
                <div className="text-center">=</div>
                <div className="text-right">Rs. 62</div>
              </div>
              <div>Product2 (Rs. 61)</div>
              <div className="text-center">X</div>
              <div className="grid grid-cols-3">
                <div>1 item</div>
                <div className="text-center">=</div>
                <div className="text-right">Rs. 61</div>
              </div>
              <hr/>
              <hr/>
              <hr/>
              <div>Total:</div>
              <div></div>
              <div className="text-right">Rs. 123.00</div>
            </div>

          </div>
        </div>
        <div className="px-3 mt-2 w-full flex justify-end">
          <button className="button button--primary">Checkout</button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
