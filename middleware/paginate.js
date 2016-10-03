const data = require('../app/data/photos');

const PER_PAGE = 2;
const TOTAL = data.length;
const TOTAL_PAGES = Math.ceil( TOTAL / PER_PAGE );

const paginate = (req, res, next) => {
  const page = +req.params.page || 1;
  const start = (page - 1) * PER_PAGE;
  const end = start + PER_PAGE;
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
}

module.exports = paginate;
