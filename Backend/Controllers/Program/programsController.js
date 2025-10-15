import Program from '../../Models/Program/programsModel.js'

// Add Program
const addProgram = async (req, res) => {
    const { title, brief, full_description, date, cost, image } = req.body;
    const newProgram = new Program({
        title: title,
        brief: brief,
        full_description: full_description,
        date: date,
        cost: cost,
        image: image
    });
    try {
        const oldProgram = await Program.findOne({ title: title });
        if (oldProgram) {
            return res.status(400).json({ msg: "Program title already exists" });
        }
        await newProgram.save();
        return res.status(201).json({ msg: "Program created successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: error.msg });
    }
};

// Update Program
const updateProgram = async (req, res) => {
    const { programID } = req.params;
    const { title, brief, full_description, date, cost, image, isAvailable } = req.body;
    try {
        const program = await Program.findOne({ programID: programID });
        if (!program) {
            return res.status(404).json({ msg: "Program not found." });
        }
        // Update fields
        if (title !== undefined) program.title = title;
        if (brief !== undefined) program.brief = brief;
        if (full_description !== undefined) program.full_description = full_description;
        if (date !== undefined) program.date = date;
        if (cost !== undefined) program.cost = cost;
        if (image !== undefined) program.image = image;
        if (isAvailable !== undefined) program.isAvailable = isAvailable;
        await program.save();
        return res.status(200).json({ msg: "Program updated successfully." });
    } catch (error) {
        console.error("Update error:", error);
        return res.status(500).json({ msg: "Internal server error." });
    }
};

// Delete Program
const deleteProgram = async (req, res) => {
    const { programID } = req.params;
    try {
        const program = await Program.findOneAndDelete({ programID: programID });
        if (!program) {
            return res.status(404).json({ msg: "Program not found." });
        }
        return res.status(200).json({ msg: "Program deleted successfully." });
    } catch (error) {
        console.error("Delete error:", error);
        return res.status(500).json({ msg: "Internal server error." });
    }
};

// Get All Programs
const getAllPrograms = async (req, res) => {
    try {
        const programs = await Program.find({});
        return res.status(200).json(programs);
    }
    catch (error) {
        console.error("Fetch error:", error);
        return res.status(500).json({ msg: "Internal server error." });
    }
};

// Get Program by ID
const getProgramByID = async (req, res) => {
    const { programID } = req.params;
    try {
        const program = await Program.findOne({ programID: programID });
        if (!program) {
            return res.status(404).json({ msg: "Program not found." });
        }
        return res.status(200).json(program);
    }
    catch (error) {
        console.error("Fetch error:", error);
        return res.status(500).json({ msg: "Internal server error." });
    }
};

export default {
    addProgram,
    updateProgram,
    deleteProgram,
    getAllPrograms,
    getProgramByID
};