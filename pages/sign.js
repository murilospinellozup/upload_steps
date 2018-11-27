
let urlAuth = "https://realwavecore-saas.gateway.zup.me/sodexoextension/v1/pedefacil/login?gw-app-key=3e5cd2c0191f0134aa4c021e75abe44c";

// let username = "backger@sodexho.com"
// let password = "12345678"

let initFirstLogin = (username, password, sucess) => {

	if (username == "" || password == "") {
		showError("Usuário e senha obrigatórios");
		return;
	}

	REST(urlAuth,
		"POST", { "Content-Type": "application/json" },
		JSON.stringify({ username: username, password: password }),

		 (data) => {
			sucess()
		});

}

$("#first-login-btn").click(function () {

	// Step1 - login
	initFirstLogin($("#inputEmail").val(), $("#inputPassword").val(), () => {

		// Step2 - to input files
		setPage("input_files");
	});


})