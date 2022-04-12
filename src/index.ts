import 'dotenv/config';

import express from 'express';
import { engine } from 'express-handlebars';

import translations from './translations.json';

const port = parseInt(process.env.PORT || '') || 8080;
const app = express();

// Setup handlebars
app.engine('hbs', engine({ extname: '.hbs' }));
app.set('view engine', 'hbs');

// Setup the public folder
app.use(express.static('public'));

app.get('/:lang?', (req, res) => {
  const rawLang = req.params.lang?.toLowerCase() || '';
  const lang = (
    Object.keys(translations as {}).includes(rawLang) ? rawLang : 'fr'
  ) as keyof typeof translations;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const translation = translations[lang] as {
    pageTitle: string;
    title: string;
  };

  res.render('index', {
    pageTitle: translation.pageTitle,
    title: translation.title,
  });
});

// Starts listening on port 8080 or the port specified in .env
app.listen(port, () => {
  console.log(`The server started listening on http://localhost:${port}`);
});
