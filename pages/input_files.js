

function initLogin(username, password) {

	REST("https://snack-game.herokuapp.com/snack/login",
		"POST", {}, 
		{ 
			name: username, 
			password: password
		},

		function (data) {

			console.log("data", data);

		});
}