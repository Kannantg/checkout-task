"use client";

import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'

// interface Inputs {
//     email: string;
//     cardnum: string;
// }

interface Data {
    title: string;
    price: number
}

const CheckoutPage = () => {

    const [inputs, setInputs] = useState({
        email: "",
        cardnum: ""
    });

    const [data, setData] = useState<Data | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isProdLoading, setProdLoading] = useState(true);
    const [isError, setIsError] = useState<any>({});
    const [isErrorStr, setIsErrorStr] = useState<any>("");
    const [isSuccess, setIsSuccess] = useState<any>({});

    const searchParams = useSearchParams();
    const productId = searchParams.get("productId");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://dummyjson.com/products/${productId}`);
                const data = await response.json();
                setData(data);
                setProdLoading(false);
            } catch (err) {
                console.log(err);
            }
        }

        fetchData();
    }, []);

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const numberRegex = /^\d+$/;

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setInputs(prev => (
            { ...prev, [name]: value }
        ));
    }

    // console.log(inputs);

    const handleClick = async (e: any) => {
        e.preventDefault();
        const validateResult = validation(inputs);

        console.log(validateResult);
        setIsError(validateResult);

        if (Object.keys(validateResult).length === 0) {
            setIsLoading(true);

            try {
                const response = await fetch("/api/checkout", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(inputs)
                });

                const data = await response.json();

                if (data.success) {
                    setIsSuccess(data);

                    setTimeout(() => {
                        window.parent.postMessage({
                            type: "CHECKOUT_SUCCESS",
                            payload: {
                                sessionId: data.sessionId
                            }
                        }, "*");
                    }, 1500);


                    setInputs({
                        email: "",
                        cardnum: ""
                    });
                    setIsErrorStr("");
                } else {
                    setIsErrorStr(data.message);
                }

                // if (data.status === 400) {
                //     setIsErrorStr(data.message);
                // } else {

                // }

                // if (!response.ok) {
                //     setIsErrorStr(data.message);
                // }

                // window.parent.postMessage({
                //     type: "CHECKOUT_SUCCESS",
                //     payload: {
                //         sessionId: data.sessionId
                //     }
                // }, "*");

                // setInputs({
                //     email: "",
                //     cardnum: ""
                // });

            } catch (err) {
                setIsErrorStr(err ? "Payment Failed. Something went wrong." : "");
                window.parent.postMessage({
                    type: "CHECKOUT_ERROR",
                    payload: {
                        code: "PAYMENT_FAILED",
                        message: "Payment Failed. Something went wrong."
                    }
                }, "*");
            } finally {
                setIsLoading(false);
            }
        }


    }


    const handleClose = () => {
        window.parent.postMessage({
            type: "CHECKOUT_CLOSED",
            payload: {
                reason: "user"
            }
        }, "*");
    }

    const validation = (inputObj: any) => {
        const errorObj: any = {};

        if (inputObj.email === "") {
            errorObj.email = "Email is required";
        } else if (!emailRegex.test(inputObj.email)) {
            errorObj.email = "Email is invalid format";
        }

        if (inputObj.cardnum === "") {
            errorObj.cardnum = "Card number is required";
        } else if (!numberRegex.test(inputObj.cardnum)) {
            errorObj.cardnum = "Card number should be number only";
        } else if (inputObj.cardnum.length < 16) {
            errorObj.cardnum = "Card number should be 16 digits";
        }

        return errorObj;
    }


    return (
        <section className="w-full max-w-[1240px] mx-auto">
            <div className="w-full max-w-[400px] mx-auto bg-[#fff] border border-[#d3d3d3] rounded-[10px] p-4">
                <div className="flex items-center justify-between mb-5">
                    <h1 className="text-[30px] text-center text-black">Checkout</h1>
                    <button type="button" className="text-[30px] text-black leading-2 cursor-pointer" onClick={handleClose}>&times;</button>
                </div>
                {
                    isSuccess.success ? <div className="py-5 my-2 text-center">
                        <span className="text-[45px] text-green block mb-3">&#x2705;</span>
                        <p className="text-[18px] text-black font-medium">{isSuccess.message}</p>
                    </div> : <div className="">
                        <div className="mb-4">
                            <p className="text-[16px] font-medium mb-2 text-black">Product</p>
                            <div className="flex flex-col min-[400px]:flex-row gap-2 min-[400px]:gap-1 items-center justify-between">
                                <p className="text-[15px] text-black">{isProdLoading ? "Loading..." : data?.title ? data.title : "Product name"}</p>
                                <p className="text-[15px] text-black">{isProdLoading ? "Loading..." : data?.price ? "$" + data.price : "0.00"}</p>
                                {/* <p className="text-[15px] text-black">Iphone 18 pro</p>
                                <p className="text-[15px] text-black">1,50,000</p> */}
                            </div>
                        </div>
                        <form>
                            <div className="mb-4">
                                <label className="text-[16px] font-medium block mb-2 text-black">Email</label>
                                <input type="text" className="text-black text-[16px] font-normal bg-[#FFFFFF] border border-[#d3d3d3] rounded-[5px] h-[35px] p-1 outline-0 focus:border-[#d3d3d3] w-full py-[5px] px-[10px]" name="email" value={inputs.email} onChange={handleChange} placeholder="example@gmail" />
                                {
                                    isError.email && <span className="text-[14px] text-red-600">{isError.email}</span>
                                }
                            </div>
                            <div className="mb-4">
                                <label className="text-[16px] font-medium block mb-2 text-black">Card</label>
                                <input type="text" className="text-black text-[16px] font-normal bg-[#FFFFFF] border border-[#d3d3d3] rounded-[5px] h-[35px] p-1 outline-0 focus:border-[#d3d3d3] w-full py-[5px] px-[10px]" name="cardnum" value={inputs.cardnum} onChange={handleChange} placeholder="0000 0000 0000 0000" maxLength={16} />
                                {
                                    isError.cardnum && <span className="text-[14px] text-red-600">{isError.cardnum}</span>
                                }
                            </div>
                            <div>
                                <button type="submit" className={`text-[16px] text-[#fff] bg-[#3da3ff] py-[10px] px-[20px] rounded-[10px] border border-[#3da3ff] w-full cursor-pointer font-medium ${isLoading ? "opacity-75 !cursor-not-allowed" : ""}`} onClick={handleClick} disabled={isLoading}>
                                    {isLoading ? "Processing..." : `Pay ${isProdLoading ? "Loading..." : data?.price ? "$" + data.price : "0.00"}`}
                                </button>
                            </div>
                        </form>
                        {
                            isErrorStr && <span className="text-[14px] text-red-600 block mt-3 text-center">{isErrorStr}</span>
                        }
                    </div>
                }

            </div>
        </section>
    )
}

export default CheckoutPage;