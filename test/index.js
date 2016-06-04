var should=require('should');
var ytx=require("../src");

describe('tests', function() {
    before(function(done) {
        var appId='aaf98f8954939ed50154a8b8a7e41c55';
        var accountSid='aaf98f8954939ed50154a8adf5711c24';
        var authToken='b504d0a23e994b69984ec386249c0567';
        ytx.init(appId, accountSid, authToken);
        done();
    });
    beforeEach(function(done) {
        done();
    });
    it('getList', function(done) {
        var friendlyName='';
        ytx.api('GetSubAccounts', {startNo:0, offset:10}, function(err, result) {
            if (err) console.log(err);
            console.log(result);
            done();
        });
    });
    it('callVerify', function(done) {
        var params={};
        params.verifyCode='123456';	//String	可选	验证码内容，为数字和英文字母，不区分大小写，长度4-8位。当playVerifyCode为空时有效，该参数和playVerifyCode二者不能同时为空，当二者都不为空时优先使用playVerifyCode。
        params.to='13817707029';	//String	必选	接收号码，被叫为座机时需要添加区号，如：01052823298；被叫为分机时分机号由‘-’隔开，如：01052823298-3627
        params.playTimes=3;	//String	可选	循环播放次数，1－3次，默认播放1次。
        ytx.api('Calls/VoiceVerify', params, function(err, result) {
            if (err) console.log(err);
            console.log(result);
            should.equal('000000', result.statusCode);//String	必选	请求状态码，000000为成功，其他错误码则为失败，错误码可参考Rest 错误代码。
            should.exist(result.VoiceVerify.callSid);//	String	必选	一个由32个字符组成的通话唯一标识符，需要应用侧进行保存以便提供给云通讯的技术支持进行相关问题的查询，云通讯根据这唯一标识符进行快速的问题定位，以便能更快的解决问题。
            should.exist(result.VoiceVerify.dateCreated);//	String	电话的创建时间，时间格式为2016-05-30 17:36:42
            should.exist(result.VoiceVerify.orderId);//	String	CM1006920160530173642395439
            done();
        });
    });
    it.only('callTel', function(done) {
        var params={};
        params.sid='9938ecf518e911e6bb9bac853d9f54f3';	//String	必选 子账号Id
        params.token='e84bf1689652211ef72a32d4c76bee8b';	//String	必选 子账号Token
        params.from='13817707020';	//String	必选 主叫电话号码，可以是手机、座机和voip。被叫为座机时需要添加区号，如：01052823298；被叫为分机时分机号由‘-’隔开，如：01052823298-3627
        params.to='18621582686';	//String	必选	被叫电话号码，可以是手机、座机和voip。被叫为座机时需要添加区号，如：01052823298；被叫为分机时分机号由‘-’隔开，如：01052823298-3627
        ytx.api('Calls/Callback', params, function(err, result) {
            if (err) console.log(err);
            console.log(result);
            should.equal('000000', result.statusCode);//String	必选	请求状态码，000000为成功，其他错误码则为失败，错误码可参考Rest 错误代码。
            should.exist(result.callSid);//	String	必选	一个由32个字符组成的通话唯一标识符，需要应用侧进行保存以便提供给云通讯的技术支持进行相关问题的查询，云通讯根据这唯一标识符进行快速的问题定位，以便能更快的解决问题。
            should.exist(result.dateCreated);//	String	电话的创建时间，时间格式为2016-05-30 17:36:42
            done();
        });
    });

});

