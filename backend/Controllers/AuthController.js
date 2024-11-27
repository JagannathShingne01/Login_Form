const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const UserModel = require("../Models/user");
const { message } = require("statuses");

const signup = async(req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await UserModel.findOne({email});
        if(user){
            return res.status(409)
            .json({ message: "User is already exist, You can login", success: false})
        }
        const userModel = new UserModel({name, email, password});
        userModel.password = await bcrypt.hash(password, 10);
        await userModel.save();
        res.status(201)
            .json({
                message: "Signup successfully",
                success: true
            })
    } catch (error) {
        res.status(500)
            .json({
                message: "Internal server error",
                success: false
            })
    }
}

const login = async(req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await UserModel.findOne({email});
        if(!user){
            return res.status(409)
            .json({ message: "Auth Failed email or passwod is wrong", success: false})
        }
       const isPassEqual = await bcrypt.compare(password, user.password)
       if(!isPassEqual){
        return res.status(409)
        .json({ message: "Auth Failed passwod is wrong", success: false})
       }
       const jwToken = jwt.sign(
            {email: user.email, _id: user._id},
            process.env.JWT_SECRET,
            {expiresIn: "24h"}
       )
        res.status(201)
            .json({
                message: "Login successfully",
                success: true,
                jwToken,
                email,
                name: user.name
            })
    } catch (error) {
        res.status(500)
            .json({
                message: "Internal server error",
                success: false
            })
    }
}
module.exports = {
    signup,
    login
}