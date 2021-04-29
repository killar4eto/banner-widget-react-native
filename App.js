import React, { useState, useEffect } from 'react';
import AppLoading from 'expo-app-loading';
import { View, StatusBar } from 'react-native';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import * as Icon from '@expo/vector-icons';
import { activateKeepAwake } from 'expo-keep-awake';
import theme from "./assets/themes/default";
import AppNavigation from "./components/Navigation";
import { AuthProvider } from "./contexts/Auth";
import StorageHelper from "./components/StorageHelper";

export default function App() {
    const [isReady, setIsReady] = useState(false);
    const [isSigned, setIsSigned] = useState(false);

    const CONFIG = require("./config.json");

    useEffect(() => {
        async function checkToken(){
            const token = await StorageHelper.get("token");

            if(token !== null) {
                setIsSigned(true);
            }
            else {
                setIsSigned(false);
            }
        }

        checkToken().catch((e) => console.log(e));
    }, []);

    //Keep application active all time
    activateKeepAwake();

    const signIn = () => {
        setIsSigned(true);
    }

    const isSignedOut = () => {
        setIsSigned(false);
    }

    if(!isReady) {
        return (
            <AppLoading
                startAsync={_loadResourcesAsync}
                onFinish={() => setIsReady(true)}
                onError={console.warn}
            />
        );
    }
    else {
        return (
            <View style={theme.container}>
                <StatusBar style="light" hidden={false} animated={true} backgroundColor="transparent" translucent={true}/>
                <AuthProvider>
                    <AppNavigation signIn={() => signIn()} isSignedOut={() => setIsSigned()} isSigned={isSigned} theme={theme} settings={CONFIG}/>
                </AuthProvider>
            </View>
        );
    }
}

//Load custom fonts
const _loadResourcesAsync = async () => {
    return Promise.all([
        Asset.loadAsync([
            require('./assets/videos/intro.mp4')
        ]),
        Font.loadAsync({
            ...Icon.Ionicons.font,
            'Roboto_bold': require('./assets/fonts/Roboto-Bold.ttf'),
            'Roboto_medium': require('./assets/fonts/Roboto-Medium.ttf'),
            'Roboto': require('./assets/fonts/Roboto-Regular.ttf')
        }),
    ]);
};