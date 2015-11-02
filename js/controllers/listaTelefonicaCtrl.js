angular.module("listaTelefonica").controller("listaTelefonicaCtrl", function ($scope, $filter, $http, contatosAPI, operadorasAPI, serialGenerator) {
	$scope.app = "Lista Telefonica";
	$scope.contatos = [];
	$scope.operadoras =[];
	$scope.contato = {
		data: new Date()
	};

	var carregarContatos = function () {
		contatosAPI.getContatos().success(function (data) {
			$scope.contatos = data;
		}).error(function (data, status){
			$scope.error = "Não foi possível carregar os dados!"
		});	
	};
	var carregarOperadoras = function () {
		operadorasAPI.getOperadoras().success(function (data) {
			$scope.operadoras = data;
		}).error(function (data, status){
			$scope.errors = data;
		});	
	};
	$scope.adicionarContato = function (contato) {
		contato.serial = serialGenerator.generate();
		contatosAPI.saveContato(contato).success(function (data){
			carregarContatos();
		});
		delete $scope.contato;
		$scope.contatoForm.$setPristine();
	};
	$scope.apagarContatos = function (contatos) {
		$scope.contatos = contatos.filter(function (contato) {
			if (!contato.selecionado) return contato;
		});
	};
	$scope.isContatoSelecionado = function (contatos) {
		return contatos.some(function (contato) {
			return contato.selecionado;
		});
	};
	$scope.ordenarPor = function (campo) {
		$scope.criterioDeOrdenacao = campo;
		$scope.direcaoDaOrdenacao = !$scope.direcaoDaOrdenacao;
	};
	carregarOperadoras();
	carregarContatos();
});