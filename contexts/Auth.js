import React, {createContext, useState} from "react";
import StorageHelper from "./../components/StorageHelper";
const AuthContext = createContext();
import Request from "../components/Request";

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [address, setAddress] = useState("");
    const [organization, setOrganization] = useState(4);

    const login = async (code, phone) => {

        const formData = new FormData();
        formData.append('phone', phone);
        formData.append('password', code);

        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'multipart/form-data', Accept: "application/json" },
            data: formData
        }

        return Request("auth/login", options).then(async (response) => {
            if(response?.success) {
                //Update user
                setUser(response.user);
                await StorageHelper.set("token", response.token);

                return {
                    success: true
                }
            }
            else {
                return {
                    success: false
                }
            }
        }).catch((e) => console.log(e));
    }

    const refreshUser = async () => {
        const token = await StorageHelper.get("token");

        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: "application/json",
                Authorization: 'Bearer ' + token
            }
        }

        Request("auth/me", options).then((response) => {
            if (response?.success) {
                setUser(response.user);
            }
        }).catch((e) => console.log(e));
    }

    const logout = async () => {
        const token = await StorageHelper.get("token");
        const formData = new FormData();
        formData.append('token', token);

        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'multipart/form-data', Accept: "application/json", Authorization: 'Bearer '+token },
            data: formData
        }

        await Request("auth/invalidate", options);

        setUser(null);
        await StorageHelper.remove("token");
    }

    return (
        <AuthContext.Provider value={{
            user,
            setUser,
            address,
            setAddress,
            organization,
            setOrganization,
            refreshUser,
            login,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export { AuthProvider, AuthContext };