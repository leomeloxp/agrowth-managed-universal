import mongoose from 'mongoose';

/**
 * Configure Mongoose database connection and connect to DB server
 */
const createDBConnection = async (URI = '') => {
  /**
   * Defines which type of Promise interface Mongoose should use.
   * Because node supports promises natively now, we can use the global Promise object.
   *
   * You can find a crash course on promises here:
   * {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises}
   */
  mongoose.Promise = global.Promise;

  if (process.env.NODE_ENV === 'development') {
    mongoose.set('debug', true);
  }

  // Connect Mongoose to our database server (the one defined in .env)
  return mongoose.connect(
    URI,
    {
      useNewUrlParser: true
    }
  );
};

export default createDBConnection;
