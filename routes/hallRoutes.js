const router = require("express").Router();
const Hall = require("../models/Hall");
const auth = require("../middleware/auth");
const role = require("../middleware/role");
router.post("/", auth, role("admin"), async (req, res) => {
  try {
    const hall = await Hall.create(req.body);
    res.json(hall);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.get("/", auth, async (req, res) => {
  const halls = await Hall.find();
  res.json(halls);
});
router.put("/:id", auth, role("admin"), async (req, res) => {
  const hall = await Hall.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(hall);
});
router.delete("/:id", auth, role("admin"), async (req, res) => {
  await Hall.findByIdAndDelete(req.params.id);
  res.json({ msg: "Hall deleted" });
});

module.exports = router;