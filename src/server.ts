import http from 'http';
import app from './app';
import  sequelize from './config/config';
import { User } from './models/user.model';
import router from './routes/userRoute';

const PORT = process.env.PORT || 3000;
app.set('port', PORT);

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});