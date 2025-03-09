import React from "react";
import "./style.css";
const index = () => {
  //clear cart logic
  return (
    <div className="checkout-success">
      <h2>Check Out Successful</h2>
      <p>You order might take sometime to process</p>
      <p>Check your Order status at your profile after about 10 mins</p>
      <p>
        In case of any inquiries contract the support at {""}
        <strong>support@se-shop.com</strong>{" "}
      </p>
    </div>
  );
};

export default index;