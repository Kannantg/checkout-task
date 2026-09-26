let retry = 0;

export async function POST(request: Request) {
    const body = await request.json();

    const { cardnum } = body;

    await new Promise((resolve) => {
        setTimeout(resolve, 1500);
    });

    if (cardnum === "4242424242424242") {
        return Response.json({
            sessionId: "session_" + crypto.randomUUID(),
            success: true,
            message: "Payment Successful",
        }, { status: 200 });
    } else if (cardnum === "4000000000000002") {
        return Response.json({
            message: "Card number is not valid",
            success: false
        }, { status: 400 });
    } else if (cardnum === "4000000000000341") {
        if (retry === 1) {
            return Response.json({
                sessionId: "session_" + crypto.randomUUID(),
                success: true,
                message: "Payment Successful"
            }, { status: 200 });
        } else {
            retry = retry + 1;
            return Response.json({
                message: "Card number is not valid",
                success: false
            }, { status: 400 });
        }
    } else {
        return Response.json({
            message: "Card number is not valid",
            success: false
        }, { status: 400 });
    }


}