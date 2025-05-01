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
app.use(cors({
  origin: ["http://localhost:5173", "https://grey-alpaca-117753.hostingersite.com"],
  credentials: true,
}));



app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}
);


app.use('/api',userRouter )
app.use("/api/residency",residencyRoute);