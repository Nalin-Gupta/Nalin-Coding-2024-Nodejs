const mongoose = require('mongoose');


const LikeSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now }
});

const commentSchema = new mongoose.Schema({
    text: {type : String , required : true},
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'Profile' },
    likes: [LikeSchema],
    likeCount: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Comment', commentSchema);
