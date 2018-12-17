const Article = require('../models/Article')

module.exports = {
  create(req, res) {
    // res.json('testing')
    let { title, text } = req.body
    Article.create({
      title: title.trim(),
      text: text.trim(),
      userId: req._currentUser._id
    })
      .then((result_user) => {
        res.status(200).json(result_user)
      }).catch((err) => {
        res.status(400).json({
          message: err.message
        })
      });
  },
  findOne(req, res) {
    Article.findOne({
      _id: req.params.articleId
    }).populate('userId')
      .then((result_article) => {
        res.status(200).json(result_article)
      }).catch((err) => {
        res.status(400).json({
          message: err.message
        })
      });
  },
  findAll(req, res) {
    Article.find({}).populate('userId').sort({date: -1})
      .then((result_article) => {
        res.status(200).json(result_article)
      }).catch((err) => {
        res.status(400).json({
          message: err.message
        })
      });
  },
  findMyArticle(req, res) {
    Article.find({
      userId: req._currentUser._id
    }).populate('userId').sort({date: -1})
      .then((result_article) => {
        res.status(200).json(result_article)
      }).catch((err) => {
        res.status(400).json({
          message: err.message
        })
      });
  },
  update(req, res) {
    let { title, text } = req.body

    let input = {
      title, text
    }
    for (key in input) {
      if (!input[key]) {
        delete input[key]
      }
    }
    // console.log(req.params.articleId)
    Article.findOneAndUpdate({
      _id: req.params.articleId
    }, input,
      {
        new: true,
        runValidators: true
      })
      .then((result_article) => {
        res.status(200).json(result_article)
      }).catch((err) => {
        res.status(400).json({
          message: err.message
        })
      });
  },
  delete(req, res) {
    Article.findOneAndDelete({
      _id: req.params.articleId
    })
      .then((result_user) => {
        res.status(200).json(result_user)
      }).catch((err) => {
        res.status(400).json({
          message: err.message
        })
      });
  }
}