$(function () {
  $("#grid").kendoGrid({
    height: "60%",
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
    ],
    pageable: {
    pageSize: 2,
    input: true,
    pageSizes: true
  }
  });

  $("#toolbar").kendoToolBar({
    items: [
      { type: "spacer" },
      {
        type: "buttonGroup",
        buttons: [
          {
            text: "Incluir", click: function () {

              if (!$("#tela-cadastro").data("kendoWindow")) {
                $("#tela-cadastro").kendoWindow({
                  width: 300,
                  height: 300,
                  title: "Cadastro",
                  visible: false
                });
              }


              if (!$("#textbox").data("kendoTextBox")) {
                $("#textbox").kendoTextBox({
                  placeholder: "Digite o nome...",
                  width: 250,
                });
              }

              $("#textbox").closest(".k-textbox").show();

              $("#tela-cadastro").data("kendoWindow").center().open();

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

  $("#categoria").kendoDropDownList({
    dataSource: [
      { name: "Eletronico" },
      { name: "Moveis" },
      { name: "Eletrodomestico" },
    ],
    dataTextField: "name",
    dataValueField: "name"
  });

  var categoria = $("#categoria").data("kendoDropDownList");
  categoria.dataSource.add({ name: "Comida" });
  categoria.search("A");

  $("#preco").kendoNumericTextBox({
    label: "Preco",
    format: "c0",
    decimals: 1,
    value: 0.00
  });

  $("#data").kendoDatePicker({
    start: "year",
  });

  $("#ativo").kendoSwitch({
    messages: {
      checked: "ativo",
      unchecked: "inativo",
    },
    width: 80,
    checked: false,
    trackRounded: "small"
  })

  $("#botao-excluir").kendoButton({
    
  });

  $("#botao-fechar").kendoButton({
    
  });

  $("#botao-gravar").kendoButton({
    
  });

   $("#tabstrip").kendoTabStrip({
    dataTextField: "Name",
    dataSource: [
      { Name: "Detalhes"},
    ]
  });

  $("#tab-nome").kendoTextBox({
    readonly: true
  });

  $("#tab-categoria").kendoTextBox({
    readonly: true
  });

  $("#tab-preco").kendoTextBox({
    readonly: true
  });

  $("#tab-data").kendoTextBox({
    readonly: true
  });

  $("#tab-ativo").kendoTextBox({
    readonly: true
  });

});
