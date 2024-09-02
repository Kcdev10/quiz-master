import app from './app';
import config from './config/config';
import ConnectToDataBase from './config/db.config';

const PORT = config.PORT || 8065;
const MONOURL = config.MOGOURL;

const server = app.listen(PORT);

(async () => {
  try {
    // connecting to database
    await ConnectToDataBase(MONOURL as string);

    console.info('APPLICATION STATRTED | SERVER IS LISTINING AT', {
      Port: PORT,
    });
  } catch (error) {
    if (error instanceof Error) console.log(`error occurs : ${error.message}`);

    server.close((err) => {
      if (err) {
        console.info(`APPLICATION ERROR OCCURED ${err.message}`);
      }
      process.exit(1);
    });
  }
})();
