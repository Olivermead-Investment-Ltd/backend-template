import "./env";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import express from "express";
import compression from "compression";
import rateLimit from "express-rate-limit";

import routes from "./routes";
import db from "./database/models";
import { errorHandler } from "./modules/common/utils";

const { PORT, NODE_ENV, SERVICE_PATH = "" } = process.env;
const morganConfig = NODE_ENV === "development" ? "dev" : "tiny";

const app = express();
app.disable("x-powered-by");

// Middlewares
app.use(
	`/${SERVICE_PATH}`,
	morgan(morganConfig),
	rateLimit({
		max: 100, // limit each IP to 100 requests per windowMs
		windowMs: 60000, // 1 minutes
		message: "Too many request from this IP, please try again after 10 minutes"
	}),
	cors({
		origin: (_origin, callback) => {
			callback(null, true);
		},
		credentials: true
	}),
	helmet(),
	compression(),
	express.urlencoded({ extended: true, limit: "10mb" }),
	express.json({ limit: "10mb" }),
	routes,
	errorHandler
);

app.use("/", (_req, res) => {
	res.send("API is up and running");
});

export default app;

// Start the server
db.sequelize
	.authenticate()
	.then(() => {
		console.log(`Environment is ${NODE_ENV}`);
		console.log(`Connected to database: ${process.env.DB_NAME}`);
		app.listen(PORT, () => {
			console.log(`Server started on port: ${PORT}`);
		});
	})
	.catch(e => console.log("Failed to connect to database:", e.message));
