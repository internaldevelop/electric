//表单验证
( function() {
	var $form = $( '#reset' ),
		$alert = $( '.alert' ).hide();

	$.extend($.validator.messages, {
		required: "这是必填字段"
	});
	
	$form.validate( {
	    rules: {
	    	'username': 'required',
	    	'realName': 'required',
	    	'ps': 'required'
	 	}
	} );
	
	$( '.submit' ).click( function() {
		var $loading = $( '.loading' ),
			$this = $( this );
		
		if( $("#pwChange").valid() ) {
			$loading.show();
			$this.attr( 'disabled', 'disabled' );

			$.ajax( {
				url:'reset?' + $form.serialize(),
				type: 'GET',
				dataType: 'JSON'
			}).then( function( json ) {
				$alert.removeClass( 'alert-success alert-danger' ).show();
				switch ( json.state ) {
					case 1:
						$( '#realName' ).attr( 'readonly', 'readonly' );
						$alert.addClass( 'alert-success' ).text( '重置成功！' );
						break;
					case -1:
						$alert.addClass( 'alert-danger' ).text( '重置失败！' );
						break;
					default:
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
			alert('请先填写姓名并修改密码！')
		}
	} )
} )();
