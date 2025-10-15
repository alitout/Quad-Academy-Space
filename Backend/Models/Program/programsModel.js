import mongoose from 'mongoose';

const ProgramSchema = new mongoose.Schema({
    programID: {
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

ProgramSchema.pre('save', async function (next) {
    if (this.isNew && !this.programID) {
        const lastProgram = await mongoose.model('Program').findOne({}, {}, { sort: { programID: -1 } });
        let nextID = 1;
        if (lastProgram && lastProgram.programID) {
            const match = lastProgram.programID.match(/^PROG(\d+)$/);
            if (match) {
                nextID = parseInt(match[1], 10) + 1;
            }
        }
        this.programID = `PROG${nextID.toString().padStart(2, '0')}`;
    }
    next();
});

const Program = mongoose.model('Program', ProgramSchema);
export default Program;