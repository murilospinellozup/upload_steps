

let setPage = (name) => $('#container').load(`pages/${name}.html`)


// automatic steps
$(document).ready(function () {
	setPage("sign");
});