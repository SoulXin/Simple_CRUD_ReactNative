const mongoose = require("../Database/db");

const todoSchema = {
    user_id : {
        type : String,
        required : true
    },
    date : {
        type : Date,
        required : true,
        default: Date.now
    },
    text : {
        type : String,
        required : true
    },
    type : {
        type : String,
        required : true
    }
};

const Todo = mongoose.model("todo", todoSchema);

module.exports = Todo;