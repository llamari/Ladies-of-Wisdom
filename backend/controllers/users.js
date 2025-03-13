const users = require('../models/users');
const jwt = require('jsonwebtoken');
require("dotenv").config();
const bcrypt = require('bcryptjs');
const NodeMailer = require("nodemailer");

async function sendEmailWithPassword(email, subject, text) {
    try {
        const transporter = NodeMailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false, // Necessário para TLS
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
            tls: {
                rejectUnauthorized: false, // Ignorar certificados autoassinados
            },
        });

        await transporter.verify();
        console.log("Servidor de e-mail pronto para enviar mensagens!");

        const info = await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: subject,
            text: text,
        });

        console.log("E-mail enviado com sucesso:", info.response);
        return info;
    } catch (error) {
        console.error("Erro ao enviar e-mail:", error);
    }
}

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

        const valid = await bcrypt.compare(senha, user.password);

        if(valid){
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

        function gerarPassword() {
            return Math.random().toString(36).slice(-10);
        }

        const senha = Array.apply(null, Array(1)).map(gerarPassword);
        const hashed = await bcrypt.hash(senha[0], 10);

        const newUser = new users({
            nome: nome,
            email: email,
            password: hashed,
            master: false,
            deleted: false
        })

        await newUser.save();

        sendEmailWithPassword(email, 'Conta criada no site do Ladies Of Wisdom', `Olá ${nome}!\nCriaram para você uma conta no site do projeto Ladies Of Wisdom. \n\nSua senha de acesso é ${senha}. \n\nPara sua segurança, aconselhamos que troque a senha no primeiro acesso.`);
        res.status(201).json(newUser);
    } catch(error){
        console.error("Error at SignUp: ", error);
        res.status(404)
    }
}

const Teste = async (req, res) => {
    res.send("API do Ladies of Wisdom está rodando 🚀");
}

const Master = async (req, res) => {
    try {
        const token = req.header('Authorization')?.split(' ')[1]; 

        if (!token) {
            console.log("Acesso negado, token não encontrado");
            return res.status(401).json({ message: "Acesso negado, token não encontrado." });
        }

        console.log("Token recebido:", token);
        const valid = jwt.verify(token, process.env.JWT_SECRET);
        const userId = valid.master;

        const user = await users.findById(valid.id); // Adicionando await

        if (!user) {
            return res.status(404).json({ message: "Usuário não encontrado." });
        }
        console.log(user.nome);

        res.json({ master: userId, name: user.nome }); // Retornando um objeto JSON válido
    } catch (error) {
        console.error("Erro na autenticação:", error.message);
        return res.status(500).json({ message: "Erro interno do servidor." });
    }
};

const Delete = async (req, res) => {
    const {email} = req.body;
    await users.updateOne({ email: email }, { $set: { deleted: true } });
    res.json(201)
}

const ForgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        console.log("E-mail recebido: ", email);
        const user = await users.findOne({email: email});
        if (!user) {
            console.log("Não encontrei um usuário com esse e-mail");
            return res.status(404).json({message: "Usuário não encontrado"});  
        } 
        const nome = user.nome
        var code = Math.floor(1000 + Math.random() * 9000);
        await users.updateOne({ email: email }, { $set: { code: code } });

        console.log(user, nome, code);
        sendEmailWithPassword(email, 'Clique aqui para mudar sua senha!', `Olá ${nome}!\nPara alterar sua senha no site do Ladies Of Wisdom, insira o código abaixo para confirmar sua identidade: \n${code}`,);
        res.status(201).json({message: "E-mail enviado"});
    } catch (error) {
        console.error("Erro ao enviar e-mail para alterar senha: ", error);
        return res.status(500).json({ message: "Erro ao processar a requisição" });
    }
}

const Verify = async (req, res) => {
    try {
        const { code, email } = req.body;
        const user = await users.findOne({email: email});
        if (!user) {
            console.log("Usuário não encontrado");
            return res.status(404).json({message: "Usuário não encontrado", success: false})
        }
        if (user.code == code) {
            await users.updateOne({ email: email }, { $unset: { code: "" } });
            return res.status(202).json({message: "Usuário verificado", success: true})
        }
        console.log(user, user.code, code);
        console.log("Código errado")
        return res.status(403).json({message: "Código invalido", success: false})
    } catch (error) {
        console.error("Erro ao verificar codigo: ", error)
        return res.status(500).json({ message: "Erro ao processar a requisição" });
    }
}

const NewPassword = async (req, res) => {
    try {
        const { senha, email } = req.body;
        if (!senha || !email) return res.status(400).send("Missing essential information");
        const hashed = await bcrypt.hash(senha, 10);
        await users.findOneAndUpdate({email: email}, {password: hashed});
        res.status(201).json({success: true});
    } catch (error) {
        console.error(`Erro ao trocar senha do usuário ${email}: `, error)
        return res.status(500).json({ message: "Erro ao processar a requisição" });
    }
}

module.exports = { SignIn, SignUp, Teste, Master, GetUsers, Delete, ForgotPassword, Verify, NewPassword };