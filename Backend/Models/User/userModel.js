import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    userID: {
        type: String,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
});

UserSchema.pre('save', async function (next) {
    if (this.isNew && !this.userID) {
        const lastUser = await mongoose.model('User').findOne({}, {}, { sort: { userID: -1 } });
        let nextID = 1;
        if (lastUser && lastUser.userID) {
            const match = lastUser.userID.match(/^USER(\d+)$/);
            if (match) {
                nextID = parseInt(match[1], 10) + 1;
            }
        }
        this.userID = `USER${nextID.toString().padStart(2, '0')}`;
    }
    next();
});

const User = mongoose.model('User', UserSchema);
export default User;