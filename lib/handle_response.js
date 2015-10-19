'use strict';

function sendRes(res, status, msg) {
  res.status(status).json({ msg: msg });
};

//Status 200: OK
exports.send200 = function(res, msg) {
  sendRes(res, 200, msg);
};

//Status 201: Created
exports.send201 = function(res, msg) {
  sendRes(res, 201, msg);
};
