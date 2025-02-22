const users = require('../models/users');

const SignIn = async (req, res) => {
    try{
        const { email, senha } = req.body;

        const user = await users.findOne({email: email, deleted: false})

        if(user && user.password == senha){
            console.log('email: '+ email + '\nsenha:' + senha + '\nUser: ' + user)
            res.json({success: true})
        } else {
            console.log('email: '+ email + '\nsenha:' + senha + '\nUser: ' + user)
            res.json({success: false})
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

const Teste = async (req, res) => {
    res.send("API do Ladies of Wisdom está rodando 🚀");
}

module.exports = { SignIn, SignUp, Teste };