
function REST(url, method, data, headers, callback) {

	data['headers'] = headers;

	console.log("url " + url);
	progressBarShow();

	$.ajax({
		url: url,
		method: method,
		data: data,
		crossDomain: true,
		dataType: "json"
	})

		.done(function (msg) {
			progressBarHide();

			callback(msg);

		})

		.fail(function (jqXHR, textStatus) {
			console.log("FAIL::::::::::::::::::");
			console.log(jqXHR);
			progressBarHide();
			showRestError(textStatus);
		});


}

function progressBarShow() {
	waitingDialog.show();
}

function progressBarHide() {
	waitingDialog.hide();
}

function showRestError(textStatus) {
 

}




function showAlertConfirm(titulo, message, clickok, clickfalse) {

	if (typeof $("#showAlertConfirm") != "undefined") {

		$("#showAlertConfirm").remove();
	}


	progressBarShow();

	var html = '<p> ' + message + ' </p><br>';

	html += '<button id="btn_ok" type="button" class="button button-block button-positive"> Ok </button>';
	html += '<button id="btn_cancel" type="button" class="button button-block button-default"> Cancelar </button>';



	$('<div id="showAlertConfirm" title="' + titulo + '" />').html(html).dialog({ modal: true, close: function () { onDialogHide(); clickfalse(); } });
	onDialogShow();

	$("#btn_ok").click(function () {
		onDialogHide();
		clickok();
	});

	$("#btn_cancel").click(function () {
		onDialogHide();
		clickfalse();
	});

	progressBarHide();
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