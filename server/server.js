import express from "express";
import cors from "cors";
import 'dotenv/config';
import cookieParser from "cookie-parser";
import connectDB from './config/mongodb.js';
import authRouter from './routes/authRoutes.js';
import userRouter from './routes/userRoutes.js';
import staffRouter from "./routes/staffRoutes.js";
import staffAuthRouter from "./routes/StaffAuthRoutes.js";

const app = express();
const port = process.env.PORT || 4000;
connectDB();

const allowedOrigins = ['http://localhost:5173']; // Add more if needed

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: allowedOrigins,
  credentials: true,  // Ensure credentials are allowed
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type,Authorization",
}));


// API Endpoints
app.get('/', (req, res) => res.send("API Working"));
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use("/api/staff", staffRouter); 
app.use("/api/staff-auth", staffAuthRouter);


import incomeRoutes from './routes/incomeRoutes.js';
app.use('/api/income-certificates', incomeRoutes);
import residenceRoutes from './routes/residenceRoutes.js';
app.use('/api/residence-certificates', residenceRoutes);
import casteRoutes from './routes/casteRoutes.js'; 
app.use('/api/caste', casteRoutes);
import birthDeathRoutes from "./routes/birthDeathRoutes.js";
app.use("/api/birth-death", birthDeathRoutes);
import trackingRoutes from './routes/trackingRoutes.js';
app.use('/api/track-application', trackingRoutes);

app.listen(port, () => console.log(`Server started on PORT: ${port}`));
