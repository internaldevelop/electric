/*
 * 基于bootstrap弹出框，支持成功、警告、失败和普通弹出框
*/

/* 
 * Pop constructor
 * @param {jquery} $modal
*/
function Pop( $modal ) {
	if( !$modal || !$modal.jquery ) {
		throw new Error( 'please ensure input an effective parameter!' );
	}
	this.modal = $modal;
	this._init();
}

Pop.prototype._init = function( msg ) {
	this.modal.addClass( 'pop' );
	this.modal.find( '.modal-header' ).addClass( 'pop-header' );
	this.modal.find( '.modal-footer' ).addClass( 'pop-footer' );
	this.modal.find( '.modal-body' ).addClass( 'pop-body' )
			.html( '<i class=""></i>' +
					 '<p class="pop-text">' + msg + '</p>' );

	//窗口隐藏时自动注销确定按钮绑定的事件
	this.modal.on( 'hidden.bs.modal', function () {
 		this.modal.find( '.pop-footer .ok' ).off();
	}.bind( this ));
}

Pop.prototype.sure = function( msg ) {
	this._show( 'sure', msg );
}
Pop.prototype.normal = function( msg ) {
	this._show( 'normal', msg );
}
Pop.prototype.success = function( msg ) {
	this._show( 'success', msg );
}
Pop.prototype.warning = function( msg ) {
	this._show( 'warning', msg );
}
Pop.prototype.error = function( msg ) {
	this._show( 'error', msg );
}
Pop.prototype.hide = function( callback ) {
	this.modal.on( 'hidden.bs.modal.tmp', function () {
		this.modal.off( 'hidden.bs.modal.tmp' );
 		callback && callback();
	}.bind( this ));
	
	this.modal.modal( 'hide' );
}
//绑定事件
Pop.prototype.on = function( selecter, type, fun ) {
	this.modal.find( selecter ).on( type, fun );
}
Pop.prototype._show = function( type, msg ) {
	this.modal.find( '.pop-footer .ok' ).hide();
	this.modal.find( '.pop-footer .cancel' ).show().text( '确定' );
	switch ( type ) {
		case 'sure':
			this.modal.find( '.pop-footer .ok' ).show().text( '确定' );
			this.modal.find( '.pop-footer .cancel' ).show().text( '取消' );

			this.modal.find( '.pop-body i' ).removeClass().addClass( 'fa fa-question-circle' );
			this.modal.find( '.modal-title' ).text( '确认' );
			break;
		case 'normal':
			this.modal.find( '.pop-body i' ).removeClass().addClass( 'fa fa-info-circle' );
			this.modal.find( '.modal-title' ).text( '提示' );
			break;
		case 'success':
			this.modal.find( '.pop-body i' ).removeClass().addClass( 'fa fa-check-circle' );
			this.modal.find( '.modal-title' ).text( '成功' );
			break;
		case 'warning':
			this.modal.find( '.pop-footer .ok' ).show().text( '确定' );
			this.modal.find( '.pop-footer .cancel' ).show().text( '取消' );

			this.modal.find( '.pop-body i' ).removeClass().addClass( 'fa fa-exclamation-circle' );
			this.modal.find( '.modal-title' ).text( '警告' );
			break;
		case 'error':
			this.modal.find( '.pop-body i' ).removeClass().addClass( 'fa fa-times-circle' );
			this.modal.find( '.modal-title' ).text( '错误' );
			break;
		default:
			break;
	}
	this.modal.find( '.modal-title' ).addClass( 'pop-title' );

	this._emptyAddClass();
	this.modal.addClass( 'pop-' + type );
	this._setContent( type, msg );
	this.modal.modal( 'show' );
}
Pop.prototype._emptyAddClass = function( msg ) {
	this.modal.removeClass( 'pop-success pop-warning pop-error' );
}
Pop.prototype._setContent = function( type, msg ) {
	this.modal.find( '.pop-body .pop-text' ).html( msg || '操作失败!' );
}

module.exports = Pop;