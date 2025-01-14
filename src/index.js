import cookieParser from 'cookie-parser';
import { config } from 'dotenv';
import express, { json, urlencoded } from 'express';
import { dirname, join, resolve } from 'path';
import { fileURLToPath } from 'url';
import route from './routes/index.js';
import { PROBLEMS_DIR } from './tools/getDirs.js';

config();

const app = express();
const PORT = process.env.PORT || 1811;
const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(express.static(join(__dirname, '../resources')));
app.use(express.static(join(__dirname, '../public/static')));
app.use(express.static(join(__dirname, '../node_modules')));
app.use(urlencoded({ extended: true }));
app.use(json());
app.use(cookieParser());

app.set('view engine', 'ejs');
app.set('views', resolve(__dirname, 'views'));

route(app);

app.listen(PORT, () => {
  console.log(`Listening: http://localhost:${PORT}`);
});
