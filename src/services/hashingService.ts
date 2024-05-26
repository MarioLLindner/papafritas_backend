import * as bcrypt from 'bcryptjs';

const salt: string = '$2a$08$W59jWcwio1TiLx4A8iRyTO';
export async function generateHash(pw:string):Promise<string> {
    //funcion utilitaria para generar el hash de un string
    const hash = await bcrypt.hash(pw,salt)
    return hash
}
