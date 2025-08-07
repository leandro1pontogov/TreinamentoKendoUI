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
      { Nome: "Celular", Categoria: "Eletronico", Preco: "2000.0", DataCadastro: "07/08/2025", Ativo: "Sim" },
      { Nome: "Sofa", Categoria: "Moveis", Preco: "750", DataCadastro: "02/03/2025", Ativo: "Nao" },
    ]
  });

  $("#toolbar").kendoToolBar({
    items: [
      {type : "spacer"},
      {
        type: "buttonGroup",
        buttons: [
          {
            text: "Incluir", click: function () {

              if (!$("#tela-cadastro").data("kendoWindow")) {
                $("#tela-cadastro").kendoWindow({
                  width: 500,
                  height: 300,
                  title: "Cadastro",
                  visible: false
                });
              }


              if (!$("#textbox").data("kendoTextBox")) {
                $("#textbox").kendoTextBox({
                  label: "Nome",
                  placeholder: "Digite o nome..."
                });
              }

              $("#textbox").closest(".k-textbox").show();

              $("#tela-cadastro").data("kendoWindow").center().open();

              $("#categoria").kendoDropDownList({
                dataSource: [
                  {name: "Eletronico"},
                  {name: "Moveis"},
                  {name: "Eletrodomestico"}
                ],
                dataTextField: "name",
                dataValueField: "name"
              });

              var categoria = $("#categoria").data("kendoDropDownList");
              categoria.dataSource.add({name: "Comida"});
              categoria.search("A");

            }
          },
          {
            text: "Editar", click: function () {
              if (!$("#tela-cadastro").data("kendoWindow")) {
                $("#tela-cadastro").kendoWindow({
                  visible: false,
                  width: 500,
                  height: 500,
                  title: "Editar"
                });
              }

              if (!$("#textbox").data("kendoTextBox")) {
                $("#textbox").kendoTextBox({
                  label: "Nome",
                  placeholder: "Digite o nome..."
                });
              }

              $("#textbox").closest(".k-textbox").show();

              $("#tela-cadastro").data("kendoWindow").center().open();
            }
          },
        ]
      },
      {
      }
    ]
  });
});
