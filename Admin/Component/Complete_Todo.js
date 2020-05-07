import React,{useCallback,useState} from 'react'
import { View, Text,TouchableOpacity,FlatList } from 'react-native'
import { useFocusEffect } from 'react-navigation-hooks'
import { date ,checkUserSignedIn} from '../GlobalFunctions/Functions';
import axios from 'axios';
import Loading from './Modal_Loading/Loading'
import styles from './Styles'

const Complete_Todo = ({navigation}) => {
    const [todo,setTodo] = useState([]);
    const [loading,setLoading] = useState(false);

    useFocusEffect(useCallback(() => {
        setLoading(true);
        const source = axios.CancelToken.source();
        checkUserSignedIn(navigation)
        .then(res => {
            const loadData = async () => {
                try{
                    const response = await axios.get(`http://192.168.43.171:5000/todo/show_todo/complete/${res.user._id}`,{cancelToken : source.token});
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

    const handleDelete = (id) => {
        const temp_data = todo.filter(list => list._id !== id);
        setLoading(true);

        axios({
            method : 'DELETE',
            url : `http://192.168.43.171:5000/todo/delete_todo/${id}`
        })
        .then(response => {
            setTodo(temp_data)
            setLoading(false);
        })
        .catch(error => {
            setLoading(false);
        })
    }

    const viewNotification = ({item,index}) => {
        return (
            <View key = {index} style = {styles.row_add}>
                <View style = {{flex : 3,justifyContent : 'center'}}>
                    <Text>{date(item.date)}</Text>
                    <Text style = {{fontSize : 18}}>{item.text}</Text>
                </View>

                <View style = {styles.button_container_delete}>
                    <TouchableOpacity style = {styles.button_delete} onPress = {() => handleDelete(item._id)}>
                        <Text style = {{color : 'white'}}>Hapus</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    };
    return (
        <View style = {styles.container}>
            <Loading loading = {loading} />
            <Text style = {styles.title}>Kegiatan Yang Selesai di Lakukan</Text>
            <FlatList
                data = {todo}
                renderItem = {viewNotification}
                keyExtractor = {(item,index) => index.toString()}
            />
        </View>
    )
}

export default Complete_Todo