const express = require("express");
const router = express.Router();
const gadgetController = require("../controllers/gadget.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.get("/", authMiddleware.verifyToken, gadgetController.getAllGadgets);

router.post(
  "/",
  authMiddleware.verifyToken,
  authMiddleware.verifyAdmin,
  gadgetController.addGadget
);
router.post(
  "/:id/self-destruct",
  authMiddleware.verifyToken,
  authMiddleware.verifyAdmin,
  gadgetController.selfDestruct
);
router.patch("/:id", authMiddleware.verifyToken, gadgetController.updateGadget);
router.delete(
  "/:id",
  authMiddleware.verifyToken, // Ensure user is authenticated
  authMiddleware.verifyAdmin, // Ensure only admins can decommission
  gadgetController.deleteGadget
);
module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Gadgets
 *   description: Operations related to gadgets
 */

/**
 * @swagger
 * /api/gadgets:
 *   get:
 *     summary: Get all gadgets or filter by status
 *     description: Retrieves a list of all gadgets, optionally filtered by status.
 *     tags: [Gadgets]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: ["Available", "Deployed", "Destroyed", "Decommissioned"]
 *         required: false  # ✅ Clearly state it's optional
 *         description: (Optional) Filter gadgets by status
 *     responses:
 *       200:
 *         description: List of gadgets retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   status:
 *                     type: string
 *                   successProbability:
 *                     type: string
 *                     example: "75%"
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/gadgets:
 *   post:
 *     summary: Add a new gadget
 *     description: Creates a new gadget. Only admins can perform this action.
 *     tags: [Gadgets]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - status
 *             properties:
 *               name:
 *                 type: string
 *                 example: "The Shadow"
 *               status:
 *                 type: string
 *                 enum: ["Available", "Deployed", "Destroyed", "Decommissioned"]
 *                 example: "Available"
 *     responses:
 *       201:
 *         description: Gadget added successfully
 *       400:
 *         description: Invalid status provided
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/gadgets/{id}:
 *   patch:
 *     summary: Update gadget details
 *     description: Updates the name or status of a gadget.
 *     tags: [Gadgets]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Gadget ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: ["Available", "Deployed", "Destroyed", "Decommissioned"]
 *     responses:
 *       200:
 *         description: Gadget updated successfully
 *       404:
 *         description: Gadget not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/gadgets/{id}:
 *   delete:
 *     summary: Delete a gadget
 *     description: Decommissions a gadget. Only admins can perform this action.
 *     tags: [Gadgets]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Gadget ID
 *     responses:
 *       200:
 *         description: Gadget decommissioned successfully
 *       404:
 *         description: Gadget not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/gadgets/{id}/self-destruct:
 *   post:
 *     summary: Trigger self-destruct sequence
 *     description: Initiates the self-destruction of a gadget.
 *     tags: [Gadgets]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Gadget ID
 *     responses:
 *       200:
 *         description: Gadget self-destructed successfully
 *       404:
 *         description: Gadget not found
 *       500:
 *         description: Server error
 */
