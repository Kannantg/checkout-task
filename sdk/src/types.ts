export interface CheckoutOptions {
    productId: string,
    onSuccess?: (data: { sessionId: string; }) => void;
    onClose?: (data: { reason: string; }) => void;
    onError?: (data: { code: string; message: string; }) => void;
}