require("babel-register");

const express = require('express');
const React = require('react');
const ReactDOMServer = require('react-dom/server');

const ReactApp = require('./app/App');
const photos = require('./app/data/photos');

const app = express();

app.use(express.static('public'));
app.set('view engine', 'pug');
app.set('views', './views');

app.get('/', (req, res) => {
  res.render('index', {
    content: ReactDOMServer.renderToStaticMarkup(React.createElement(ReactApp, {photos})),
  });
});

app.listen(3000, () => {});
