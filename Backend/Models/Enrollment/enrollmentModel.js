import mongoose from "mongoose";

const EnrollmentSchema = new mongoose.Schema({
    enrollmentID: {
        type: String,
        unique: true
    },
    userID: {
        type: String,
        required: true
    },
    programID: {
        type: String,
        default: null
    },
    masterClassID: {
        type: String,
        default: null
    },
    enrollmentDate: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['active', 'completed', 'dropped'],
        default: 'active'
    }
});

// Pre-save hook must be defined BEFORE model creation
EnrollmentSchema.pre('save', async function (next) {
    if (!this.enrollmentID) {
        if (!this.userID) return next(new Error("userID is required to generate enrollmentID"));
        if (!this.programID && !this.masterClassID) return next(new Error("programID or masterClassID is required"));

        const date = this.enrollmentDate ? new Date(this.enrollmentDate) : new Date();
        const yyyy = date.getFullYear();
        const mm = String(date.getMonth() + 1).padStart(2, "0");
        const dd = String(date.getDate()).padStart(2, "0");
        const dateStr = `${yyyy}${mm}${dd}`;

        const contentID = this.programID || this.masterClassID;

        const startOfDay = new Date(yyyy, date.getMonth(), date.getDate());
        const endOfDay = new Date(startOfDay);
        endOfDay.setDate(endOfDay.getDate() + 1);

        const count = await Enrollment.countDocuments({
            userID: this.userID,
            enrollmentDate: { $gte: startOfDay, $lt: endOfDay }
        });

        const seq = String(count + 1).padStart(3, "0");
        this.enrollmentID = `${this.userID}_${contentID}_${dateStr}_${seq}`;
    }
    next();
});

const Enrollment = mongoose.model("Enrollment", EnrollmentSchema);

export default Enrollment;