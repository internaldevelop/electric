var Pop = require( '../../../public/js-dev/pop' );
var pop = new Pop( $( '#popModal' ) );

//表单验证
( function() {
	var $form = $( '#pwChange' );

	$.extend($.validator.messages, {
		required: "这是必填字段",
		equalTo: "两次输入密码不匹配",
		notEqualTo: "新密码不能与原始密码相同"
	});
	
	jQuery.validator.addMethod( 'notEqualTo', function(value, element, param) {
		if( value !== $( param ).val() ) {
			return true;
		}
		return false;
	} )
	
	$form.validate( {
	    rules: {
	    	'username': 'required',
	    	'realName': 'required',
	    	'oldPs': 'required',
	    	'newPs': {
	    		required: true,
	    		notEqualTo: '#oldPs'
	    	},
	    	'confirmNewPs': {
	    		required: true,
	    		equalTo: "#newPs",
	    		notEqualTo: '#oldPs'
	 		}
	 	}
	} );
	
	$( '.submit' ).click( function() {
		var $loading = $( '.loading' ),
			$this = $( this );
		
		if( $("#pwChange").valid() ) {
			$loading.show();
			$this.attr( 'disabled', 'disabled' );

			$.ajax( {
				url:'changePs?' + $form.serialize(),
				type: 'GET',
				dataType: 'JSON'
			}).then( function( json ) {
				switch ( json.changeState ) {
					case 1:
						$( '#realName' ).attr( 'readonly', 'readonly' );
						pop.success( '修改成功!' );
						G.isFirst = -1;
						break;
					case -1:
						pop.error( '原始密码错误!' );
						break;
					case -2:
						pop.error( '两次输入密码不匹配' );
						break;
					case -3:
						pop.error( '新密码不能与原始密码相同!' );
						break;
					default:
						pop.error( '修改失败!' );
						break;
				}
				
				$loading.hide();
				$this.removeAttr( 'disabled' );
			} )
		}
	} )
} )();

//如果是首次禁止点击其他链接
( function() {
	$( '.page-sidebar-menu' ).delegate( 'a', 'click', function( e ) {
		if( G.isFirst === '1' ) {
			e.preventDefault();
			e.stopImmediatePropagation();
			pop.normal( '请先填写姓名并修改密码!' );
		}
	} )
} )();
