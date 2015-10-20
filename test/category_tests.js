var chai = require('chai');
var chaiHttp = require('chai-http');
chai.use(chaiHttp);
var expect = chai.expect;
process.env.MONGO_URL = 'mongodb://localhost/categories_test';
require(__dirname + '/../server.js');
var mongoose = require('mongoose');
var url = 'localhost:3000/api';
var Category = require(__dirname + '/../models/category_model');
var User = require(__dirname + '/../models/user_model');

describe('the categories resource', function () {
  after(function (done) {
    mongoose.connection.db.dropDatabase(function (err) {
      if (err) throw err;
      done();
    });
  });

  before(function (done) {
    var user = new User();
    user.username = 'test';
    user.generateHash('foobar123', function (err, res) {
      if (err) throw err;
      user.generateToken(function (err, token) {
        if (err) throw err;
        this.token = token;
        user.save(function (err, data) {
          if (err) throw err;
          done();
        }.bind(this));
      }.bind(this));
    }.bind(this));
  });

  it('should be able to get categories', function (done) {
    chai.request(url)
      .get('/categories')
      .end(function (err, res) {
        expect(err).to.eql(null);
        expect(Array.isArray(res.body)).to.eql(true);
        done();
      });
  });

  //more to follow
});