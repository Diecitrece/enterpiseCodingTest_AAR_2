import { app } from './app';
import dbConnect from '@infrastructure/shared/database/initDB';
dbConnect();
const PORT = 8080;
const server = app.listen(PORT, () => {
  console.log(`App listening on port 8080`);
});

module.exports = server;
