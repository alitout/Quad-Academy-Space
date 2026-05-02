import Enrollment from "../../Models/Enrollment/enrollmentModel.js";
import User from "../../Models/User/userModel.js";
import Program from "../../Models/Program/programsModel.js";
import MasterClass from "../../Models/MasterClass/MasterClassModel.js";

// Enroll user in a Program
const enrollInProgram = async (req, res) => {
    const { programID } = req.body;
    const userID = req.user.userID;

    if (!programID) {
        return res.status(400).json({ msg: "programID is required" });
    }

    try {
        const user = await User.findOne({ userID });
        const program = await Program.findOne({ programID });

        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }
        if (!program) {
            return res.status(404).json({ msg: "Program not found" });
        }

        // Check if already enrolled
        if (user.enrolledPrograms.includes(programID)) {
            return res.status(400).json({ msg: "User already enrolled in this program" });
        }

        // Add enrollment
        user.enrolledPrograms.push(programID);
        program.enrolledUsers.push(userID);

        await user.save();
        await program.save();

        return res.status(201).json({ msg: "Successfully enrolled in program" });
    } catch (error) {
        console.error("Enroll in program error:", error);
        return res.status(500).json({ msg: "Internal server error" });
    }
};

// Unenroll user from a Program
const unenrollFromProgram = async (req, res) => {
    const { programID } = req.body;
    const userID = req.user.userID;

    if (!programID) {
        return res.status(400).json({ msg: "programID is required" });
    }

    try {
        const user = await User.findOne({ userID });
        const program = await Program.findOne({ programID });

        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }
        if (!program) {
            return res.status(404).json({ msg: "Program not found" });
        }

        // Check if enrolled
        if (!user.enrolledPrograms.includes(programID)) {
            return res.status(400).json({ msg: "User not enrolled in this program" });
        }

        // Remove enrollment
        user.enrolledPrograms = user.enrolledPrograms.filter(id => id !== programID);
        program.enrolledUsers = program.enrolledUsers.filter(id => id !== userID);

        await user.save();
        await program.save();

        return res.status(200).json({ msg: "Successfully unenrolled from program" });
    } catch (error) {
        console.error("Unenroll from program error:", error);
        return res.status(500).json({ msg: "Internal server error" });
    }
};

// Enroll user in a MasterClass
const enrollInMasterClass = async (req, res) => {
    const { masterClassID } = req.body;
    const userID = req.user.userID;

    if (!masterClassID) {
        return res.status(400).json({ msg: "masterClassID is required" });
    }

    try {
        const user = await User.findOne({ userID });
        const masterClass = await MasterClass.findOne({ masterClassID });

        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }
        if (!masterClass) {
            return res.status(404).json({ msg: "MasterClass not found" });
        }

        // Check if already enrolled
        if (user.enrolledMasterClasses.includes(masterClassID)) {
            return res.status(400).json({ msg: "User already enrolled in this master class" });
        }

        // Add enrollment
        user.enrolledMasterClasses.push(masterClassID);
        masterClass.enrolledUsers.push(userID);

        await user.save();
        await masterClass.save();

        return res.status(201).json({ msg: "Successfully enrolled in master class" });
    } catch (error) {
        console.error("Enroll in master class error:", error);
        return res.status(500).json({ msg: "Internal server error" });
    }
};

// Unenroll user from a MasterClass
const unenrollFromMasterClass = async (req, res) => {
    const { masterClassID } = req.body;
    const userID = req.user.userID;

    if (!masterClassID) {
        return res.status(400).json({ msg: "masterClassID is required" });
    }

    try {
        const user = await User.findOne({ userID });
        const masterClass = await MasterClass.findOne({ masterClassID });

        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }
        if (!masterClass) {
            return res.status(404).json({ msg: "MasterClass not found" });
        }

        // Check if enrolled
        if (!user.enrolledMasterClasses.includes(masterClassID)) {
            return res.status(400).json({ msg: "User not enrolled in this master class" });
        }

        // Remove enrollment
        user.enrolledMasterClasses = user.enrolledMasterClasses.filter(id => id !== masterClassID);
        masterClass.enrolledUsers = masterClass.enrolledUsers.filter(id => id !== userID);

        await user.save();
        await masterClass.save();

        return res.status(200).json({ msg: "Successfully unenrolled from master class" });
    } catch (error) {
        console.error("Unenroll from master class error:", error);
        return res.status(500).json({ msg: "Internal server error" });
    }
};

// Get enrollments for a user
const getUserEnrollments = async (req, res) => {
    const userID = req.user.userID;

    try {
        const user = await User.findOne({ userID });

        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }

        const programs = await Program.find({ programID: { $in: user.enrolledPrograms } });
        const masterClasses = await MasterClass.find({ masterClassID: { $in: user.enrolledMasterClasses } });

        return res.status(200).json({ programs, masterClasses });
    } catch (error) {
        console.error("Get user enrollments error:", error);
        return res.status(500).json({ msg: "Internal server error" });
    }
};

export default {
    enrollInProgram,
    unenrollFromProgram,
    enrollInMasterClass,
    unenrollFromMasterClass,
    getUserEnrollments,
};