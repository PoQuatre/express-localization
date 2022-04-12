import 'dotenv/config';

import express from 'express';
import { engine } from 'express-handlebars';

const port = parseInt(process.env.PORT || '') || 8080;
const app = express();

// Setup handlebars
app.engine('hbs', engine({ extname: '.hbs' }));
app.set('view engine', 'hbs');

// Setup the public folder
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('index');
});

// Starts listening on port 8080 or the port specified in .env
app.listen(port, () => {
  console.log(`The server started listening on http://localhost:${port}`);
});
