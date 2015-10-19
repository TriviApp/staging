var chai = require('chai');
var chaiHTTP = require('chai-http');
chai.use(chaiHTTP);
var expect = chai.expect;
process.env.MONGO_URL = 'mongodb://localhost/'




