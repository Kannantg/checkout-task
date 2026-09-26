"use strict";
var Checkout = (() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // src/checkout.ts
  var checkout_exports = {};
  var Checkout = class {
    constructor() {
      this.iframe = null;
      this.options = null;
      this.handleMessage = (event) => {
        var _a, _b, _c, _d, _e, _f;
        if (event.origin !== "https://checkout-page-modal.vercel.app/") {
          return;
        }
        const { type, payload } = event.data;
        if (type === "CHECKOUT_SUCCESS") {
          (_b = (_a = this.options) == null ? void 0 : _a.onSuccess) == null ? void 0 : _b.call(_a, payload);
          this.close();
        }
        if (type === "CHECKOUT_CLOSED") {
          (_d = (_c = this.options) == null ? void 0 : _c.onClose) == null ? void 0 : _d.call(_c, payload);
          this.close();
        }
        if (type === "CHECKOUT_ERROR") {
          (_f = (_e = this.options) == null ? void 0 : _e.onError) == null ? void 0 : _f.call(_e, payload);
        }
      };
    }
    open(options) {
      this.options = options;
      this.createIframe();
      window.addEventListener("message", this.handleMessage);
    }
    createIframe() {
      var _a;
      const iframe = document.createElement("iframe");
      iframe.src = `https://checkout-page-modal.vercel.app/?productId=${(_a = this.options) == null ? void 0 : _a.productId}`;
      iframe.style.width = "100%";
      iframe.style.height = "100%";
      iframe.style.position = "fixed";
      iframe.style.inset = "0";
      iframe.style.zIndex = "999999";
      document.body.appendChild(iframe);
      this.iframe = iframe;
    }
    close() {
      var _a;
      (_a = this.iframe) == null ? void 0 : _a.remove();
      this.iframe = null;
      window.removeEventListener("message", this.handleMessage);
    }
  };
  var checkout = new Checkout();
  window.checkout = checkout;
  return __toCommonJS(checkout_exports);
})();
