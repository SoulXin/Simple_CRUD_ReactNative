import {StyleSheet} from 'react-native'

const styles = StyleSheet.create({
    container : {
        flex : 1,
        margin : 10
    },
    title : {
        textAlign : 'center',
        fontWeight : 'bold',
        fontSize : 24
    },
    row : {
        flexDirection : 'row'
    },
    container_add : {
        flex : 1,
        justifyContent : 'center',
        alignItems : 'center'
    },
    button_add : {
        backgroundColor : '#17b978',
        padding : 10,
        borderRadius : 5
    },
    row_add : {
        flexDirection : 'row',
        borderWidth : 1,
        borderRadius : 5,
        marginBottom : 5,
        marginTop : 5,
        padding : 10
    },
    flex_child_complete : {
        flex : 3,
        justifyContent : 'center'
    },
    button_container_complete : {
        flex : 1,
        justifyContent : 'center',
        alignItems : 'center'
    },
    button_complete : {
        backgroundColor : '#17b978',
        padding : 10,
        borderRadius : 5
    },
    button_container_delete : {
        flex : 1,
        justifyContent : 'center',
        alignItems : 'center'
    },
    button_delete : {
        backgroundColor : '#ff9999',
        padding : 10,
        borderRadius : 5
    },
    text_input_todo : {
        borderWidth : 1,
        borderRadius : 5,
        padding : 10,
        fontSize : 16
    }
});

export default styles;