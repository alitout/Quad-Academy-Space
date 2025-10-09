import bcrypt from 'bcrypt';

const hashPassword = async (plainPassword) => {
    const saltRounds = 10;
    return await bcrypt.hash(plainPassword, saltRounds);
};
export default hashPassword;