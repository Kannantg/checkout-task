
import React, { Suspense } from 'react'
import CheckoutPage from './pages/CheckoutPage';


export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
        <CheckoutPage />
    </Suspense>
  );
}

