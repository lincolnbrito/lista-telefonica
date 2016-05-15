angular.module("listaTelefonica").controller("listaTelefonicaCtrl", function($scope, $http){
	$scope.app = "Lista Telefônica";
	$scope.contatos = [];

	var carregarContatos = function() {
		$http.get('contatosBackend.php').success(function(data, status){
			$scope.contatos = data;
		}).error(function(data, status){
			$scope.message = "Aconteceu um problema: " + data;
		});
	};

	var carregarOperadoras = function() {
		$http.get('operadorasBackend.php').success(function(data){
			$scope.operadoras = data;
		});
	}

	$scope.adicionarContato = function(contato){
		contato.data = new Date();
		$http.post("contatosBackend.php", contato).success(function(data){
			delete $scope.contato;
			$scope.contatoForm.$setPristine();
			//$scope.contatos.push(angular.copy(contato));
			carregarContatos();
		});				
	};

	$scope.apagarContatos = function(contatos){
		$scope.contatos = contatos.filter(function(contato){
			if(!contato.selecionado){
				return contato;
			}					
		});
	};

	$scope.isContatoSelecionado = function(contatos) {
		return contatos.some(function(contato){
			return contato.selecionado;
		});
	};

	$scope.criterioOrdenacao = 'nome';

	$scope.ordenarPor = function(campo){
		$scope.criterioDeOrdenacao = campo;
		$scope.direcaoOrdenacao = !$scope.direcaoOrdenacao;
	};
	carregarContatos();
	carregarOperadoras();
});