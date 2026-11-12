import { jest } from '@jest/globals';
import { verifyTurnstileToken } from '../utils/verifyCaptcha.js';

describe('verifyTurnstileToken', () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });

    test('rejects a missing token without making a network request', async () => {
        const fetchSpy = jest.spyOn(global, 'fetch');

        await expect(verifyTurnstileToken()).resolves.toEqual({
            success: false,
            msg: 'CAPTCHA token is missing',
        });
        expect(fetchSpy).not.toHaveBeenCalled();
    });

    test('accepts a token when Cloudflare verifies it', async () => {
        jest.spyOn(global, 'fetch').mockResolvedValue({
            json: async () => ({ success: true }),
        });

        await expect(verifyTurnstileToken('valid-token')).resolves.toEqual({
            success: true,
        });
    });

    test('returns a validation error when Cloudflare rejects a token', async () => {
        jest.spyOn(global, 'fetch').mockResolvedValue({
            json: async () => ({
                success: false,
                'error-codes': ['invalid-input-response'],
            }),
        });

        await expect(verifyTurnstileToken('invalid-token')).resolves.toEqual({
            success: false,
            msg: 'CAPTCHA verification failed: invalid-input-response',
        });
    });
});
