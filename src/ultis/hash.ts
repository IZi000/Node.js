import * as bcrypt from 'bcrypt';

async function hashPassword(password: string) {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    console.log("Contraseña hasheada:", hashedPassword);
}

hashPassword("miPassword123");
