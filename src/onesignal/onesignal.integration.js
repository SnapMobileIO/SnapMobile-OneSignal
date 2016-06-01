'use strict';

import chai from 'chai';
import chaiHttp from 'chai-http';
import OneSignal from '../onesignal';

chai.use(chaiHttp);

const should = chai.should();

describe('OneSignal Component - Integration', () => {

  it('should get players', function(done) {

    const oneSignal = new OneSignal();

    oneSignal.getPlayers()
      .then(function(response) {

        // Response comes back as a string (not sure why)
        response = JSON.parse(response);

        response.should.be.a('object');
        response.should.have.property('total_count');
        response.total_count.should.be.above(0);
        done();
      })
      .catch(function(error) {
        console.error(error);
        should.not.exist(error);
        done();
      });
  });

  it('should create a push notification', function(done) {

    const oneSignal = new OneSignal();

    // TODO: We need a test OneSignal account or we may be sending notifications to users :-/
    // Get the first device from the OneSignal device list and try and send it a text message
    oneSignal.getPlayers()
      .then(function(response) {

        // Response comes back as a string (not sure why)
        response = JSON.parse(response);

        response.should.be.a('object');
        response.should.have.property('total_count');
        response.total_count.should.be.above(0);

        let playerIds = [response.players[0].id];

        // Now send the first device a push notification
        let options = {
          include_player_ids: playerIds,
          contents: { en: 'This is a test message' }
        };

        // For now, we really only care that this comes back with success
        // TODO: Need test to ensure our device id was successful
        oneSignal.createNotification(options)
          .then((response) => {
            response.should.be.a('object');
            done();
          })
          .catch((error) => {
            should.not.exist(error);
            done();
          });
      })
      .catch(function(error) {
        should.not.exist(error);
        done();
      });
  });

});
