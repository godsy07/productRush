const User = require("../models/User");

const login = async (req, res) => {
    try {
        const { email, password } = req.body

        const user_email = email.toLowerCase();
        const user = await User.findOne({ email: user_email });
        if (!user) {
            return res.status(400).json({ status: false, message: "Credentials are invalid." })
        }
        // compare password
        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.status(400).json({ status: false, message: "Credentials are invalid." })
        }

        return res.status(200).json({ status: true, token: '', message: 'You have been logged in.' });
    } catch (e) {
        return res.status(500).json({ status: false, message: "Something went wrong in server." });
    }
}

const signUp = async (req, res) => {
    try {
        const { first_name, last_name, email, phone_no, password, confirm_password } = req.body

        const user_email = email.toLowerCase();
        let user = await User.findOne({ email: user_email });
        if (user) {
            return res.status(400).json({ status: false, message: 'Account with this email already exists.' });
        }
        
        user = await User.create({ first_name, last_name, meail: user_email, phone_no, password });

        return res.status(200).json({ status: true, user, message: 'You have been signed up.' });
    } catch (e) {
        return res.status(500).json({ status: false, message: "Something went wrong in server." });
    }
}

module.exports = {
    login,
    signUp,
}