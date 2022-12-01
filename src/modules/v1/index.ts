import { Router } from "express";

const router = Router();

router.use("/", async (req, res, next) => {
	return res.send("You've hit /v1");
});

export default router;
