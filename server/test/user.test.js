var chai = require('chai')
  , chaiHttp = require('chai-http');

var expect = chai.expect;
const app = require('../app')
chai.use(chaiHttp);
const User = require('../models/User')

describe('User model tester', function(){
  after(function(done) {
    User.deleteMany({})
      .then((result) => {
        // console.log(result)
        done()
      }).catch((err) => {
        // console.log(err)
      });
  })

  describe('register account', function(){
    it('should successfully register account', function(done) {
      chai.request(app)
        .post('/register')
        .send({
          name: 'rangga',
          email: 'rangga@mail.com',
          password: 'rangga',
          phone: '08135252552'
        })
        .end(function(err, res){
          // console.log(res.body)
          expect(err).to.be.null;
          expect(res).to.have.status(201)
          expect(res).to.be.an('object');
          expect(res.body.name).to.equal('rangga')
          expect(res.body.email).to.equal('rangga@mail.com')
          expect(res.body.password).to.not.equal('rangga')
          expect(res.body.phone).to.equal('08135252552')
          done()
        })
    })
  
    it('should return email is used', function(done) {
      chai.request(app)
        .post('/register')
        .send({
          name: 'rangga',
          email: 'rangga@mail.com',
          password: 'rangga',
          phone: '08135252552'
        })
        .end(function(err, res){
          expect(err).to.be.null;
          expect(res).to.have.status(400)
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.equal(`User validation failed: email: rangga@mail.com is used`)
          done()
        })
    })

    it('should return name is required', function(done) {
      chai.request(app)
        .post('/register')
        .send({
          name: '',
          email: 'rangga2@mail.com',
          password: 'rangga2',
          phone: '08135252552'
        })
        .end(function(err, res){
          expect(err).to.be.null;
          expect(res).to.have.status(400)
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.equal("User validation failed: name: Path `name` is required.")
          done()
        })
    })

    it('should return email is required', function(done) {
      chai.request(app)
        .post('/register')
        .send({
          name: 'rangga2',
          email: '',
          password: 'rangga2',
          phone: '08135252552'
        })
        .end(function(err, res){
          expect(err).to.be.null;
          expect(res).to.have.status(400)
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.equal("User validation failed: email: Path `email` is required.")
          done()
        })
    })

    it('should return password is required', function(done) {
      chai.request(app)
        .post('/register')
        .send({
          name: 'rangga2',
          email: 'rangga2@mail.com',
          password: '',
          phone: '08135252552'
        })
        .end(function(err, res){
          expect(err).to.be.null;
          expect(res).to.have.status(400)
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.equal("User validation failed: password: Path `password` is required.")
          done()
        })
    })

    it('should return phone is required', function(done) {
      chai.request(app)
        .post('/register')
        .send({
          name: 'rangga2',
          email: 'rangga2@mail.com',
          password: 'rangga2',
          phone: ''
        })
        .end(function(err, res){
          expect(err).to.be.null;
          expect(res).to.have.status(400)
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.equal("User validation failed: phone: Path `phone` is required.")
          done()
        })
    })

    it('should return minimum name is 6', function(done) {
      chai.request(app)
        .post('/register')
        .send({
          name: 'rangg',
          email: 'rangga2@mail.com',
          password: 'rangga2',
          phone: '08135252552'
        })
        .end(function(err, res){
          expect(err).to.be.null;
          expect(res).to.have.status(400)
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.equal("User validation failed: name: Minimum length of name is 6")
          done()
        })
    })

    it('should return minimum password is 6', function(done) {
      chai.request(app)
        .post('/register')
        .send({
          name: 'rangga2',
          email: 'rangga2@mail.com',
          password: 'rangg',
          phone: '08135252552'
        })
        .end(function(err, res){
          expect(err).to.be.null;
          expect(res).to.have.status(400)
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.equal("User validation failed: password: Minimum length of password is 6")
          done()
        })
    })
    
  
    it('should return email not valid', function(done) {
      chai.request(app)
        .post('/register')
        .send({
          name: 'rangga',
          email: 'rangga@mailcom',
          password: 'rangga',
          phone: '08135252552'
        })
        .end(function(err, res){
          expect(err).to.be.null;
          expect(res).to.have.status(400)
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.equal(`User validation failed: email: rangga@mailcom is not a valid email`)
          done()
        })
    })
  
    it('should return phone number not valid', function(done) {
      chai.request(app)
        .post('/register')
        .send({
          name: 'rangga2',
          email: 'rangga2@mail.com',
          password: 'rangga2',
          phone: '08135252552sss'
        })
        .end(function(err, res){
          expect(err).to.be.null;
          expect(res).to.have.status(400)
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.equal(`User validation failed: phone: 08135252552sss is not a valid phone number!`)
          done()
        })
    })
  
    it('should return minimum length phone number is 11', function(done) {
      chai.request(app)
        .post('/register')
        .send({
          name: 'rangga2',
          email: 'rangga2@mail.com',
          password: 'rangga2',
          phone: '0813'
        })
        .end(function(err, res){
          expect(err).to.be.null;
          expect(res).to.have.status(400)
          expect(res).to.be.an('object');
          expect(res.body.message).to.equal(`User validation failed: phone: Minimum length phone number is 11`)
          done()
        })
    })
  
    it('should return maximum length phone number is 13', function(done) {
      chai.request(app)
        .post('/register')
        .send({
          name: 'rangga2',
          email: 'rangga2@mail.com',
          password: 'rangga2',
          phone: '08132192913913913939'
        })
        .end(function(err, res){
          expect(err).to.be.null;
          expect(res).to.have.status(400)
          expect(res.body).to.be.an('object');
          expect(res.body.message).to.equal(`User validation failed: phone: Maximum length phone number is 13`)
          done()
        })
    })
  })

  describe('login account', function(){
    it('should successfully login user', function(done){
      chai.request(app)
        .post('/login')
        .send({
          email: 'rangga@mail.com',
          password: 'rangga',
        })
        .end(function(err, res){
          expect(err).to.be.null;
          expect(res).to.have.status(200)
          expect(res).not.to.be.null
          expect(res.body.token).not.to.be.null
          done()
        })
    })

    it('should return wrong password', function(done){
      chai.request(app)
        .post('/login')
        .send({
          email: 'rangga@mail.com',
          password: 'ranggasss',
        })
        .end(function(err, res){
          expect(err).to.be.null;
          expect(res).to.have.status(400)
          expect(res).not.to.be.null
          expect(res.body.message).to.equal('Wrong password')
          // tokenLogin = res.body.token
          // console.log(res.body.message)
          done()
        })
    })

    it('should return email not found', function(done){
      chai.request(app)
        .post('/login')
        .send({
          email: 'rangga@mail.comsssss',
          password: 'rangga',
        })
        .end(function(err, res){
          expect(err).to.be.null;
          expect(res).to.have.status(400)
          expect(res).not.to.be.null
          expect(res.body.message).to.equal('Email not found')
          done()
        })
    })

    it('should return email not found when input empty email', function(done){
      chai.request(app)
        .post('/login')
        .send({
          email: '',
          password: 'rangga',
        })
        .end(function(err, res){
          expect(err).to.be.null;
          expect(res).to.have.status(400)
          expect(res).not.to.be.null
          expect(res.body.message).to.equal('Email not found')
          done()
        })
    })


    it('should return wrong password when input empty password', function(done){
      chai.request(app)
        .post('/login')
        .send({
          email: 'rangga@mail.com',
          password: '',
        })
        .end(function(err, res){
          expect(err).to.be.null;
          expect(res).to.have.status(400)
          expect(res).not.to.be.null
          expect(res.body.message).to.equal('Wrong password')
          // tokenLogin = res.body.token
          // console.log(res.body.message)
          done()
        })
    })
    
  })

})
