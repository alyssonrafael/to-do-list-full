import express from 'express';
import taskRoutes from './routers/taskRouters.js';
import categoryRoutes from './routers/categoryRoutes.js';

const app = express();

app.use(express.json());

app.use('/api', taskRoutes);
app.use('/api', categoryRoutes);

export default app;
