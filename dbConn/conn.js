const mongoose = require('mongoose');

const conn = mongoose.connect('mongodb://127.0.0.1:27017/task-manager').then((conn)=>{
    console.log('MongoDB connected successfully');
}).catch((err)=>{
    console.log(err.message);
});

module.exports = conn;