const Profile = require("../models/Profile");
//Mock Data -
const profiles = [
  {
    id: 1,
    name: "A Martinez",
    description: "Adolph Larrue Martinez III.",
    mbti: "ISFJ",
    enneagram: "9w3",
    variant: "sp/so",
    tritype: 725,
    socionics: "SEE",
    sloan: "RCOEN",
    psyche: "FEVL",
    image: "https://soulverse.boo.world/images/1.png",
  },
];


exports.createProfile = async (req, res) => {
  try {
    const { name, description, mbti, enneagram , variant , tritype , socionics , sloan , psyche , image } = req.body;
    const profile = new Profile({ name, description, mbti, enneagram , variant , tritype , socionics , sloan , psyche , image });
    await profile.save();
    const uniqueId = profile._id;
    res.status(201).json({_id: uniqueId, ...profile.toJSON()});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create profile" });
  }
};

exports.getProfileById = async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.id);
    if (!profile) {
      return res.status(404).json({ error: "Profile not found" });
    }
    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch profile" });
  }
};
