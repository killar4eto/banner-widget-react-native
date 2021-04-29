import React, { Component } from "react";
import { Platform } from 'react-native';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import moment from "moment";
import * as Linking from 'expo-linking';
import axios from "axios";

const CONFIG = require("../config");

export class Helper extends Component {

    //Get location
    static getLocation = async () => {
        let response = {};
        const Accuracy = Platform.OS === "android" ? 2 : 1;

        let { status } = await Permissions.askAsync(Permissions.LOCATION);

        if (status !== 'granted') {
            return {
                success: false,
                error: "Missing location permissions!"
            };
        }

        //Run Location getCurrentPosition Async
        await Location.getCurrentPositionAsync({accuracy: Accuracy, enableHighAccuracy: false}).then((location) => {
            response = {
                success: true,
                coords: {
                    lat: location.coords.latitude,
                    lng: location.coords.longitude
                }
            };
        }).catch((error) => {
            response = {
                success: false,
                error: error
            }
        });

        return response;
    };

    //Validation of inputs
    static Validation = (type = null, value = null) => {
        type = type.toLowerCase();

        //Building switch for each case
        switch(type) {
            //Email
            case "email":
                const patternEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/igm;

                if(patternEmail.test(value)) {
                    return value;
                }
                return null;

            //Password
            case "password":
                if(value !== null && value.length >= 8) {
                    return value;
                }
                return null;

            //Text
            case "text":
                if(typeof(value) !== "undefined" && value !== null && value.length >= 2) {
                    return value;
                }
                return null;

            //Phone
            case "phone":
                const patternPhone = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;
                const patternPhone2 = /^\s(?:\+?(\d{1,3}))?[-. (](\d{3})[-. )](\d{3})[-. ](\d{4})(?: x(\d+))?\s$/;
                const patternPhone3 = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im;
                const patternPhone4 = /\s*(?:\+?(\d{1,3}))?([-. (]*(\d{3})[-. )]*)?((\d{3})[-. ]*(\d{2,4})(?:[-.x ]*(\d+))?)\s*$/;

                if(patternPhone.test(value) || patternPhone2.test(value) || patternPhone3.test(value) || patternPhone4.test(value)) {
                    return value;
                }
                return null;

            //Date
            case "date":
                if(moment(value).isValid()) {
                    return value;
                }

                return null;

            default:
                return value
        }
    };

    //Make it short
    static makeShort = (string, max) => {
        if(typeof string === 'string' || string instanceof String) {
            if(string.length > max) {
                string = string.substring(0, max) + '...';
                return string;
            }
        }

        return string || "";
    };

    //Google get place
    static searchPlaces = async (string, lang) => {
        let results = [];

        //Request
        const options = {
            method: 'GET',
            headers: { 'Content-Type': 'multipart/form-data', Accept: "application/json" },
            params: {input: string, key: CONFIG.g_key, types: "geocode", language: lang},
            url: "https://maps.googleapis.com/maps/api/place/autocomplete/json",
        }

        await axios(options).then((response) => {
            if(response.data.status === "OK") {
                response.data?.predictions?.map((place) => {
                    results.push({name: place.description, id: place.place_id});
                });
            }
        }).catch((e) => console.log(e));
        return results;
    };

    //Google get place geometry
    static getPlaceGeo = async (id) => {
        let result = null;

        const options = {
            method: 'GET',
            headers: { 'Content-Type': 'multipart/form-data', Accept: "application/json" },
            params: {place_id: id, key: CONFIG.g_key, fields: "geometry"},
            url: "https://maps.googleapis.com/maps/api/place/details/json",
        }

        //Request
        await axios(options).then((response) => {
            if(response.data.status === "OK") {
                result = response.data.result.geometry;
            }
        }).catch((e) => console.log(e));

        return result;
    };

    //Get place by coords
    static getPlaceByCoords = async (coords, lang) => {
        let results = [];

        //Request
        const options = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', Accept: "application/json" },
            params: {latlng: coords, key: CONFIG.g_key, types: "geocode", language: lang, result_type: "country|street_address|route"},
            url: "https://maps.googleapis.com/maps/api/geocode/json",
        }

        await axios(options).then((response) => {
            if (response.data.status === "OK") {
                response.data.results.map((place) => {
                    results.push({name: place.formatted_address, id: place.place_id});
                });
            }
        }).catch((e) => console.log(e));

        return results;
    };

    //Linking trigger
    static openLink = (type, data) =>{
        let response = false;

        switch(type) {
            case "tel":
                response = Linking.canOpenURL(`tel:${data}`).then(supported => {
                    if (!supported) {
                        return false;
                    } else {
                        return Linking.openURL(`tel:${data}`);
                    }
                }).catch(() => {
                    return false;
                });
                break;
            case "mail":
                response = Linking.canOpenURL(`mailto:${data}`).then(supported => {
                    if (!supported) {
                        return false;
                    } else {
                        return Linking.openURL(`mailto:${data}`);
                    }
                }).catch(() => {
                    return false;
                });
                break;
            case "location":
                let scheme = 'http://maps.google.com/maps?daddr=' + data.latitude + ", " + data.longitude;

                response = Linking.canOpenURL(scheme).then(supported => {
                    if (!supported) {
                        console.log('Can\'t handle url: ' + scheme);
                    } else {
                        return Linking.openURL(scheme);
                    }
                }).catch(err => console.error('An error occurred', err));
                break;
            case "web":
                response = Linking.canOpenURL(`${data}`).then(supported => {
                    if (!supported) {
                        return false;
                    } else {
                        return Linking.openURL(`${data}`);
                    }
                }).catch(() => {
                    return false;
                });
                break;
            case "sms":
                response = Linking.canOpenURL(`sms:${data}`).then(supported => {
                    if (!supported) {
                        return false;
                    } else {
                        return Linking.openURL(`sms:${data}`);
                    }
                }).catch(() => {
                    return false;
                });

        }

        return response;
    };

    static isEmptyObject = (obj) => {
        return Object.keys(obj).length === 0;
    }
}