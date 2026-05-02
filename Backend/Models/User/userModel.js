import mongoose from 'mongoose';

const emailRegex = /^[a-zA-Z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

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
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        match: [emailRegex, 'Please fill a valid email address']
    },
    fullName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    enrolledPrograms: {
        type: [String],
        default: []
    },
    enrolledMasterClasses: {
        type: [String],
        default: []
    }
});

UserSchema.pre('save', async function (next) {
    if (this.isNew && !this.userID) {
        const prefix = 'USER';
        // find all userIDs with the same prefix and extract numeric parts to determine the next number
        const users = await mongoose.model('User').find({ userID: { $regex: `^${prefix}\\d+$` } }).select('userID').lean();
        let maxNum = 0;
        const re = new RegExp(`^${prefix}(\\d+)$`);
        for (const u of users) {
        const m = u.userID.match(re);
        if (m) {
            const n = parseInt(m[1], 10);
            if (!Number.isNaN(n) && n > maxNum) maxNum = n;
        }
        }
        const nextID = maxNum + 1;
        this.userID = `${prefix}${nextID.toString().padStart(2, '0')}`;
    }
});

const User = mongoose.model('User', UserSchema);
export default User;