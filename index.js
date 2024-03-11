const app = require('./app');
const connectDb = require('./config/db');
const userRoutes = require('./routes/userRoutes');

const PORT = process.env.PORT || 3000;


app.use('/api/v1/users', userRoutes);

const start = async () => {
  try {
    await connectDb();
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (error) {
    console.error(error.message);
  }
}

start();