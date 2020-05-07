import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import TodoList from '../../Component/Todo_List'
import CompleteTodo from '../../Component/Complete_Todo'

const TodoTopNav = createMaterialTopTabNavigator({
    TodoList : {
        screen : TodoList,
        navigationOptions : {
            title : 'Daftar Kegiatan'
        }
    },
    CompleteTodo : {
        screen : CompleteTodo,
        navigationOptions : {
            title : 'Selesai'
        }
    }
},{
    tabBarOptions : {
        activeTintColor : 'black',
        inactiveTintColor : 'white',
        style : {
            borderTopColor : '#fff',
            shadowColor : '#a1aab8',
            backgroundColor : '#a56cc1',
            height : 50
        }
    }
})

export default TodoTopNav