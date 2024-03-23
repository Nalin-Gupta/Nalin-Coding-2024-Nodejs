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
    enum: ["ISFJ", "ISTJ", "ISFP", "ISTP", "INFJ", "INFP", "ENFJ", "ENTJ", "ENFP", "ENTP", "ESFJ", "ESTJ", "ESFP", "ESTP", "INFJ", "INFP", "ENFJ", "ENTJ", "ENFP", "ENTP", "ESFJ", "ESTJ", "ESFP", "ESTP"],
    required: true,
  },
  enneagram: {
    type: String,
    enum: ["9w3", "1w2", "1w3", "1w4", "1w5", "1w6", "2w3", "2w4", "2w5", "2w6", "3w4", "3w5", "3w6", "4w5", "4w6", "5w6"],
    required: true,
  },
  variant: {
    type: String,
    enum: ["sp/so", "sp/sx", "sp/se", "sp/sf", "so/sx", "so/se", "so/sf", "sx/se", "sx/sf", "se/sf"],
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
    enum: ["RCOEN", "RLOIN", "RLOEN", "RCOIN"],
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
