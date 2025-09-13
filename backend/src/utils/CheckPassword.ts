import bcrypt from "bcrypt";

export function CheckPassword(password: string, hashedPassword: string) {
    return bcrypt.compare(password, hashedPassword);
}
