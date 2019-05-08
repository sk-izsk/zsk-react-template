import ReactDOM from "react-dom";
import "./main.css";
import "./style.css";
import React, { Component } from "react";
import Product from "./product.jsx";
import item from "./items.js";
import StripeCheckout from "react-stripe-checkout";
import { BrowserRouter, Route, Link } from "react-router-dom";
import Itempage from "./itempage.jsx";

let renderRoot = () => {
  let handleAddFunc = product => {};
  let onToken = token => {
    fetch("/save-stripe-token", {
      method: "POST",
      body: JSON.stringify(token)
    }).then(response => {
      response.json().then(data => {
        alert(`We are in business, ${data.email}`);
      });
    });
  };

  return (
    <div>
      <StripeCheckout
        token={onToken}
        stripeKey="pk_test_CRKICC1dKUDItn2acglHknjy00vt3Eu2o5
          "
      />
      <main className="pa3 pa5-ns flex flex-wrap">
        {item.map(p => (
          <Product key={p.id} {...p} addFunc={handleAddFunc} />
        ))}
      </main>
    </div>
  );
};
let renderItem = routerData => {
  // 10
  if (routerData.match.params.itemId === "2") {
    // 11
    return (
      <div>
        <Itempage />
      </div>
    ); // 11
  } // 11
  if (routerData.match.params.itemId === "3") {
    // 12
    return <div>A boat. Only 4 remaining </div>; // 12
  } // 12
  return <div> Unknown item </div>; // 13
};

class App extends Component {
  render = () => {
    return (
      <BrowserRouter>
        <div>
          <Route exact={true} path="/" render={renderRoot} />
          <Route exact={true} path="/items/:itemId" render={renderItem} />
        </div>
      </BrowserRouter>
    );
  };
}

ReactDOM.render(<App />, document.getElementById("root"));
