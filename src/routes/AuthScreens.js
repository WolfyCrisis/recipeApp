import React from 'react'

import { createStackNavigator } from '@react-navigation/stack'

//Screen Imports
import {
    SplashScreen,
    LoginScreen,
    RegisterScreen,
} from '../screens'

import { MainTabScreens } from './MainScreens'

const AuthStack = createStackNavigator()

export function AuthStackScreens() {
    return (
        <AuthStack.Navigator
            initialRouteName = 'SplashScreen'
            screenOptions={{ headerShown: false }}
        >
            <AuthStack.Screen name='Splash' component={SplashScreen}/>
            <AuthStack.Screen name='Login' component={LoginScreen}/>
            <AuthStack.Screen name='Register' component={RegisterScreen}/>
            <AuthStack.Screen name='MainTab' component={MainTabScreens}/>
        </AuthStack.Navigator>
    )
}