
function REST(url, method, headers, data, callback) {

	console.log("url " + url);
	progressBarShow();

	$.ajax({
		type: method,
		url: url,
		data: data,
		dataType: "json",
		headers: headers
	})

		.done(function (msg) {
			progressBarHide();
			console.log("data", msg);
			callback(msg);

		})

		.fail(function (jqXHR, textStatus) {
			console.log(jqXHR);
			showError("Erro na requisição!");
		});
}

function progressBarShow() {
	waitingDialog.show();
}

function progressBarHide() {
	waitingDialog.hide();
}

function showError(textStatus) {

	waitingDialog.show(textStatus, { dialogSize: "sm", progressType: "warning" })

	setTimeout(() => {

		waitingDialog.hide()

	}, 4000)
}


function showSucess(textStatus){
	waitingDialog.show(textStatus, { dialogSize: "sm", progressType: "success" })

	setTimeout(() => {

		waitingDialog.hide()

	}, 4000)
}

function showAlert(message, clickok) {


}

function onDialogHide() {
	$("#showAlertConfirm").remove();
}

var waitingDialog = waitingDialog || (function ($) {
	'use strict';

	// Creating modal dialog's DOM
	var $dialog = $(
		'<div class="modal fade" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog" aria-hidden="true" style="padding-top:15%; overflow-y:visible;">' +
		'<div class="modal-dialog modal-m">' +
		'<div class="modal-content">' +
		'<div class="modal-header"><h3 style="margin:0;"></h3></div>' +
		'<div class="modal-body">' +
		'<div class="progress progress-striped active" style="margin-bottom:0;"><div class="progress-bar" style="width: 100%"></div></div>' +
		'</div>' +
		'</div></div></div>');

	return {
		/**
		 * Opens our dialog
		 * @param message Custom message
		 * @param options Custom options:
		 * 				  options.dialogSize - bootstrap postfix for dialog size, e.g. "sm", "m";
		 * 				  options.progressType - bootstrap postfix for progress bar type, e.g. "success", "warning".
		 */
		show: function (message, options) {
			// Assigning defaults
			if (typeof options === 'undefined') {
				options = {};
			}
			if (typeof message === 'undefined') {
				message = 'Loading';
			}
			var settings = $.extend({
				dialogSize: 'm',
				progressType: '',
				onHide: null // This callback runs after the dialog was hidden
			}, options);

			// Configuring dialog
			$dialog.find('.modal-dialog').attr('class', 'modal-dialog').addClass('modal-' + settings.dialogSize);
			$dialog.find('.progress-bar').attr('class', 'progress-bar');
			if (settings.progressType) {
				$dialog.find('.progress-bar').addClass('progress-bar-' + settings.progressType);
			}
			$dialog.find('h3').text(message);
			// Adding callbacks
			if (typeof settings.onHide === 'function') {
				$dialog.off('hidden.bs.modal').on('hidden.bs.modal', function (e) {
					settings.onHide.call($dialog);
				});
			}
			// Opening dialog
			$dialog.modal();
		},
		/**
		 * Closes dialog
		 */
		hide: function () {
			$dialog.modal('hide');
		}
	};

})(jQuery);