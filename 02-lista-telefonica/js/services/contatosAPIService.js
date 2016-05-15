angular.module("listaTelefonica").factory("contatosAPI", function($http){
	var _getContatos = function(){
		return $http.get('contatosBackend.php');
	};

	var _saveContato = function(contato){
		return $http.post("contatosBackend.php", contato);
	};

	return {
		getContatos: _getContatos,
		saveContato: _saveContato
	}
});