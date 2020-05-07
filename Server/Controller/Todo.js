const Todo = require('../Model/Todo')

process.env.SECRET_KEY = 'secret'

exports.add_todo = (req,res) => {
    // Create New Todo
    const {user_id,text,type} = req.body;
    Todo.create({
        user_id : user_id,
        text : text,
        type : type
    })
    .then(response => {
        res.json(response)
    })
    .catch(error => {
        res.json(error)
    })
}

exports.todo_list = (req,res) => {
    var {type,user_id} = req.params;
    Todo.find({
        type : type,
        user_id : user_id
    })
    .then(response => {
        res.json(response)
    })
    .catch(error => {
        res.json(error)
    })
}

exports.complete_todo = async (req,res) => {
    var {id} = req.params;

    try{
        const update_complete = await Todo.findByIdAndUpdate(id,{$set : {type : "complete"}})
        const update_date = await Todo.findByIdAndUpdate(update_complete._id, {$set : {date : Date.now}})
        res.json({update_date})
    }catch(error){
        res.json(error)
    }
}

exports.delete_todo = (req,res) => {
    var {id} = req.params;

    Todo.findByIdAndDelete(id)
    .then(response => {
        res.json(response)
    })
    .catch(error => {
        res.json(error)
    })
}