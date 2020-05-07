import React from 'react'
import TodoTopNav from './Todo'
import UserStack from './User'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import Icon from 'react-native-vector-icons/FontAwesome5'

const BottomTab = createBottomTabNavigator({
    Todo : {
        screen : TodoTopNav,
        navigationOptions : {
            tabBarLabel : 'Kegiatan',
            tabBarIcon : ({tintColor}) => (
                <Icon name = "home" color = {tintColor} size = {28}/>
            )
        }
    },
    User : {
        screen : UserStack,
        navigationOptions : {
            tabBarLabel : 'Akun',
            tabBarIcon : ({tintColor}) => (
                <Icon name = "user-alt" color = {tintColor} size = {28}/>
            )
        }
    }
}, {
    tabBarOptions : {
        activeTintColor : 'black',
        inactiveTintColor : 'white',
        style : {
            paddingTop : 5,
            borderTopColor : '#fff',
            shadowColor : '#a1aab8',
            backgroundColor : '#a56cc1',
            height : 50
        }
    }
})

export default BottomTab