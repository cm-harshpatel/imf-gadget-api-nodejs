const Gadget = require("../models/gadget");
const { v4: uuidv4 } = require("uuid");

exports.getAllGadgets = async (req, res) => {
  try {
    let whereCondition = {};
    if (req.query.status) whereCondition.status = req.query.status; // Add filtering by status

    let gadgets = await Gadget.findAll({ where: whereCondition });

    gadgets = gadgets.map((g) => ({
      ...g.toJSON(),
      successProbability: `${Math.floor(Math.random() * 100)}%`,
    }));

    res.status(200).json(gadgets);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.addGadget = async (req, res) => {
  try {
    const names = ["The Nightingale", "The Kraken", "The Shadow"];
    const { name, status } = req.body; // Accept status from request body

    // Ensure status is valid
    const validStatuses = [
      "Available",
      "Deployed",
      "Destroyed",
      "Decommissioned",
    ];
    if (status && !validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status provided." });
    }

    const newGadget = await Gadget.create({
      name: name || names[Math.floor(Math.random() * names.length)],
      status: status || "Available", // Default to "Available" if no status is provided
    });

    res.status(201).json(newGadget);
  } catch (err) {
    console.error("Error adding gadget:", err);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.updateGadget = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, status } = req.body;

    const gadget = await Gadget.findByPk(id);
    if (!gadget) {
      return res.status(404).json({ message: "Gadget not found" });
    }

    // Update only the provided fields
    if (name) gadget.name = name;
    if (status) gadget.status = status;

    await gadget.save();

    res.status(200).json(gadget);
  } catch (err) {
    console.error("Update Error:", err); // Log error for debugging

    res.status(500).json({ message: "Server Error" });
  }
};

exports.deleteGadget = async (req, res) => {
  try {
    const { id } = req.params;

    const gadget = await Gadget.findByPk(id);
    if (!gadget) {
      return res.status(404).json({ message: "Gadget not found" });
    }

    // Update status and set decommissionedAt timestamp
    const decommissionedAt = new Date(); // Ensure timestamp is generated
    await gadget.update({
      status: "Decommissioned",
      decommissionedAt: decommissionedAt,
    });

    return res.status(200).json({
      message: "Gadget has been decommissioned.",
      gadget: {
        id: gadget.id,
        name: gadget.name,
        status: gadget.status,
        decommissionedAt: decommissionedAt, // Ensure response includes updated value
      },
    });
  } catch (err) {
    console.error("Delete Error:", err);
    return res.status(500).json({ message: "Server Error" });
  }
};

exports.selfDestruct = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the gadget
    const gadget = await Gadget.findByPk(id);
    if (!gadget) {
      return res.status(404).json({ message: "Gadget not found" });
    }

    // Generate a random confirmation code
    const confirmationCode = uuidv4().split("-")[0];

    // Update gadget status to "Destroyed" and store timestamp
    await gadget.update({
      status: "Destroyed",
      updatedAt: new Date(),
    });

    return res.status(200).json({
      message: "Self-destruct sequence initiated!",
      confirmationCode,
      gadget: {
        id: gadget.id,
        name: gadget.name,
        status: gadget.status,
        destroyedAt: new Date(),
      },
    });
  } catch (err) {
    console.error("Self-Destruct Error:", err);
    return res.status(500).json({ message: "Server Error" });
  }
};
