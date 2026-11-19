export const verifyTurnstileToken = async (token) => {
    if (!token) {
        return { success: false, msg: 'CAPTCHA token is missing' };
    }

    const secretKey = process.env.TURNSTILE_SECRET_KEY;

    if (!secretKey) {
        console.error('Turnstile secret key is not configured');
        return { success: false, msg: 'CAPTCHA verification is not configured' };
    }

    try {
        const response = await fetch(
            'https://challenges.cloudflare.com/turnstile/v0/siteverify',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    secret: secretKey,
                    response: token,
                }),
            }
        );

        const data = await response.json();

        if (data.success) {
            return { success: true };
        }

        console.error(
            'Turnstile verification failed:',
            JSON.stringify(data['error-codes'] || [])
        );

        return {
            success: false,
            msg: 'CAPTCHA verification failed: ' +
                (data['error-codes']?.[0] || 'Unknown error'),
        };
    } catch (error) {
        console.error('Turnstile verification error:', error.message);
        return {
            success: false,
            msg: 'Server error during CAPTCHA verification',
        };
    }
};
