const router = require("express").Router();
const appointmentsController = require("../../controllers/appointmentsController");
const { findOne } = require("../../models/user");

router
.route("/")
.get(appointmentsController.findAll)
.post(appointmentsController.create);

router.route("/:email").get(appointmentsController.findOne);
router.route("/:id").delete(appointmentsController.delete);



module.exports = router;