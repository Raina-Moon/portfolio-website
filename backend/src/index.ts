import express from 'express';
import troubleshootingRoutes from './routes/troubleshooting';
import contactRoutes from './routes/contact';

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

app.use('/troubleshooting', troubleshootingRoutes);
app.use('/contact', contactRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
