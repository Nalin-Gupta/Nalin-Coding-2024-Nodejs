const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  mbti: {
    type: String,
    enum: ["ISFJ", "ISTJ"],
    required: true,
  },
  enneagram: {
    type: String,
    enum: ["9w3", "1w2"],
    required: true,
  },
  variant: {
    type: String,
    enum: ["sp/so", "sp/sx"],
    required: true,
  },
  tritype: {
    type: Number,
    required: true,
  },
  socionics: {
    type: String,
    required: true,
  },
  sloan: {
    type: String,
    enum: ["RCOEN", "RLOIN"],
    required: true,
  },
  psyche: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: false,
    default : "https://soulverse.boo.world/images/1.png"
  },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
});

const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;
