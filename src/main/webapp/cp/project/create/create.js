var Pop = require( '../../../public/js-dev/pop' );
var pop = new Pop( $( '#popModal' ) );

if( G.bizNo > 0 ) {
	pop.sure( '创建项目成功!<br/>是否跳转到项目列表页?' );

	pop.on( '.ok', 'click', function() {
		location.href = $( '.project_list a' ).attr( 'href' );
  	} );
} else if( G.bizNo < 0 ) {
	pop.error( '创建项目失败!' );
}


$( function() {
	var config = $( '#config' ),
		validateObj;

	$.validator.addMethod( "ip", function( value, element, params ) {
		var cidrReg = /^(?:(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)\.(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)\.(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)\.(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)(?:\/(?:3[0-1]|[1-2]?\d))?)$/,
			ipReg = /^(?:(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)(\-(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d))?\.(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)(\-(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d))?\.(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)(\-(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d))?\.(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d))$/,
			ipArr = value.trim().split( /\s+/ ),
			i;
			
		for( i = 0; i < ipArr.length; i++ ) {
			if( cidrReg.test( ipArr[ i ] ) || ipReg.test( ipArr[ i ] ) ) {
				continue;
			}
			return false;
		}

		return true;

	}, "输入格式不正确");

	validateObj = config.validate( {
	    rules: {
	    	projectName: {
	    		required: true,
	    		remote: {
                    type: "GET",
                    url: "project_exist",
                    dataType: "json",
                    data: {
                        name: function () {
                            return $( 'input[name="projectName"]' ).val();
                        }
                    }
                }
	    	},
	    	target: {
	    		required: true,
	    		ip: true
	    	}
	 	},
	 	messages: {
	 		title: {
                remote: "该项目名称已存在！"
	 		}
	 	},
	 	onkeyup: false,//这个地方要注意，修改去控制器验证的事件。
	 	ignore: '.ignore'
	} );

	var submitClick = 0;
	$( '.submit' ).click( function() {
		if( submitClick < 1 ) {
			if( config.valid() ) {
				submitClick++;
				return true;
			} else {
				return false;
			}
		} else {
			return false;
		}
		
	} )	
} )
