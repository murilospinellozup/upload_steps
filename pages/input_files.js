
let urlAuth = "https://keycloak-saas.apirealwave.io/auth/realms/sodexo/protocol/openid-connect/token/";

let urlFilesBase = "http://localhost:8282/sodexoextension/v1"
let urlXLSX = urlFilesBase + "/wizeo/upload"
let urlTXT= urlFilesBase + "/beneficiofacil/upload"
let urlJSON = urlFilesBase + "/pedefacil/upload"

let username = "sodexo.poc.user"
let password = "zup@2018"

function initAuth() {

	REST(urlAuth,
		"POST", { "Content-Type": "application/x-www-form-urlencoded" },
		"grant_type=password&client_id=realwave_iam_ui&username=" + username + "&password=" + password,

		(data) => {
			if (data.access_token) {

				initializeUploadInputs("file1", urlXLSX, data.access_token);
				initializeUploadInputs("file2", urlTXT, data.access_token);
				initializeUploadInputs("file3", urlJSON, data.access_token);
			}
		});
}

// Helper function that formats the file sizes
function formatFileSize(bytes) {
	if (typeof bytes !== 'number') {
		return '';
	}

	if (bytes >= 1000000000) {
		return (bytes / 1000000000).toFixed(2) + ' GB';
	}

	if (bytes >= 1000000) {
		return (bytes / 1000000).toFixed(2) + ' MB';
	}

	return (bytes / 1000).toFixed(2) + ' KB';
}
// Prevent the default action when a file is dropped on the window
$(document).on('drop dragover', function (e) {
	e.preventDefault();
});

$(document).ready(function () {

	$(".custom-file-input").change(function () {
		let typeFileRule = $(this).attr("file-type").toUpperCase()
		let typeFile = $(this).val().split(".")[$(this).val().split(".").length - 1].toUpperCase()
		if (typeFile != typeFileRule) {
			showError(`Formato inválido! Selecione arquivos com formato ${typeFileRule}`)
			return
		}
		$(this).parent().find(".custom-file-label").text($(this).val())
	});

	initAuth();

});

function initializeUploadInputs(idInput, url, access_token) {
	//////
	// Initialize the jQuery File Upload plugin

	let headers = {
		"Access-Control-Allow-Credentials": true,
		"origin": "http://localhost",
		"x-organization-slug": "sodexo",
		"x-application-id": "sodexo_poc",
		"Authorization": `Bearer ${access_token}`,
		"x-Application-key":"9bb72ec0d3cf01364eeb000d3ac06d76",
		"filename": "xpto.json"
	};

	// Select your input type file and store it in a variable
	const input = document.getElementById(idInput);

	console.log(access_token, url);

	function readFile(event) {
		
		progressBarShow();

		fetch(`${url}`, {
			method: 'POST',
			withCredentials: false,
			headers: headers,
			body: event.target.result
		}).then(
			response => response.json() 
		).then(
			success => {
				console.log('SUCCESS: ' + success) // Handle the success response object
				showSucess("Lote: "+success.id)
				
			}
		).catch(
			error => {
				console.log(error) // Handle the error response object
				progressBarHide();
			}
		)
	}
	
	function changeFile() {
		var file = input.files[0];
		var reader = new FileReader();
		reader.addEventListener('load', readFile);
		reader.readAsText(file);
	}
	
	input.addEventListener('change', changeFile);

}