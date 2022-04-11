const {Schema, model} = require('mongoose')

const UserSchema = new Schema({
    username: {
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    posts:[{type: Schema.Types.ObjectId,ref:"Post"}]
});

const PostSchema = new Schema({
    title:String,
    body:String,
    user:{type:Schema.Types.ObjectId,ref: "User"}
});

module.exports = mongoose.model('Post', PostSchema)
module.exports = mongoose.model('User', UserSchema)