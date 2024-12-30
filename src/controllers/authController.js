const mainController = {};
const bcrypt = require('bcryptjs')

const { PrismaClient } = require ("@prisma/client");
const { Public } = require('@prisma/client/runtime/library');
const prisma = new PrismaClient();

 mainController.register = async (req, res) => {

    const {username, email, password_hash, role} = req.body;
    password =  await hashPassword(password_hash)
    console.log(username, email, password_hash, role);
    const user = await prisma.users.create({data:{
        username: username,
        email: email,
        password_hash: password,
        role_id:12
    }})
    
    return res.json({
        message: 'This is a full stack app!',
        data: user,
    });
};


async function hashPassword(password) {
    const salt = await bcrypt.genSalt(10)
    password = await bcrypt.hash(password, salt)
    console.log(password);
    return password;
}
  

module.exports = mainController;