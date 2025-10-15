import MasterClass from "../../Models/MasterClass/MasterClassModel.js";

// Add MasterClass
const addMasterClass = async (req, res) => {
    const { title, brief, full_description, key_takeaways, duration, level, idealFor, date, cost, image } = req.body;
    const newMasterClass = new MasterClass({
        title: title,
        brief: brief,
        full_description: full_description,
        key_takeaways: key_takeaways,
        duration: duration,
        level: level,
        idealFor: idealFor,
        date: date,
        cost: cost,
        image: image
    });
    try {
        const oldMasterClass = await MasterClass.findOne({ title: title });
        if (oldMasterClass) {
            return res.status(400).json({ msg: "MasterClass title already exists" });
        }
        await newMasterClass.save();
        return res.status(201).json({ msg: "MasterClass created successfully" });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ msg: error.msg });
    }
};

// Update MasterClass
const updateMasterClass = async (req, res) => {
    const { masterClassID } = req.params;
    const { title, brief, full_description, key_takeaways, duration, level, idealFor, date, cost, image, isAvailable } = req.body;
    try {
        const masterClass = await MasterClass.findOne({ masterClassID: masterClassID });
        if (!masterClass) {
            return res.status(404).json({ msg: "MasterClass not found" });
        }

        if (title) masterClass.title = title;
        if (brief) masterClass.brief = brief;
        if (full_description) masterClass.full_description = full_description;
        if (key_takeaways) masterClass.key_takeaways = key_takeaways;
        if (duration) masterClass.duration = duration;
        if (level) masterClass.level = level;
        if (idealFor) masterClass.idealFor = idealFor;
        if (date) masterClass.date = date;
        if (cost) masterClass.cost = cost;
        if (image) masterClass.image = image;
        if (isAvailable) masterClass.isAvailable = isAvailable;
        await masterClass.save();
        return res.status(200).json({ msg: "MasterClass updated successfully" });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ msg: error.msg });
    }
};

// Delete MasterClass
const deleteMasterClass = async (req, res) => {
    const { masterClassID } = req.params;
    try {
        const masterClass = await MasterClass.findOneAndDelete({ masterClassID: masterClassID });
        if (!masterClass) {
            return res.status(404).json({ msg: "MasterClass not found" });
        }
        return res.status(200).json({ msg: "MasterClass deleted successfully" });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ msg: error.msg });
    }
};

// Get All MasterClasses
const getAllMasterClasses = async (req, res) => {
    try {
        const masterClasses = await MasterClass.find().sort({ date: -1 });
        return res.status(200).json(masterClasses);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ msg: error.msg });
    }
};

// Get MasterClass by ID
const getMasterClassByID = async (req, res) => {
    const { masterClassID } = req.params;
    try {
        const masterClass = await MasterClass.findOne({ masterClassID: masterClassID });
        if (!masterClass) {
            return res.status(404).json({ msg: "MasterClass not found" });
        }
        return res.status(200).json(masterClass);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ msg: error.msg });
    }
};

export default {
    addMasterClass,
    updateMasterClass,
    deleteMasterClass,
    getAllMasterClasses,
    getMasterClassByID
};