'use strict';

import Promise from 'bluebird';
import request from 'request';

class OneSignal {

  constructor(options = {}) {
    this.appId = options.appId || process.env.ONESIGNAL_APP_ID;
    this.restApiKey = options.restApiKey || process.env.ONESIGNAL_API_KEY;
    this.baseUrl = 'https://onesignal.com/api/v1';
  }

  /**
   * Get all players
   * @param  {Number} offset The offset
   * @param  {Number} limit  The limit
   * @return {Promise}       The http request promise
   */
  getPlayers(offset = 0, limit = 20) {
    let requestUrl = this.baseUrl + '/players?';
    requestUrl += `app_id=${this.appId}&`;
    requestUrl += `limit=${limit}&`;
    requestUrl += `offset=${offset}`;

    let requestOptions = {
      url: requestUrl,
      headers: {
        Authorization: `Basic ${this.restApiKey}`
      }
    };

    return new Promise((resolve, reject) => {
      request.get(requestOptions, (error, response, body) => {
        if (error) { reject(error); }

        if (!error && response.statusCode == 200) {
          resolve(body);
        } else {
          reject(new Error(body));
        }
      });
    });
  }

  /**
   * Create a OneSignal push notifiction
   * @param  {Object} options Any OneSignal options can be sent (https://documentation.onesignal.com/docs/notifications-create-notification)
   * @return {Promise}        The http response
   */
  createNotification(options = {}) {
    // Add the app_id to the options since this is needed for every request
    options.app_id = options.appId || this.appId;

    let requestUrl = this.baseUrl + '/notifications';

    let requestOptions = {
      method: 'POST',
      url: requestUrl,
      json: true,
      headers: { Authorization: `Basic ${this.restApiKey}` },
      body: options
    };

    return new Promise((resolve, reject) => {
      request(requestOptions, (error, response, body) => {
        if (error) { reject(error); }

        if (!error && response.statusCode == 200) {
          resolve(body);
        } else {
          reject(new Error(body));
        }
      });
    });
  }

}

export default OneSignal;
