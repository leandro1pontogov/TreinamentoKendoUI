$(function () {
  $("#grid").kendoGrid({
    height: "60%",
    selectable: "row",
    change: "onRowSelect",
    columns: [
      { field: "Nome" },
      { field: "Categoria" },
      { field: "Preco" },
      { field: "DataCadastro", format: "{0:dd/MM/yyyy}" },
      { field: "Ativo", template: "#= Ativo ? 'Sim' : 'Nao' #" },
    ],
    columnMenu: true,
    dataSource: {
      transport: {
        read: function(options){
          options.success(JSON.parse(localStorage.getItem("produtos")) || [])
        }
      }
    },
    pageable: {
      pageSize: 30,
      input: true,
      pageSizes: true,
    },
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
    value: 0.00,
    min: 0
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

  $("#botao-fechar").kendoButton({}).on("click", function () {
    $("#tela-cadastro").data("kendoWindow").close();
  });


  $("#botao-gravar").kendoButton().on("click", function () {

    if ($("#textbox").val() !== "") {

      const produtos = JSON.parse(localStorage.getItem("produtos")) || [];

      produtos.push({
        Nome: $("#textbox").val(),
        Categoria: $("#categoria").val(),
        Preco: parseFloat($("#preco").val()),
        DataCadastro: kendo.parseDate($("#data").val()),
        Ativo: $("#ativo").data("kendoSwitch").check()
      });

      localStorage.setItem("produtos", JSON.stringify(produtos));
      $("#grid").data("kendoGrid").dataSource.read(produtos)

    } else {
      $("#msgErroNome").show().delay(2000).fadeOut();
    }

    if ($("#categoria").val() !== "") {

    } else {
      $("#msgErroCategoria").show().delay(2000).fadeOut();
    }

    if ($("#data").val() !== "") {

    } else {
      $("#msgErroData").show().delay(2000).fadeOut();
    }

  });

  $("#tabstrip").kendoTabStrip({
    dataTextField: "Name",
    dataSource: [
      { Name: "Detalhes" },
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
