require('stringformat').extendString('format');
require('es6-promise').polyfill();
require('isomorphic-fetch');
var md5=require('md5');
var base64 = require('base-64');
var moment=require('moment');



var appId, accountSid, authToken='';
var protocol='https';
var domain='app.cloopen.com';
var port=8883;
var version='2013-12-26';
function init(_appId, _accountSid, _authToken, options) {
    appId=_appId;
    accountSid=_accountSid;
    authToken=_authToken;
    if (options) {
        if (options.protocol) protocol=options.protocol;
        if (options.domain) domain=options.domain;
        if (options.port) port=options.port;
        if (options.version) version=options.version;
    }
}

function api(path, params, callback) {
    var now=new Date();
    params.appId=appId;
    var url=getUrl('/Accounts/{sid}/{path}?sig={sig}'.format({sid:accountSid, path:path, sig:genSig(now)}));
    fetch(url, { headers: {'Authorization':genAuthorization(now), 'Accept':'application/json', 'Content-Type':'application/json;charset=utf-8'},
        method:'POST',
        body:JSON.stringify(params)
    }).then(checkStatus).then(function(res) {
        return res.json();
    }).catch(function(err) {
        return callback(err);
    }).then(function(data) {
        callback(null, data);
    });
}

function getUrl(_path) { return protocol+'://'+domain+':'+port+'/'+version+_path; }
function genSig(time) { return md5(accountSid+authToken+moment(time).format('YYYYMMDDHHmmss')).toUpperCase(); }
function genAuthorization(time) { return base64.encode(accountSid+':'+moment(time).format('YYYYMMDDHHmmss'));}


function checkStatus(res) {
    if (res.status>=200 && res.status<300) return res;
    else {
        var err = new Error(res.statusText);
        err.res = res;
        throw err;
    }
}




module.exports={init:init, api:api};