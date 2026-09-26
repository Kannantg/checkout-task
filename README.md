# Embeddable Checkout SDK

A simple embeddable checkout system built with Next.js, React, TypeScript, iframe, and postMessage.

## Tech Stack

Next.js
React
TypeScript
iframe
postMessage
tsup

## How to Run

### 1. Install dependencies


npm install


### 2. Start the Next.js app


npm run dev


The checkout app runs on:

https://checkout-page-modal.vercel.app/


### 3. Build the SDK


npm run build:sdk


This generates:


public/checkout.js


## How It Works

The merchant website loads the SDK:


<script src="https://checkout-sdk-js.vercel.app/checkout.global.js"></script>


Then opens checkout:


const checkout = new Checkout();

checkout.open({
  productId: "pro_123",

  onSuccess: ({ sessionId }) => {
    console.log("Payment successful", sesId);
  },

  onClose: ({ reason }) => {
    console.log("Checkout closed", reason);
  },

  onError: ({ code, message }) => {
    console.error(code, message);
  }
});


## Communication

The SDK creates an iframe containing the Next.js checkout app.

Merchant Website → Checkout SDK → iframe → Next.js Checkout


The SDK sends data to the checkout using:


postMessage()


The checkout sends events back to the SDK using:


window.parent.postMessage()


The SDK listens using:


window.addEventListener("message")


### Message Flow


SDK → Checkout

Checkout → SDK
PAYMENT_SUCCESS
PAYMENT_ERROR
CHECKOUT_CLOSED


The SDK converts these messages into merchant callbacks:


PAYMENT_SUCCESS → onSuccess()
PAYMENT_ERROR   → onError()
CHECKOUT_CLOSED  → onClose()


## Production

SDK and checkout app on a public domain:


https://checkout-sdk-js.vercel.app/checkout.global.js
https://checkout-page-modal.vercel.app/


Then merchants can use:

<script src="https://checkout-sdk-js.vercel.app/checkout.global.js"></script>

