(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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


},{}]},{},[1])