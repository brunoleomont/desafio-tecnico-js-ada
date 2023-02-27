import express from "express";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import cors from 'cors';
import tokenValited from "./auth.js";
import routes from './router.js';

const api = express();
const PORT = process.env.PORT || 5000;

api.use(express.json());

api.use(cors());

dotenv.config();

api.get('/', (_, res) => res.status(200).json({
    message: 'This is a PUBLIC router...'
}));

api.post('/login', (req, res) => {
    const { login, senha } = req.body;

    try {
        const devAuth = login === process.env.login && senha === process.env.password;

        if (!devAuth) return res.status(401).send('Login or password incorrect, please try again');

        const token = jwt.sign(
            { user: process.env.login },
            process.env.JWT_SECRET_KEY,
            { expiresIn: '60m' }
        );

        return res.status(200).json(token);
    } catch (error) {
        console.log(error);
        return res.send(error);
    }
});

api.use('*', tokenValited);
api.use(routes)

api.listen(PORT, () => console.log(`Server is up and running on :${PORT}`));