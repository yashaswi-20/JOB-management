import { jest } from '@jest/globals';
import bcrypt from 'bcryptjs';
import request from 'supertest';

process.env.SECRET_KEY = 'jest-only-test-secret';

const users = {
    findOne: jest.fn(),
};

jest.unstable_mockModule('../models/user.model.js', () => ({
    default: users,
}));

jest.unstable_mockModule('../utils/verifyCaptcha.js', () => ({
    verifyTurnstileToken: jest.fn().mockResolvedValue({ success: true }),
}));

const { default: app } = await import('../app.js');

describe('POST /api/v1/user/login', () => {
    beforeEach(() => {
        users.findOne.mockReset();
    });

    test('rejects requests with missing credentials', async () => {
        const response = await request(app)
            .post('/api/v1/user/login')
            .send({ email: 'student@example.com' });

        expect(response.status).toBe(400);
        expect(response.body).toEqual({ msg: 'All fields are required' });
        expect(users.findOne).not.toHaveBeenCalled();
    });

    test('rejects an unknown user', async () => {
        users.findOne.mockResolvedValue(null);

        const response = await request(app)
            .post('/api/v1/user/login')
            .send({
                email: 'unknown@example.com',
                password: 'password123',
                role: 'Student',
                captchaToken: 'test-token',
            });

        expect(response.status).toBe(400);
        expect(response.body).toEqual({ msg: 'User does not exist' });
    });

    test('returns a session cookie for valid credentials', async () => {
        const passwordHash = await bcrypt.hash('password123', 10);
        users.findOne.mockResolvedValue({
            _id: 'user-id',
            fullname: 'Test Student',
            email: 'student@example.com',
            password: passwordHash,
            phoneNumber: '1234567890',
            role: 'Student',
            profile: {},
        });

        const response = await request(app)
            .post('/api/v1/user/login')
            .send({
                email: 'student@example.com',
                password: 'password123',
                role: 'Student',
                captchaToken: 'test-token',
            });

        expect(response.status).toBe(200);
        expect(response.body).toMatchObject({
            success: true,
            user: {
                email: 'student@example.com',
                role: 'Student',
            },
        });
        expect(response.headers['set-cookie'][0]).toContain('token=');
    });
});
