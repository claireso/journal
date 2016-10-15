const data = require('../app/data/photos');

const PER_PAGE = 10;

const TOTAL = data.length;

const TOTAL_PAGES = Math.ceil( TOTAL / PER_PAGE );

const getPage = (page = 1, perPage = PER_PAGE) => {
  return new Promise((resolve, reject) => {
    if (page > TOTAL_PAGES || isNaN(page)) {
      reject();
      return;
    }

    console.log("pass here")
    page = parseInt(page , 10);

    const start = (page - 1) * perPage;
    const end = start + perPage;

    const photos = data.slice(start, end);

    const pager = {};

    if (page < TOTAL_PAGES) {
      pager.next = page + 1;
      pager.last = TOTAL_PAGES;
    }

    if (page > 1) {
      pager.prev = page - 1;
      pager.first = 1;
    }

    resolve({
      photos,
      pager,
    });

  });
};

/*const paginate = (req, res, next) => {
  const page = +req.params[0] || 1;
  const start = (page - 1) * PER_PAGE;
  const end = start + PER_PAGE;

  if (page > TOTAL_PAGES) {
    res.redirect('/');
    return;
  }


  req.photos = data.slice(start, end);

  req.pager = {};

  if (page < TOTAL_PAGES) {
    req.pager.next = page + 1;
    req.pager.last = TOTAL_PAGES;
  }

  if (page > 1) {
    req.pager.prev = page - 1;
    req.pager.first = 1;
  }

  next();
}*/

module.exports = {
  getPage,
};
