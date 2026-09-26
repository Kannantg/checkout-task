interface CheckoutOptions {
    productId: string,
    onSuccess?: (data: { sessionId: string; }) => void;
    onClose?: (data: { reason: string; }) => void;
    onError?: (data: { code: string; message: string; }) => void;
}


class Checkout {
    private iframe: HTMLIFrameElement | null = null;
    private options: CheckoutOptions | null = null;

    open(options: CheckoutOptions) {
        this.options = options;
        this.createIframe();

        window.addEventListener("message", this.handleMessage);
    }

    private createIframe() {
        const iframe = document.createElement("iframe");
        iframe.src = `https://checkout-page-modal.vercel.app/?productId=${this.options?.productId}`;
        // iframe.src = `http://localhost:3000/?productId=${this.options?.productId}`;
        iframe.style.width = "100%";
        iframe.style.height = "100%";
        iframe.style.position = "fixed";
        iframe.style.inset = "0";
        iframe.style.zIndex = "999999";

        document.body.appendChild(iframe);

        this.iframe = iframe;

    }

    private handleMessage = (event: MessageEvent) => {
        if (event.origin !== "https://checkout-page-modal.vercel.app/") {
            return;
        }

        const { type, payload } = event.data;

        if(type === "CHECKOUT_SUCCESS") {
            this.options?.onSuccess?.(payload);
            this.close();
        }

        if(type === "CHECKOUT_CLOSED") {
            this.options?.onClose?.(payload);
            this.close();
        }

        if(type === "CHECKOUT_ERROR") {
            this.options?.onError?.(payload);
        }
    }

    close() {
        this.iframe?.remove();
        this.iframe = null;

        window.removeEventListener("message", this.handleMessage);
    }

}

export {};

declare global {
    interface Window {
        checkout: Checkout;
    }
}

const checkout = new Checkout();


window.checkout = checkout;
// export default checkout;