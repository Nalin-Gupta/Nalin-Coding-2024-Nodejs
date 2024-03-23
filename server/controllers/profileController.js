const Profile = require("../models/Profile");

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

exports.getAllProfiles = async (req , res) => {
    try {
        const profiles = await Profile.find();
        res.render('profile_template', {
          profile: profiles.length ? profiles[0] : [],
        });
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch profiles" });
    }
}
