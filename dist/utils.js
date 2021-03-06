'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.buildUrl = exports.userAgentString = exports.getJson = exports.checkStatus = exports.normalizeRequest = exports.stripPreSlash = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _package = require('../package.json');

var os = require('os');

var BASE_HOST = process.env.PATREON_OAUTH_HOST || 'https://www.patreon.com';
var BASE_PATH = 'api/oauth2/api';

function buildUrl(path) {
    return BASE_HOST + path;
}

function stripPreSlash(str) {
    return str.replace(/^\//, '');
}

function normalizeRequest(request) {
    return typeof request === 'string' ? {
        url: BASE_HOST + '/' + BASE_PATH + '/' + stripPreSlash(request),
        method: 'GET'
    } : _extends({}, request, {
        url: BASE_HOST + '/' + BASE_PATH + '/' + stripPreSlash(request.url || request.uri || '')
    });
}

function checkStatus(response) {
    return response.status >= 200 && response.status < 300 ? Promise.resolve(response) : Promise.reject(response);
}

function getJson(response) {
    return response.json();
}

function userAgentString() {
    return 'Patreon-JS, version ' + _package.version + ', platform ' + os.platform() + '-' + os.release() + '-' + os.arch();
}

exports.stripPreSlash = stripPreSlash;
exports.normalizeRequest = normalizeRequest;
exports.checkStatus = checkStatus;
exports.getJson = getJson;
exports.userAgentString = userAgentString;
exports.buildUrl = buildUrl;