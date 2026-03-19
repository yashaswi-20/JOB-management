export const verifyTurnstileToken = async (token) => {
    // Provide a dummy testing secret key as default, or use the real one from env
    const secretKey = process.env.TURNSTILE_SECRET_KEY || '1x0000000000000000000000000000000AA';

    if (!token) {
        return { success: false, msg: "CAPTCHA token is missing" };
    }

    try {
        const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
                secret: secretKey,
                response: token,
            }),
        });

        const data = await response.json();
        
        if (data.success) {
            return { success: true };
        } else {
            console.error("Turnstile verification failed:", data);
            return { success: false, msg: "CAPTCHA verification failed" };
        }
    } catch (error) {
        console.error("Error verifying Turnstile token:", error);
        return { success: false, msg: "Server error during CAPTCHA verification" };
    }
};
