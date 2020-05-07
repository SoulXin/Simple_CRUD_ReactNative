import User from '../../Component/User/Index';
import {createStackNavigator} from 'react-navigation-stack'

const UserStack = createStackNavigator({
    User : {
        screen : User,
        navigationOptions : () => {
            return {
                headerShown: false

            }
        },
    }
})

export default UserStack