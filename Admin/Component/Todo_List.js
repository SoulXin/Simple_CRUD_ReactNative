import React,{useState,useCallback} from 'react'
import { View, Text } from 'react-native'
import { TextInput, TouchableOpacity, FlatList } from 'react-native-gesture-handler';
import { useFocusEffect } from 'react-navigation-hooks'
import Loading from './Modal_Loading/Loading'
import styles from './Styles'
import axios from 'axios';
import {date,checkUserSignedIn}from '../GlobalFunctions/Functions'

const Todo_List = ({navigation}) => {
    const [text,setText] = useState('');
    const [todo,setTodo] = useState([]);
    const [user_id,setUser_Id] = useState('');
    const [loading,setLoading] = useState(false);

    useFocusEffect(useCallback(() => {
        setLoading(true);
        const source = axios.CancelToken.source();
        checkUserSignedIn(navigation)
        .then(res => {
            setUser_Id(res.user._id)
            const loadData = async () => {
                try{
                    const response = await axios.get(`http://192.168.43.171:5000/todo/show_todo/not_complete/${res.user._id}`,{cancelToken : source.token});
                    setTodo(response.data);
                    setLoading(false);
                }catch (error) {
                    if(axios.isCancel(error)){
                        console.log("Response has been cancel TableList")
                    }else{
                        throw error
                    }
                }
            };
            loadData();
        })
        .catch(err => {
            setLoading(false);
            console.log(err);
        })

        return () => {
            setTodo([]);
            source.cancel();
        }
    },[]));

    const handleAdd = () => {
        const temp_todo = todo;
        setLoading(true);
        const data = {
            user_id : user_id,
            text : text,
            type : "not_complete"
        }
        axios({
            method : 'POST',
            url : 'http://192.168.43.171:5000/todo/add_todo',
            data : data 
        })
        .then(response => {
            temp_todo.push(response.data);
            setText('');
            setLoading(false);
        })
        .catch(error => {
            setLoading(false);
            console.log(error);
        })
    }

    const handleComplete = (id) => {
        const temp_data = todo.filter(list => list._id !== id);
        setLoading(true)
        axios({
            method : 'PUT',
            url : `http://192.168.43.171:5000/todo/complete_todo/${id}`
        })
        .then(response => {
            setTodo(temp_data);
            setLoading(false);
        })
        .catch(error => {
            setLoading(false);
            console.log(error)
        })
    }

    const viewTodo = ({item,index}) => {
        return (
            <View key = {index} style = {styles.row_add}>
                <View style = {styles.flex_child_complete}>
                    <Text>{date(item.date)}</Text>
                    <Text>{item.text}</Text>
                </View>

                <View style = {styles.button_container_complete}>
                    <TouchableOpacity style = {styles.button_complete} onPress = {() => handleComplete(item._id)}>
                        <Text style = {{color : 'white'}}>Selesai</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    };

    return (
        <View style = {styles.container}>
            <Loading loading = {loading} />
            <FlatList
                data = {todo}
                renderItem = {viewTodo}
                keyExtractor = {(item,index) => index.toString()}
            />
            <Text style = {styles.title_add}>Masukan Kegiatan Baru</Text>
            <View style = {styles.row}>
                <View style = {{flex : 3}}>
                    <TextInput
                        style = {styles.text_input_todo}
                        onChangeText = {(e) => setText(e)}
                        value = {text}
                    />
                </View>
                <View style = {styles.container_add}>
                    <TouchableOpacity style = {styles.button_add} onPress = {handleAdd}>
                        <Text style = {{color : 'white'}}>Tambah</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default Todo_List    