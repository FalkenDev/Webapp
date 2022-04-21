import config from "../config/config.json";
import storage from "./storage";

const auth = {
    loggedIn: async function loggedIn() {
        const tokenAndDate = storage.readToken();
        const twentyFourHours = 1000 * 60 * 60 * 24;
        const notExpired = (new Date().getTime() - tokenAndDate.date) < twentyFourHours;

        return tokenAndDate.token && notExpired;
    },

    register: async function register(email:string, password:string) {
        const data = {
            api_key: config.api_key,
            email: email,
            password: password
        };

        const respons = await fetch(`${config.base_url}/auth/register`,
        {
            method:"POST",
            body: JSON.stringify(data),
            headers: {
                'content-type': 'application/json'
            }
        });
        return await respons.json();
    },

    login: async function login(email:string, password:string) {
        const data = {
            api_key: config.api_key,
            email: email,
            password: password
        };

        const respons = await fetch(`${config.base_url}/auth/login`,
        {
            method:"POST",
            body: JSON.stringify(data),
            headers: {
                'content-type': 'application/json'
            }
        });
        
        const result = await respons.json();
        await storage.storeToken(result.data.token);
        return result.data.message;
    },

    logout: async function logout() {
        await storage.deleteToken();
    }
};

export default auth;