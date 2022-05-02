import Auth from '../../interfaces/auth';
import { useState } from 'react';
import AuthModel from '../../models/auth';
import AuthFields from './AuthFields';
import { showMessage } from 'react-native-flash-message';

export default function Register({ navigation }) {
    const [auth, setAuth] = useState<Partial <Auth>>({});

    async function doRegister() {
        if (auth.email && auth.password) {
            const result = await AuthModel.register(auth.email, auth.password);
            if(result.type === "success") {
                navigation.navigate("Login");
            }
            showMessage(result);
        } else {
            showMessage({
                message: "Mail or password missing",
                description: "Please enter both email and password",
                type: "warning"
            });
        }
    }

    return (
        <AuthFields
            auth={auth}
            setAuth={setAuth}
            submit={doRegister}
            title="Registrera"
            navigation={navigation}
        />
    )
};