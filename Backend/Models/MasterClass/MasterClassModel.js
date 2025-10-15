import mongoose from 'mongoose';

const MasterClassSchema = new mongoose.Schema({
    masterClassID: {
        type: String,
        unique: true
    },
    title: {
        type: String,
        required: true,
        unique: true
    },
    brief: {
        type: String,
        required: true
    },
    full_description: {
        type: String,
        required: true
    },
    key_takeaways: {
        type: [String],
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    level: {
        type: String,
        required: true
    },
    idealFor: {
        type: [String],
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    cost: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    isAvailable: {
        type: Boolean,
        required: true,
        default: true
    }
})

MasterClassSchema.pre('save', async function (next) {
    if (this.isNew && !this.masterClassID) {
        const lastMasterClass = await mongoose.model('MasterClass').findOne({}, {}, { sort: { masterClassID: -1 } });
        let nextID = 1;
        if (lastMasterClass && lastMasterClass.masterClassID) {
            const match = lastMasterClass.masterClassID.match(/^MC(\d+)$/);
            if (match) {
                nextID = parseInt(match[1]) + 1;
            }
        }
        this.masterClassID = `MC${nextID}`;
    }
    next();
})

const MasterClass = mongoose.model('MasterClass', MasterClassSchema);
export default MasterClass;
