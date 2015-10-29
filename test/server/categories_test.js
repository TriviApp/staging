var chai = require('chai');
var chaiHTTP = require('chai-http');
chai.use(chaiHTTP);
var expect = chai.expect;
process.env.MONGO_URL = 'mongodb://localhost/categories_test';
require(__dirname + '/../../server.js');
var mongoose = require('mongoose');
var url = 'localhost:3000/api';
var Category = require(__dirname + '/../../models/category_model');
var User = require(__dirname + '/../../models/user_model');
var category_id = 'sports';
var token = '';

describe('the categories resource', function () {
  after(function (done) {
    mongoose.connection.db.dropDatabase(function (err) {
      if (err) throw err;
      done();
    });
  });

  it('should be able to select a category', function(done) {
    chai.request(url)
      .get('/categories' +'/' + category_id)
      // .send({
      //   category: 'sports',
      //   questions: [
      //       {question:"Which NHL Team are nicknamed the 'Coyotes'?", 
      //        answers: ["Calgary", "Vancouver", "Ottawa", "Arizona"], 
      //        correctAnswer: "Arizona"},
      // ],
      // token: token})
      .end(function(err, res) {
        // console.log(category);
        expect(err).to.eql(null);
        expect(null).to.eql(null);
        console.log('res.body.category', res);
        // expect(res).to.have.status(200);
        expect(res.body.category).to.eql('sports');
        done();
      });
  });
  // before(function (done) {
  //   var user = new User();
  //   user.username = 'test';
  //   user.generateHash('foobar123', function (err, res) {
  //     if (err) throw err;
  //     user.generateToken(function (err, token) {
  //       if (err) throw err;
  //       this.token = token;
  //       user.save(function (err, data) {
  //         if (err) throw err;
  //         done();
  //       }.bind(this));
  //     }.bind(this));
  //   }.bind(this));
  // });

  it('should be able to get categories', function (done) {
    chai.request(url)
      .get('/categories/' + category_id)
      .end(function (err, res) {
        expect(err).to.eql(null);
        
        console.log(res.category);
        expect(Array.isArray(res.questions)).to.eql(true);
        done();
      });
  });

  //more to follow
});


