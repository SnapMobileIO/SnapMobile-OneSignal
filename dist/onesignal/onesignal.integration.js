'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiHttp = require('chai-http');

var _chaiHttp2 = _interopRequireDefault(_chaiHttp);

var _onesignal = require('../onesignal');

var _onesignal2 = _interopRequireDefault(_onesignal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_chai2.default.use(_chaiHttp2.default);

var should = _chai2.default.should();

describe('OneSignal Component - Integration', function () {

  it('should get players', function (done) {

    var oneSignal = new _onesignal2.default();

    oneSignal.getPlayers().then(function (response) {

      // Response comes back as a string (not sure why)
      response = JSON.parse(response);

      response.should.be.a('object');
      response.should.have.property('total_count');
      response.total_count.should.be.above(0);
      done();
    }).catch(function (error) {
      console.error(error);
      should.not.exist(error);
      done();
    });
  });

  it('should create a push notification', function (done) {

    var oneSignal = new _onesignal2.default();

    // TODO: We need a test OneSignal account or we may be sending notifications to users :-/
    // Get the first device from the OneSignal device list and try and send it a text message
    oneSignal.getPlayers().then(function (response) {

      // Response comes back as a string (not sure why)
      response = JSON.parse(response);

      response.should.be.a('object');
      response.should.have.property('total_count');
      response.total_count.should.be.above(0);

      var playerIds = [response.players[0].id];

      // Now send the first device a push notification
      var options = {
        include_player_ids: playerIds,
        contents: { en: 'This is a test message' }
      };

      // For now, we really only care that this comes back with success
      // TODO: Need test to ensure our device id was successful
      oneSignal.createNotification(options).then(function (response) {
        response.should.be.a('object');
        done();
      }).catch(function (error) {
        should.not.exist(error);
        done();
      });
    }).catch(function (error) {
      should.not.exist(error);
      done();
    });
  });
});