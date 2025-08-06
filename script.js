$(function () {
   $("#grid").kendoGrid({
  columns: [
    { field: "Nome" },
    { field: "Categoria" },
	{ field: "Preco" },
	{ field: "DataCadastro" },
	{ field: "Ativo" },
  ],
  columnMenu: true,
  dataSource: [
    { Nome: "01", Categoria: "002", Preco: "Em Andamento",  DataCadastro: "Teste", Ativo: "Sim"},
    { Id: "02", Sequencia: 33 }
  ]
});

$("#toolbar").kendoToolBar({
        items: [
            { type: "button", id: "btn1", text: "Incluir", click:function(){
			var $incluir = $("#incluir");

			if (!$incluir.data("kendoWindow")) {
        	$incluir.kendoWindow({
            visible: false,
            width: 500,
            height: 500
        });
    }
		var incluir = $("#incluir").data("kendoWindow");
		incluir.open().center();

			}},
            { type: "button", id: "btn2", text: "Editar", click:function(){
			var $editar = $("#editar");

			if (!$editar.data("kendoWindow")) {
        	$editar.kendoWindow({
            visible: false,
            width: 500,
            height: 500
        });
    }
		var editar = $("#editar").data("kendoWindow");
		editar.open().center();

			} }
        ],
    });
  });