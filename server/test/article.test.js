var chai = require('chai')
    , chaiHttp = require('chai-http');

var expect = chai.expect;
const app = require('../app')
chai.use(chaiHttp);
const User = require('../models/User')
const Article = require('../models/Article')

describe('Article model tester', function () {
    let token = ''
    let tokenKedua = ''
    let articleId = ''

    before(function (done) {
        User.create({
            name: 'usertest1',
            email: 'usertest1@mail.com',
            password: 'usertest1',
            phone: '08131384147'
        })
            .then((result) => {
                return chai.request.agent(app)
                    .post('/login')
                    .send({
                        email: 'usertest1@mail.com',
                        password: 'usertest1',
                    })
            })
            .then((res) => {
                // console.log(res.body)
                // console.log('saksjakjsak skaj skajs ak')
                token = res.body.token
                // console.log(token)k
                // done();
            })
            .catch((err) => {
                // console.log(err.message)
                // done()
            });


        User.create({
            name: 'usertest2',
            email: 'usertest2@mail.com',
            password: 'usertest2',
            phone: '08131384147'
        })
            .then((result) => {
                return chai.request.agent(app)
                    .post('/login')
                    .send({
                        email: 'usertest2@mail.com',
                        password: 'usertest2',
                    })
            })
            .then((res) => {
                // console.log(res.body)
                tokenKedua = res.body.token
                // console.log(token)k
                done();
            })
            .catch((err) => {
                // console.log(err.message)
                done()
            });
    })

    after(function (done) {
        Article.deleteMany({})
            .then((result) => {
                done()
            }).catch((err) => {
                // console.log(err.message)
            });
    })



    describe('create an article :', function () {
        it('should create an article', function (done) {
            let input = {
                title: 'Test create Article',
                text: 'Test case for creating article'
            }
            chai
                .request(app)
                .post('/article')
                .set('auth', token)
                .send(input)
                .end(function (err, res) {
                    // console.log(token, 'ini token')
                    //   console.log(res.body)
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.an('object');
                    expect(res.body.title).to.equal(input.title)
                    expect(res.body.text).to.equal(input.text)
                    articleId = res.body._id
                    done()
                })
        })

        it('should return title is required', function (done) {
            let input = {
                title: '',
                text: 'Test case for creating article'
            }
            chai
                .request(app)
                .post('/article')
                .set('auth', token)
                .send(input)
                .end(function (err, res) {
                    //   console.log(res.body)
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res.body).to.be.an('object');
                    expect(res.body.message).to.equal("Article validation failed: title: Path `title` is required.")
                })
            done()
        })

        it('should return text is required', function (done) {
            let input = {
                title: 'Test create Article',
                text: ''
            }
            chai
                .request(app)
                .post('/article')
                .set('auth', token)
                .send(input)
                .end(function (err, res) {
                    //   console.log(res.body)
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res.body).to.be.an('object');
                    expect(res.body.message).to.equal("Article validation failed: text: Path `text` is required.")
                })
            done()
        })
        
        it('should return minimum lenth of title is 6', function (done) {
            let input = {
                title: 'test',
                text: 'Test case for creating article'
            }
            chai
                .request(app)
                .post('/article')
                .set('auth', token)
                .send(input)
                .end(function (err, res) {
                    //   console.log(res.body)
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res.body).to.be.an('object');
                    expect(res.body.message).to.equal("Article validation failed: title: Minimum length of title is 6")
                })
            done()
        })

        it('should return minimum lenth of text is 20', function (done) {
            let input = {
                title: 'test',
                text: 'Test text'
            }
            chai
                .request(app)
                .post('/article')
                .set('auth', token)
                .send(input)
                .end(function (err, res) {
                    //   console.log(res.body)
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res.body).to.be.an('object');
                    expect(res.body.message).to.equal("Article validation failed: title: Minimum length of title is 6, text: Minimum length of text is 20")
                })
            done()
        })

        it('should return minimum lenth of title is 6 when input many of space', function (done) {
            let input = {
                title: '          test',
                text: 'Test case for creating article'
            }
            chai
                .request(app)
                .post('/article')
                .set('auth', token)
                .send(input)
                .end(function (err, res) {
                    //   console.log(res.body)
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res.body).to.be.an('object');
                    expect(res.body.message).to.equal("Article validation failed: title: Minimum length of title is 6")
                })
            done()
        })


        it('should return minimum lenth of text is 20 when input many of space', function (done) {
            let input = {
                title: 'test',
                text: '        Test text'
            }
            chai
                .request(app)
                .post('/article')
                .set('auth', token)
                .send(input)
                .end(function (err, res) {
                    //   console.log(res.body)
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res.body).to.be.an('object');
                    expect(res.body.message).to.equal("Article validation failed: title: Minimum length of title is 6, text: Minimum length of text is 20")
                })
            done()
        })

        it('should return jwt must profide when create an article without auth', function (done) {
            let input = {
                title: 'Test create Article',
                text: 'Test case for creating article'
            }
            chai
                .request(app)
                .post('/article')
                .send(input)
                .end(function (err, res) {
                    // console.log(token, 'ini token')
                    //   console.log(res.body)
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res.body.message).to.be.equal('jwt must be provided');
                    
                    done()
                })
        })
        
        it('should return jwt malformed when create an article with invalid token auth', function (done) {
            let input = {
                title: 'Test create Article',
                text: 'Test case for creating article'
            }
            chai
                .request(app)
                .post('/article')
                .set('auth', 'wrongtoken')
                .send(input)
                .end(function (err, res) {
                    // console.log(token, 'ini token')
                    //   console.log(res.body)
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res.body.message).to.be.equal('jwt malformed');
                    
                    done()
                })
        })
    })

    describe('find article : ', function () {
        
        it('return all of user\'s article', function (done) {
            chai
                .request(app)
                .get('/article')
                .end(function (err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.an('array');
                    
                    done()
                })
        })

    })


    describe('find all my article : ', function () {
        
        it('return all of my article', function (done) {
            chai
                .request(app)
                .get('/article/my')
                .set('auth', token)
                .end(function (err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.an('array');
                    
                    done()
                })
        })


        it('return jwt malformed to find all of my article', function (done) {
            chai
                .request(app)
                .get('/article/my')
                .set('auth', 'wrongtoken')
                .end(function (err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res.body.message).to.be.equal('jwt malformed');
                    
                    done()
                })
        })

        it('return fail to find all of my article without token', function (done) {
            chai
                .request(app)
                .get('/article/my')
                .end(function (err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res.body.message).to.be.equal('jwt must be provided');
                    
                    done()
                })
        })
    })

    describe('find one article', function(){
        it('return one of user\'s article', function (done) {
            chai
                .request(app)
                .get('/article/'+articleId)
                .set('auth', token)
                .end(function (err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.an('object');
                    done()
                })
        })

    })

    describe('update an article', function(){
        it('return successfuly to update an article', function (done) {
            let input = {
                title: 'tile update',
                text: 'text update for testing an article'
            }
            chai
                .request(app)
                .put('/article/'+articleId)
                .set('auth', token)
                .send(input)
                .end(function (err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.an('object');
                    expect(res.body.title).to.equal(input.title)
                    expect(res.body.text).to.equal(input.text)
                    done()
                })
        })

        it('return you are not authorized to update', function (done) {
            let input = {
                title: 'tile update',
                text: 'text update'
            }
            chai
                .request(app)
                .put('/article/'+articleId)
                .set('auth', tokenKedua)
                .send(input)
                .end(function (err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res.body).to.be.an('object');
                    expect(res.body.message).to.equal('You are not authorized!')
                    done()
                })
        })

        it('return jwt must be provided when update article without token auth', function (done) {
            let input = {
                title: 'tile update',
                text: 'text update'
            }
            chai
                .request(app)
                .put('/article/'+articleId)
                .send(input)
                .end(function (err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res.body).to.be.an('object');
                    expect(res.body.message).to.equal('jwt must be provided')
                    done()
                })
        })

        it('return jwt malformed when update article with invalid token', function (done) {
            let input = {
                title: 'tile update',
                text: 'text update'
            }
            chai
                .request(app)
                .put('/article/'+articleId)
                .set('auth', 'wrongtoken')
                .send(input)
                .end(function (err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res.body).to.be.an('object');
                    expect(res.body.message).to.equal('jwt malformed')
                    done()
                })
        })
    })

    describe('Delete an article', function(){
        it('return successfuly to delete an article', function (done) {
            chai
                .request(app)
                .delete('/article/'+articleId)
                .set('auth', token)
                .end(function (err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.an('object');
                    done()
                })
        })

        it('return you are not authorized to delete', function (done) {
            chai
                .request(app)
                .delete('/article/'+articleId)
                .set('auth', tokenKedua)
                .end(function (err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res.body).to.be.an('object');
                    expect(res.body.message).to.equal('You are not authorized!')
                    done()
                })
        })

        it('return jwt must be provided when delete without token', function (done) {
            chai
                .request(app)
                .delete('/article/'+articleId)
                .end(function (err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res.body).to.be.an('object');
                    expect(res.body.message).to.equal('jwt must be provided')
                    done()
                })
        })

        it('return jw malformed when delete article with invalid token', function (done) {
            chai
                .request(app)
                .delete('/article/'+articleId)
                .set('auth', 'wrongtoken')
                .end(function (err, res) {
                    expect(err).to.be.null
                    expect(res).to.have.status(400)
                    expect(res.body).to.be.an('object');
                    expect(res.body.message).to.equal('jwt malformed')
                    done()
                })
        })
    })
})