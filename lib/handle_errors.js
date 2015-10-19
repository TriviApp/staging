'use strict';

function sendError(res, status, msg) {
  res.status(status).json({ msg: msg });
};

exports.err401 = function(err, res) {
  sendError(res, 401, 'Unauthorized');
  console.log(err);
};

exports.err403 = function(err, res) {
  sendError(res, 403, 'Forbidden');
  console.log(err);
};

exports.err404 = function(err, res) {
  sendError(res, 404, 'File Not Found');
  console.log(err);
};

exports.err500 = function(err, res) {
  sendError(res, 500, 'Internal Server Error');
  console.log(err);
};
