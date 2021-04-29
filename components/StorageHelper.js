import React, { Component } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

class StorageHelper extends Component {

    constructor(props) {
        super(props);
    }

    //Set AsyncStorage
    set = async (key, value) => {
        try {
            await AsyncStorage.setItem(key, JSON.stringify(value), null);
        } catch (error) {
            console.error(error);
            return false;
        }

        return true;
    };

    //Get AsyncStorage
    get = async (key) => {
        try {
            const value = await AsyncStorage.getItem(key, null);

            if(this.isJson(value)) {
                return JSON.parse(value);
            }
            else{
                return value;
            }
        } catch (error) {
            console.error(error);
            return null;
        }
    };

    //Get MULTI AsyncStorage
    getMulti = async (array) => {
        let values = [];

        for(let i=0;i<array.length;i++){
            try {
                const value = await this.get(array[i]);

                values.push(value);
            } catch (error) {
                console.error(error);
                return null;
            }
        }

        return values;
    };

    isJson = (str) => {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }

        return true;
    };

    //Remove
    remove = async (key) => {
        try{
            await AsyncStorage.removeItem(key, null);
        }catch(error){
            console.log(error);
        }
    };

    //Multi remove
    multiRemove = async (keys) => {
        try {
            await AsyncStorage.multiRemove(keys, false);
        }catch(error) {
            console.log(error);
        }
    }
}

const storageHelper = new StorageHelper();

export default storageHelper;
