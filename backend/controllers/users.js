const users = require('../models/users');
const jwt = require('jsonwebtoken');

const GetUsers = async (req, res) => {
    try {
        const allUsers = await users.find({deleted: false}); // Corrigido
        console.log(allUsers);
        res.json(allUsers);
    } catch (error) {
        console.error("Erro ao pegar usuários: ", error);
        res.status(500).json({ error: "Erro ao buscar usuários" }); // Adicionei um status de erro
    }
};

const SignIn = async (req, res) => {
    try{
        const { email, senha } = req.body;

        const user = await users.findOne({email: email, deleted: false})

        if(user && user.password == senha){
            console.log('email: '+ email + '\nsenha:' + senha + '\nUser: ' + user)
            const token = jwt.sign({ id: user._id, master: user.master }, process.env.JWT_SECRET, { expiresIn: '24h' });
            console.log(token);
            res.json({success: true, token})
        } else {
            res.json({success: false})
        }
    }catch(error) {
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

const Master = async (req, res) => {
    const token = req.header('Authorization')?.split(' ')[1]; 
    
    if (!token) {
        console.log("Acesso negado, token não encontrado");
        return res.status(401).json({ message: "Acesso negado, token não encontrado." });
    }
    console.log("Token recebido:", token);
    const valid = jwt.verify(token, process.env.JWT_SECRET);
    const userId = valid.master;
    res.json(userId);
}

const Delete = async (req, res) => {
    const {email} = req.body;
    await users.updateOne({ email: email }, { $set: { deleted: true } });
    res.json(201)
}

module.exports = { SignIn, SignUp, Teste, Master, GetUsers, Delete };