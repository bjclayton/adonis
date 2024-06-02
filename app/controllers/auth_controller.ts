import User from '#models/user';
import { loginUserValidator } from '#validators/login';
import { registerUserValidator } from '#validators/register_user';
import type { HttpContext } from '@adonisjs/core/http'

export default class AuthController {
    public async register({ request, response }: HttpContext) {
        try {
            const payload = await request.validateUsing(registerUserValidator);

            const user = await User.findBy('email', payload.email)
            if (user) {
                return response
                    .status(400)
                    .json({ message: 'Email already exists' });
            }

            await User.create(payload);

            return response
                .status(201)
                .json({ message: "User successfully created" });
        } catch (error) {
            response
                .status(500)
                .json({
                    message: "Something went wrong.",
                    error: error
                });
        }
    }

    public async login({ request, response }: HttpContext) {
        try {
            const payload = await request.validateUsing(loginUserValidator);
            const user = await User.verifyCredentials(
                payload.email,
                payload.password
            )

            const token = await User.accessTokens.create(user)

            return response.status(200).json(token);
        } catch (error) {
            response
                .status(500)
                .json({
                    message: "Something went wrong.",
                    error: error
                });
        }
    }
}
