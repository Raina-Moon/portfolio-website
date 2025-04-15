import express from 'express';
import troubleshootingRoutes from './routes/troubleshooting';
import contactRoutes from './routes/contact';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
  }));

app.use(express.json());

app.use('/api/troubleshooting', troubleshootingRoutes);
app.use('/api/contact', contactRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
