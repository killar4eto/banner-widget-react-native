import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

//Views
import Login from "../views/auth/index";
import List from "../views/List";

//Navigators
const Stack = createStackNavigator();

const AppNavigation = (state) => {

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={'Login'} headerMode={'none'}>
                <Stack.Screen name="Login">
                    {props => <Login {...props} extraProps={state}/>}
                </Stack.Screen>
                <Stack.Screen name="List">
                    {props => <List {...props} extraProps={state}/>}
                </Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigation;