const users = require('../models/users');

const SignIn = async (req, res) => {
    try{
        const { email, senha } = req.body;

        const user = await users.findOne({email: email, deleted: false})

        if(user && user.password == senha){
            res.status(201).json({sucess: true})
        } else {
            res.status(404).json({sucess: false})
        }
    }catch {
        console.error("Error at SignIn: ", error);
        res.status(404);
    }
}

const SignUp = async (req, res) => {
    try {
        const { email, nome} = req.body;

        const newUser = new users({
            nome: nome,
            email: email,
            password: '123',
            master: false,
            deleted: false
        })

        await newUser.save();
        res.status(201).json(newUser);
    } catch{
        console.error("Error at SignUp: ", error);
        res.status(404)
    }
}

module.exports = { SignIn, SignUp };