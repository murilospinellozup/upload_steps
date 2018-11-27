
let urlAuth = "https://keycloak-saas.apirealwave.io/auth/realms/sodexo/protocol/openid-connect/token/";

let urlFilesBase = "https://realwavecore-public-saas.gateway.zup.me/sodexoextension/v1"
let urlXLSX = urlFilesBase + "/wizeo/upload?gw-app-key=9bb72ec0d3cf01364eeb000d3ac06d76"
let urlTXT= urlFilesBase + "/beneficiofacil/upload?gw-app-key=9bb72ec0d3cf01364eeb000d3ac06d76"
let urlJSON = urlFilesBase + "/pedefacil/upload?gw-app-key=9bb72ec0d3cf01364eeb000d3ac06d76"

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

		console.log("change")
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
		"x-organization-slug": "sodexo",
		"x-application-id": "sodexo_poc",
		"Content-Type": "application/x-www-form-urlencoded",
		"Authorization": `Bearer ${access_token}`

	};

	// Select your input type file and store it in a variable
	const input = document.getElementById(idInput);

	// This will upload the file after having read it
	const upload = (file) => {
		var reader = new FileReader()
		reader.onload = (e) => {
 
			var arrayBuffer = reader.result;

			fetch(url, { // Your POST endpoint
				method: 'POST',
				headers: headers,
				body: arrayBuffer // This is your file object
			}).then(
				response => response.text() // if the response is a JSON object
			).then(
				success => console.log(success) // Handle the success response object
			).catch(
				error => console.log(error) // Handle the error response object
			);
		}
		reader.readAsBinaryString(file);
		
	};

	// Event handler executed when a file is selected
	const onSelectFile = () => upload(input.files[0]);

	// Add a listener on your input
	// It will be triggered when a file will be selected
	input.addEventListener('change', onSelectFile, false);
 
		// $(idInput).fileupload({
		// 	url: url,
		// 	type: "POST",  
		// 	dataType: "json",  
		// 	headers: headers, 
		// 	beforeSend: function(xhr) { 
		// 		xhr.setRequestHeader("x-organization-slug", "sodexo")
		// 		xhr.setRequestHeader("x-application-id", "sodexo_poc")
		// 		xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
		// 		xhr.setRequestHeader("Authorization", `Bearer ${access_token}`)
		// 		xhr.setRequestHeader("origins", "*")
		// 		xhr.setRequestHeader("x-Application-key", "9bb72ec0d3cf01364eeb000d3ac06d76")
		// 		xhr.setRequestHeader("filename", "test.json")		 
		// 		console.log("url", url)			
		// 		console.log("headers", headers)

		// 	}, 
		// 	send: function (e, data) {

		// 		console.log("send", data)
		// 		// $.each(data.result.files, function (index, file) {
		// 		// 	$('<p/>').text(file.name).appendTo('#files');
		// 		// });
		// 	},
		// 	fail: function (e, data) {

		// 		console.log("fail", data)
		// 		// $.each(data.result.files, function (index, file) {
		// 		// 	$('<p/>').text(file.name).appendTo('#files');
		// 		// });
		// 	},
		// 	done: function (e, data) {

		// 		console.log("done", data)
		// 		// $.each(data.result.files, function (index, file) {
		// 		// 	$('<p/>').text(file.name).appendTo('#files');
		// 		// });
		// 	},
		// 	progressall: function (e, data) {
		// 		var progress = parseInt(data.loaded / data.total * 100, 10);
		// 		console.log("progress", progress)
		// 		// $('#progress .progress-bar').css(
		// 		// 	'width',
		// 		// 	progress + '%'
		// 		// );
		// 	}
		// }) 

}