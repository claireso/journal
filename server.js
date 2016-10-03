require("babel-register");

const express = require('express');
const React = require('react');
const ReactDOMServer = require('react-dom/server');

const ReactApp = require('./app/App');
const paginate = require('./middleware/paginate');

const app = express();

app.use(express.static('public'));
app.set('view engine', 'pug');
app.set('views', './views');


const renderView = (req, res) => {
  const props = {
    photos: req.photos,
    pager: req.pager,
  };
  res.render('index', {
    content: ReactDOMServer.renderToStaticMarkup(React.createElement(ReactApp, props)),
  });
}


app.get('/', paginate, renderView);
app.get('/page/:page', paginate, renderView);


app.listen(3000, () => {});

