var ytx=require("../src");

var appId='aaf98f895453453454b8a7e41c54';
var accountSid='aaf98f895495435345454a8adf5711c23';
var authToken='b504d0a235345435386249c0566';

ytx.init(appId, accountSid, authToken);
ytx.api('GetSubAccounts', {startNo:0, offset:10}, function(err, result) {
    //……
}

ytx.api('Calls/VoiceVerify', params, function(err, result) {
    //……
});