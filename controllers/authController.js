import { comparePassword, hashPassword } from '../helpers/authHelper.js';
import userModel from '../models/userModel.js';
import JWT from 'jsonwebtoken';

export const registerController = async (req, res) => {
    try {
        const { name, email, password, phone, address, question } = req.body;
        //validations 
        if (!name) {
            return res.send({ message: "Name is Required" });
        }
        if (!email) {
            return res.send({ message: "Email is Required" });
        }
        if (!password) {
            return res.send({ message: "Password is Required" });
        }
        if (!phone) {
            return res.send({ message: "Phone is Required" });
        }
        if (!address) {
            return res.send({ message: "Address is Required" });
        }
        if (!question) {
            return res.send({ message: "Answer is Required" });
        }


        //check existing user 
        const existinguser = await userModel.findOne({ email });

        if (existinguser) {
            return res.status(200).send({
                success: false,
                message: "Already Register please login",
            });
        }
        //register user
        const hashedPassword = await hashPassword(password);
        //save 
        const user = new userModel({
            name,
            email,
            phone,
            address,
            password: hashedPassword,
            question
        }).save();
        res.status(201).send({
            success: true,
            message: "User Register Successfully",
            user,
        })
    } catch (err) {
        console.log(err);
        res.status(500).send({
            success: false,
            message: "Error in Register",
            err
        })
    }
};



export const loginController = async (req, res) => {
    try {

        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(404).send({
                success: false,
                message: "Invalid email or password"
            });
        }
        //check user;

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "Email is not registerd"
            })
        }
        const match = await comparePassword(password, user.password);
        if (!match) {
            return res.status(200).send({
                success: false,
                message: "Invalid Password"
            });
        }

        // Token 
        const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET);
        res.status(200).send({
            success: true,
            message: "login successfully",
            user: {
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
                role: user.role
            },
            token,
        });

    } catch (err) {
        console.log(err);
        res.status(500).send({
            success: false,
            message: "Error in Login ",
            err
        });
    }
}


// forgotPassword

export const forgotPasswordController = async (req, res) => {
    try {
        const { email, question, newpassword } = req.body;
        if (!email) {
            res.status(400).send({ message: 'Email is required' });
        }
        if (!question) {
            res.status(400).send({ message: 'Answer is required' });
        }
        if (!newpassword) {
            res.status(400).send({ message: 'New Password is required' });
        }

        //check

        const user = await userModel.findOne({ email, question });

        if (!user) {
            res.status(404).send({
                success: false,
                message: "Wrong Email or Answer"
            })
        }
        const hashed = await hashPassword(newpassword);
        await userModel.findByIdAndUpdate(user._id, { password: hashed });
        res.status(200).send({
            success: true,
            message: "Password Reset Successfully"
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Something went wrong',
            error
        })
    }
}

export const testController = async (req, res) => {
    res.send("protected route");
}


export const updateProfileController = async (req, res) => {
    try {
        const { name,  password, address, phone } = req.body;
        const user = await userModel.findById(req.user._id);

        if (password && password.length < 6) {
            return res.json({ error: "Password is required and 6 character long" });
        };
        const hashedPassword = password ? await hashPassword(password) : undefined;
        const updatedUser = await userModel.findByIdAndUpdate(req.user._id, {
            name: name || user.name,
            password: hashedPassword || user.password,
            phone: phone || user.phone,
            address: address || user.address
        }, { new: true });

        res.status(200).send({
            success: true,
            message:"Profle Updated SuccessFully ...",
            updatedUser
        });
    } catch (error) {
        console.log(error);
        ree.status(400).send({
            success: true,
            message: "Error while updating the profile",
            error
        });
    };
};