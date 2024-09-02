import mongoose from 'mongoose';

const ConnectToDataBase = async (url: string) => {
  try {
    if (!url) {
      throw new Error('MongoDB connection URL is missing.');
    }

    mongoose.set('strictQuery', false);
    await mongoose.connect(url);

    console.log('Connection to MongoDB established succesfully! 🥳🥳');
  } catch (error) {
    if (error instanceof Error)
      console.log('An error occurred during MongoDB connection.', {
        error: {
          errorName: error.name,
          message: error.message,
          stack: error.stack,
        },
      });

    process.exit(1);
  }
};

export default ConnectToDataBase;
