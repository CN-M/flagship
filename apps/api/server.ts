import "colors";
import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import express, { type Express } from "express";
import helmet from "helmet";
import morgan from "morgan";
import { env } from "./config/env";

import { catch404, errorHandler } from "./middleware";

// Import Routes
import flagRoute from "./routes/flagRoute";
import userRoute from "./routes/userRoute";

const { PORT, NODE_ENV } = env;

const app: Express = express();
app.set("trust proxy", 1);

const allowedOrigins = ["http://localhost:5173", "http://127.0.0.1:5173"];

// Middleware
app.use(morgan(NODE_ENV === "development" ? "dev" : "combined"));
app.use(cookieParser());
app.use(
	cors({
		origin: (origin, callback) => {
			if (!origin || allowedOrigins.includes(origin)) {
				callback(null, true);
			} else {
				callback(new Error("Not allowed by CORS"));
			}
		},
		credentials: true,
	}),
);
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/account", userRoute);
app.use("/", flagRoute);

// Error Middleware
app.use(catch404);
app.use(errorHandler);

app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`.cyan);
});
