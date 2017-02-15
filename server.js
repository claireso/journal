require("babel-register");

const express = require('express');
const React = require('react');
const ReactDOMServer = require('react-dom/server');

const admin = require('./routes/admin');
const ReactApp = require('./app/App');
const Photos = require('./resources/photos');

const app = express();

app.use(express.static('public'));
app.set('view engine', 'pug');
app.set('views', './views');

const renderPage = (req, res, next) => {
  Photos.getPage(req.params.page)
    .then(({photos, pager}) => {
      res.render('index', {
        content: ReactDOMServer.renderToStaticMarkup(React.createElement(ReactApp, {photos, pager})),
      })
    })
    .catch((err) => {
      next(err);
    });
}

app.get('/', renderPage);

app.get('/page/:page', renderPage);

app.use('/admin', admin);

app.get('*', function(req, res){
  res.redirect('/');
});

app.listen(3000, () => {});
