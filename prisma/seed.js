const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient();

async function hashPassword(password) {
    const salt = await bcrypt.genSalt(10)
    password = await bcrypt.hash(password, salt)
    return password;
}
  

async function main() {

    //   Insert dummy roles
  await prisma.roles.createMany({
    data: [
      { role_name: "admin", }, 
      { role_name: "user", },
    ],
  });
  // hashed password which will encrypt will be 'password' for both user.
  password =  await hashPassword('Password')
  // Insert dummy users
  await prisma.users.createMany({
    data: [
      { username: "Alice", email: "alice@example.com", password_hash: password, role_id: 1  },
      { username: "Bob", email: "bob@example.com", password_hash: password, role_id: 2},
    ],
  });

  console.log("Dummy data seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });