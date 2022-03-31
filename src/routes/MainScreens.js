import React from 'react'

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'

import { FontAwesome5 } from '@expo/vector-icons'

//Screen Imports
import {
    SearchScreen,
    AddRecipeScreen,
    AccountScreen
} from '../screens'

const MainTab = createMaterialBottomTabNavigator()

export function MainTabScreens() {
    return (
        <MainTab.Navigator
            initialRouteName = 'AddRecipe'
            screenOptions = {({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                let iconName;

                switch(route.name) {
                    case 'AddRecipe':
                        iconName = focused
                        ? 'plus-square' : 'plus-square'
                        break

                    case 'Search':
                        iconName = focused
                        ? 'search' : 'search'
                        break
                    
                    case 'Account':
                        iconName = focused
                        ? 'user-circle' : 'user-circle'
                        break
                }
                return <FontAwesome5 name={iconName} size={size} color={color} />

                },
            })}
            tabBarOptions = {{
                labelPosition: 'below-icon',
                activeBackgroundColor: '#222222',
                inactiveBackgroundColor: '#222222',
                inactiveTintColor: '#FFFFFF',
                keyboardHidesTabBar: true
            }}
        >
            <MainTab.Screen name='AddRecipe' component={AddRecipeScreen}/>
            <MainTab.Screen name='Search' component={SearchScreen}/>
            <MainTab.Screen name='Account' component={AccountScreen}/>
        </MainTab.Navigator>
    )
}