import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome5 } from '@expo/vector-icons';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

//Views
import Login from "../views/auth/index";

//Navigators
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const TabMenu = (props) => {
    const currentRoute = getFocusedRouteNameFromRoute(props.route);

    return(
        <Tab.Navigator
            screenOptions={({ route }) => ({
                unmountOnBlur: false,
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    let icon;
                    let customIcon = false;

                    if (route.name === 'categories') {
                        customIcon = true;
                        iconName = focused ? 'home' : 'home-alt';
                        icon = <HomeIcon width={size} height={size} fill={focused ? '#EF4623' : '#8D8D8D'}/>;

                    } else if (route.name === 'profile') {
                        iconName = focused ? 'user-edit' : 'user-cog';
                        customIcon = true;
                        icon = <UserIcon width={size} height={size} fill={focused ? '#512E91' : '#8D8D8D'}/>;

                    }else if (route.name === 'search') {
                        iconName = focused ? 'user-edit' : 'user-cog';
                        customIcon = true;
                        icon = <SearchIcon width={size} height={size} fill={focused ? '#8DC63F' : '#8D8D8D'}/>;
                    }
                    else if (route.name === 'orders') {
                        iconName = focused ? 'list' : 'list-alt';
                        customIcon = true;
                        icon = <OrdersIcon width={size} height={size} fill={focused ? '#FCB514' : '#8D8D8D'}/>;
                    }

                    // You can return any component that you like here!
                    return customIcon ? icon : <FontAwesome5 name={iconName} size={size} color={color} />;
                },
                //title: TranslateUI.translate(props.extraProps.language, 'menu_'+route.name)
            })}
            tabBarOptions={{
                showLabel: false,
                style: {
                    height: 70,
                    borderTopRightRadius: 30,
                    borderTopLeftRadius: 30,
                    backgroundColor: '#fff',
                    borderWidth: .5,
                    borderColor: '#8D8D8D',
                    position: 'absolute',
                    zIndex: 1,
                    bottom: 0
                },
                // labelStyle: props.extraProps.theme.tabMenu,
                activeTintColor: '#EF4623',
                inactiveTintColor: '#8D8D8D',
            }}
        >
            <Tab.Screen name="categories">
                {() => <CategoriesStack {...props} />}
            </Tab.Screen>

            <Tab.Screen name="orders">
                {() => <OrdersStackNav {...props} />}
            </Tab.Screen>

            <Tab.Screen name="profile">
                {() => <ProfileStackNav {...props} />}
            </Tab.Screen>
        </Tab.Navigator>
    );
}

//Custom category stack
const CategoriesStack = (props) => {
    return (
        <Stack.Navigator
            headerMode={'none'}
            initialRouteName="categories"
        >
            <Stack.Screen name="backToCategories">
                {() => <Categories {...props} />}
            </Stack.Screen>

            <Stack.Screen name="Place">
                {() => <Place {...props} />}
            </Stack.Screen>

            <Stack.Screen name="delivery">
                {() => <Delivery {...props} />}
            </Stack.Screen>
        </Stack.Navigator>
    );
}

//Orders stack
const OrdersStackNav = (props) => {
    return (
        <Stack.Navigator
            headerMode={'none'}
            initialRouteName="orders"
        >
            <Stack.Screen name="backToOrders">
                {() => <Orders {...props} />}
            </Stack.Screen>

            <Stack.Screen name="order_view">
                {() => <OrderView {...props} />}
            </Stack.Screen>

            <Stack.Screen name="confirm_order">
                {() => <ConfirmOrder {...props} />}
            </Stack.Screen>
        </Stack.Navigator>
    );
}

const ProfileStackNav = (props) => {
    return (
        <Stack.Navigator
            headerMode={'none'}
            initialRouteName="profile"
        >
            <Stack.Screen name="backToProfile">
                {() => <Profile {...props} />}
            </Stack.Screen>

            <Stack.Screen name="settings">
                {() => <Settings {...props} />}
            </Stack.Screen>

            <Stack.Screen name="payments">
                {() => <Payments {...props} />}
            </Stack.Screen>

            <Stack.Screen name="about">
                {() => <About {...props} />}
            </Stack.Screen>

            <Stack.Screen name="notifications">
                {() => <Notifications {...props} />}
            </Stack.Screen>
        </Stack.Navigator>
    );
}

const AppNavigation = (state) => {

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={state.isSigned ? 'TabMenu' : 'Login'} headerMode={'none'}>

                {state.isSigned ? (
                        <>
                            <Stack.Screen name="TabMenu">
                                {props => <TabMenu {...props} extraProps={state}/>}
                            </Stack.Screen>
                            <Stack.Screen name="Item">
                                {props => <Item {...props} extraProps={state}/>}
                            </Stack.Screen>
                            <Stack.Screen name="Checkout">
                                {props => <Checkout {...props} extraProps={state}/>}
                            </Stack.Screen>
                        </>

                    )
                    :
                    (
                        <>
                            <Stack.Screen name="Login">
                                {props => <Login {...props} extraProps={state}/>}
                            </Stack.Screen>
                        </>
                    )
                }
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigation;