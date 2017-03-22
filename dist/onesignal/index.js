'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var OneSignal = function () {
  function OneSignal() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, OneSignal);

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


  _createClass(OneSignal, [{
    key: 'getPlayers',
    value: function getPlayers() {
      var offset = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var limit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 20;

      var requestUrl = this.baseUrl + '/players?';
      requestUrl += 'app_id=' + this.appId + '&';
      requestUrl += 'limit=' + limit + '&';
      requestUrl += 'offset=' + offset;

      var requestOptions = {
        url: requestUrl,
        headers: {
          Authorization: 'Basic ' + this.restApiKey
        }
      };

      return new _bluebird2.default(function (resolve, reject) {
        _request2.default.get(requestOptions, function (error, response, body) {
          if (error) {
            reject(error);
          }

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

  }, {
    key: 'createNotification',
    value: function createNotification() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      // Add the app_id to the options since this is needed for every request
      options.app_id = options.appId || this.appId;

      var requestUrl = this.baseUrl + '/notifications';

      var requestOptions = {
        method: 'POST',
        url: requestUrl,
        json: true,
        headers: { Authorization: 'Basic ' + this.restApiKey },
        body: options
      };

      return new _bluebird2.default(function (resolve, reject) {
        (0, _request2.default)(requestOptions, function (error, response, body) {
          if (error) {
            reject(error);
          }

          if (!error && response.statusCode == 200) {
            resolve(body);
          } else {
            reject(new Error(body));
          }
        });
      });
    }
  }]);

  return OneSignal;
}();

exports.default = OneSignal;