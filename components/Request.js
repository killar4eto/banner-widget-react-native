import StorageHelper from "../components/StorageHelper";
import axios from "axios";

export default async function Request(route, options = {}, nav = null) {
    const CONFIG = require("../config.json");
    const token = await StorageHelper.get("token");

    route = route.trimLeft("/");

    if(route.indexOf("?") > -1) {
        route = route+`&key=${CONFIG.API_KEY}`;
    }
    else {
        route = route+`?key=${CONFIG.API_KEY}`;
    }

    options.url = `${CONFIG.API_URL}/${route}`;

    return axios(options).then((response) => response.data).then(async (response) => {
        if(response?.error === "token_expired") {
            let dataForm = new FormData();
            dataForm.append("token", token);

            return await axios.post(`${CONFIG.API_URL}/auth/refresh?key=${CONFIG.API_KEY}`, dataForm).then((response) => response.data).then(async (r) => {
                if(r?.success) {
                    await StorageHelper.set("token", r?.token);

                    options.headers["Authorization"] = 'Bearer ' + r?.token;

                    return axios(options).then((response) => response.data).then(async (response) => {
                        return response;
                    }).catch((error) => {return error});
                }
            }).catch((error) => {return error});
        }

        if (response?.error === "token_invalid") {
            await StorageHelper.remove("token");

            if(nav !== null) {
                nav.navigate("Login");
            }

            return {
                success: false,
                error: 'token_invalid'
            }
        }

        if (response?.error === "token_not_provided") {
            if(nav !== null) {
                nav.navigate("Login");
            }

            return {
                success: false,
                error: 'token_not_provided'
            }
        }

        if (response?.error === "could_not_refresh_token") {
            await StorageHelper.remove("token");

            if(nav !== null) {
                nav.navigate("Login");
            }

            return {
                success: false,
                error: 'could_not_refresh_token'
            }
        }

        if (response?.error === "given_token_was_blacklisted") {
            await StorageHelper.remove("token");

            if(nav !== null) {
                nav.navigate("Login");
            }

            return {
                success: false,
                error: 'given_token_was_blacklisted'
            }
        }

        return response;
    }).catch((e) => console.log(e));
}