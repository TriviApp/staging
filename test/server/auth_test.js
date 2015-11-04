var chai = require('chai');
var chaihttp = require('chai-http');
chai.use(chaihttp);
var expect = chai.expect;
process.env.MONGO_URL = 'mongodb://localhost/notes_test';
require(__dirname + '/../../server');
var mongoose = require('mongoose');
var User = require(__dirname + '/../../models/user_model');

describe('auth', function() {
  after(function(done){
    mongoose.connection.db.dropDatabase(function() {
      done();
    });
  });

  it('should be able to create a user', function(done) {
    chai.request('localhost:3000/api')
      .post('/signup')
      .send({username: 'testuser', password: 'foobar123'})
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.data.username).to.be('testuser');
        expect(res.data.password).to.be('');
        expect(res.data.token).to.have.length.above(0);
        done();
      });
  });

  describe('user already in database', function() {
    before(function(done) {
      var user = new User();
      user.username = 'test';
      user.basic.username = 'test';
      user.generateHash('foobar123', function(err, res) {
        if (err) throw err;
        user.save(function(err, data) {
          if (err) throw err;
          user.generateToken(function(err, token) {
            if (err) throw err;
            this.token = token;
            done();
          }.bind(this));
        }.bind(this));
      }.bind(this));
    });

    it('should be able to sign in', function(done) {
      chai.request('localhost:3000/api')
        .get('/signin')
        .auth('test', 'foobar123')
        .end(function(err, res) {
          expect(err).to.eql(null);
          expect(res.body.token).to.have.length.above(0);
          done();
        });
    });
  });
});
