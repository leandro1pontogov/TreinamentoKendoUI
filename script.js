let modoEdicao = false;
let idProdutoEditando = null;
let produtoSelecionado = null;

$(function () {
  $("#grid").kendoGrid({
    height: "60%",
    selectable: "row",
    change: selecionado,
    columns: [
      { field: "Nome" },
      { field: "Categoria" },
      { field: "Preco", format: "{0:0.00}", width: "10%" },
      { field: "DataCadastro", type: "date", format: "{0:dd/MM/yyyy}", width: "10%" },
      { field: "Ativo", template: "#= Ativo ? 'Sim' : 'Nao' #", width: "10%" },
    ],
    columnMenu: true,
    dataSource: {
      transport: {
        read: function (options) {
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
              modoEdicao = false;
              idProdutoEditando = null;

              if (!$("#tela-cadastro").data("kendoWindow")) {
                $("#tela-cadastro").kendoWindow({
                  width: 300,
                  height: 300,
                  title: "Cadastro",
                  visible: false
                });
              }

              $("#textbox").val("");
              $("#categoria").data("kendoDropDownList").value(null);
              $("#preco").data("kendoNumericTextBox").value("");
              $("#data").val("");
              $("#ativo").data("kendoSwitch").value("");

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
            text: "Editar", enable: false, id: "btnEditar", click: function () {

              if (!$("#tela-cadastro").data("kendoWindow")) {
                $("#tela-cadastro").kendoWindow({
                  visible: false,
                  width: 300,
                  height: 300,
                  title: "Cadastro"
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
    prefixOptions: {
      value: 0.00,
    },
    label: "Preco",
    format: "{0:0.00}",
    decimals: 2,
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

  $("#botao-excluir").kendoButton().off("click").on("click", function () {

    const produtos = JSON.parse(localStorage.getItem("produtos")) || [];
    let grid = $("#grid").data("kendoGrid");
    var produtoSelecionado = grid.dataItem(grid.select())

    const novosDados = produtos.filter(a => (a.id !== produtoSelecionado.id))

    localStorage.setItem("produtos", JSON.stringify(novosDados));
    $("#grid").data("kendoGrid").dataSource.read();
    $("#tela-cadastro").data("kendoWindow").close();
  });

  $("#botao-fechar").kendoButton({}).off("click").on("click", function () {
    $("#tela-cadastro").data("kendoWindow").close();
  });


  $("#botao-gravar").kendoButton().off("click").on("click", function () {

    if ($("#textbox").val() === "") {
      $("#msgErroNome").show().delay(2000).fadeOut();
      return;
    }

    if ($("#categoria").val() === "") {
      $("#msgErroCategoria").show().delay(2000).fadeOut();
      return;
    }

    if ($("#data").val() === "") {
      $("#msgErroData").show().delay(2000).fadeOut();
      return;
    }

    const produtos = JSON.parse(localStorage.getItem("produtos")) || [];

    if (modoEdicao && idProdutoEditando !== null) {
      const index = produtos.findIndex(p => p.id === idProdutoEditando);
      if (index !== -1) {
        produtos[index] = {
          id: produtoSelecionado.id,
          Nome: $("#textbox").val(),
          Categoria: $("#categoria").val(),
          Preco: parseFloat($("#preco").val()),
          DataCadastro: kendo.parseDate($("#data").val()),
          Ativo: $("#ativo").data("kendoSwitch").check()
        };
      }
    } else {
      let novoId = 1;
      if (produtos.length > 0) {
        novoId = Math.max(...produtos.map(p => p.id)) + 1;
      }
      produtos.push({
        id: novoId,
        Nome: $("#textbox").val(),
        Categoria: $("#categoria").val(),
        Preco: parseFloat($("#preco").val()),
        DataCadastro: kendo.parseDate($("#data").val()),
        Ativo: $("#ativo").data("kendoSwitch").check()
      });
    }

    localStorage.setItem("produtos", JSON.stringify(produtos));
    $("#grid").data("kendoGrid").dataSource.read();
    $("#tela-cadastro").data("kendoWindow").close();

    modoEdicao = false;
    idProdutoEditando = null;

  });

  $("#btnEditar").on("click", function () {
    if (!produtoSelecionado) return;
    modoEdicao = true;
    idProdutoEditando = produtoSelecionado.id;

    $("#textbox").val(produtoSelecionado.Nome);
    $("#categoria").data("kendoDropDownList").value(produtoSelecionado.Categoria);
    $("#preco").data("kendoNumericTextBox").value(produtoSelecionado.Preco);
    $("#data").data("kendoDatePicker").value(produtoSelecionado.DataCadastro);
    $("#ativo").data("kendoSwitch").value(produtoSelecionado.Ativo);

    $("#tela-cadastro").data("kendoWindow").center().open();
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

  function selecionado() {
    let grid = $("#grid").data("kendoGrid");
    let linhaSelecionada = grid.select();
    let dataSelecionada = grid.dataItem(linhaSelecionada);

    if (dataSelecionada) {
      produtoSelecionado = dataSelecionada;

      $("#tab-nome").val(dataSelecionada.Nome);
      $("#tab-categoria").val(dataSelecionada.Categoria);
      $("#tab-preco").val(dataSelecionada.Preco);
      $("#tab-data").val(dataSelecionada.DataCadastro);

      if (dataSelecionada.Ativo === true) {
        $("#tab-ativo").val("Sim");
      } else {
        $("#tab-ativo").val("Nao");
      }

      $("#toolbar").data("kendoToolBar").enable("#btnEditar");
    }
  }

});
