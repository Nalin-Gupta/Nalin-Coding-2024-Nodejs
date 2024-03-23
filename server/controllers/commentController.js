const Comment = require('../models/Comment');
const Profile = require('../models/Profile');

exports.createComment = async (req, res) => {
    try {
        const { name, text, profileName } = req.body;
        const authorProfile = await Profile.findOne({ name });
        const targetProfile = await Profile.findOne({ name: profileName });
        if (!authorProfile) {
            return res.status(404).json({ error: 'Author profile not found' });
        }
        if (!targetProfile) {
            return res.status(404).json({ error: 'Target profile not found' });
        }
        const comment = new Comment({ text, author: authorProfile._id });
        await comment.save();
        targetProfile.comments.push(comment._id);
        await targetProfile.save();
        res.status(201).json(comment);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create comment' });
    }
};


exports.getCommentsByProfile = async (req, res) => {
    try {
        const { profileName } = req.params;
        const targetProfile = await Profile.findOne({ name: profileName }).populate('comments');

        if (!targetProfile) {
            return res.status(404).json({ error: 'Profile not found' });
        }

        // Sort comments by most recent or number of likes (example sorting by date)
        const sortedComments = targetProfile.comments.sort((a, b) => b.createdAt - a.createdAt);

        res.status(200).json(sortedComments);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch comments' });
    }
};

exports.likeComment = async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);
        if (!comment) {
            return res.status(404).json({ error: 'Comment not found' });
        }
        comment.likes += 1;
        await comment.save();
        res.status(200).json(comment);
    } catch (error) {
        res.status(500).json({ error: 'Failed to like comment' });
    }
};
