var router = require('express').Router();
var Course = require('../models/course');


function paginate(req, res, next) {
  var perPage = 3;
  var page = req.params.page;

  Course.find()
    .skip(perPage * page)
    .limit(perPage)
    .exec((err, courses) => {
      Course.countDocuments().exec((err, count) => {
        if (err) return next(err);
        res.render('main/home', {
          courses: courses,
          pages: count / perPage
        });
      })
    });
}


router.get('/', (req, res, next) => {
  // Course.find()
  //   .exec((err, courses) => {
  //     if (err) return next(err);
  //     res.render('main/home', {
  //       courses: courses
  //     });
  //   });
  paginate(req, res, next);
})

module.exports = router;