import { signService } from "../services/sign.service.js";

async function signUp(req, res) {
    const { email, password, name } = req.body;

    try {
        await signService.
            signUp({ name, email, password });

        return res.status(201).
            send('User registred');

    } catch (error) {
        console.log(error);

        res.status(error.status).
            send(error.message);
    }
}

async function signIn(req, res) {
    const { email, password } = req.body;

    try {
        const token =
            await signService.
                signIn({ email, password });

        res.status(200).
            send({ message:'Login successful', token});

    } catch (error) {
        console.log(error);

        res.status(error.status).
            send(error.message);
    }
}

export const signController = {
    signUp,
    signIn
}