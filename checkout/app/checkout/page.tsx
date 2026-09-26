import React, { Suspense } from 'react'
import CheckoutPage from './CheckoutPage';

const page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
        <CheckoutPage />
    </Suspense>
  )
}

export default page;