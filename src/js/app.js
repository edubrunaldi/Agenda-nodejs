$("#addContact").click( function () {
	console.log('entrou');
	$("#form_wrapper").append("<form class='form' action='' method='POST'/>")
					 .append("<label>Nome</label>")
					 .append("<input type='text' name='name'>")
					 .append("<label>Numero</label>")
					 .append("<input type='text' name='Numero'>")
					 .append("<button id='form_button'>Enviar</button>")
					 .append("</form>");
});