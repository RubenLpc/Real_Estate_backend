import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { userRouter } from './routes/userRoute.js';
import { residencyRoute } from './routes/residencyRoute.js';



dotenv.config();  

const app = express();
const PORT = process.env.PORT || 3000;
/*const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true,
};
*/
const corsOptions = {
  origin: process.env.CLIENT_URL || 'http://localhost:5173', // fallback pentru dev
  credentials: true,
};
app.use(cors(corsOptions));


app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}
);


app.use('/api',userRouter )
app.use("/api/residency",residencyRoute);