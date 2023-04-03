import { usersRepository } from "../repositories/users.repository.js"
import { authRepository } from "../repositories/auth.repository.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


async function signUp({ name, email, password }) {
    const { rowCount: userFound } =
        await usersRepository.findByEmail(email);
    if (userFound)
        throw {
            message: 'Email already in use',
            status: 409
        }
    
    const hashedPassword =
        await bcrypt.hash(password, 10);
    
    await usersRepository.insertUser({
        name, email, password: hashedPassword
    });
}

async function signIn({ email, password }) {
    const { rows: [user] } =
        await usersRepository.findByEmail(email);

    if (user && bcrypt.compareSync(
        password, user.password
    )) {
        const { rows: [session] } =
            await authRepository.
                findSessionByUserId(user.id);

        if (session) return session.token;

        const token = jwt.sign({
            id: user.id,
            email: user.email
        }, process.env.SECRET_JWT || 'secret');

        await authRepository.
            createSession(user.id, token);
        
        return token;
    }
    else {
        throw {
            message: `Couldn't log you in`,
            status: 401
        }
    }
 }

export const signService = {
    signIn,
    signUp
}