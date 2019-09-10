$.extend($.validator.messages, {
    required: "这是必填字段",
    ip: "输入格式不正确",
    cird: '输入格式不正确',
    max: "输入超过了最大值",
    min: "输入小于最小值",
    mask: "网关不可达",
    remote: "该名称已存在"
});

$.validator.addMethod("ip",function(value,element,params){
    var ipReg = /^(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)\.(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)\.(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)\.(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)$/;

    if( value === '' ) {
        return true;
    }

    return ipReg.test( value );

},"IP格式不正确");


$.validator.addMethod("mask",function(value,element,params){
    var ipArr = $( '#config input[name="IP"]' ).val().split( '.' ),
        gatewayArr = $( '#config input[name="gateway"]' ).val().split( '.' ),
        netmaskArr = value.split( '.' ),
        len = 4,
        i = 0;

    
    if( ipArr.length !== len || gatewayArr.length !== len || netmaskArr.length !== len ) {
        return false;
    }

    for( ; i < len; i++ ) {
        if( ( ipArr[ i ] & netmaskArr[ i ] ) !== ( gatewayArr[ i ] & netmaskArr[ i ] ) ) {
            return false;
        }
    }

    return true;

},"网关不可达");