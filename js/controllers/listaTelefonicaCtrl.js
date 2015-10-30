angular.module("listaTelefonica").controller("listaTelefonicaCtrl", function ($scope, $filter, $http) {
	$scope.app = "Lista Telefonica";
	$scope.contatos = [];
	$scope.operadoras =[];
	var carregarContatos = function () {
		$http.get("http://localhost:3000/contatos").success(function (data) {
			$scope.contatos = data;
		}).error(function (data, status){
			$scope.message = "Aconteceu um problema: " + data;
		});	
	};
	var carregarOperadoras = function () {
		$http.get("http://localhost:3000/operadoras").success(function (data) {
			$scope.operadoras = data;
		}).error(function (data, status){
			$scope.errors = data;
		});	
	};
	$scope.adicionarContato = function (contato) {
		contato.data =  new Date();
		$http.post("http://localhost:3000/contatos", contato).success(function (data){
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