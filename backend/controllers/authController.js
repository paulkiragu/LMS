const User = require('../models/User');
const JWT = require('jsonwebtoken');
const bcrypt = require('bcryptjs')

const generateToken = (userId) => {
    return JWT.sign({ id: userId }, process.env.JWT_SECRET,{
        expiresIn: '1d'
    });
};

exports.registerUser = async (req,res) =>{
    try {
        const { name, email, password, role } = req.body;

        const userexists = await User.findOne({ email });
        if(userexists) {
            return res.status(400).json({ message:"user already exists " });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User ({ 
            name, 
            email,
            password:hashedPassword,
            role })
        await newUser.save()

        const token = generateToken(newUser._id);

        res.status(201).json({
            _id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            role: newUser.role,
            token
        });
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: "server error" });
    }

}

  exports.loginUser = async (req,res) => {
        try {
            const {  email, password} = req.body;
            const user = await User.findOne({ email });

            if(!user ){
                return res.status(401).json({message: 'No user found try register'})
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if(!isMatch){
                return res.status(401).json({ message: "invalid password" })
            }

            const token = generateToken(user._id);
            res.status(200).json({
                _id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                token
            })
        } catch (error) {
            console.error(error);
            res.status(400).json({ message: "server error" });
        }
    }
