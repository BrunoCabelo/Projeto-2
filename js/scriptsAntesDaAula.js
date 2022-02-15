
// Objeto para pegar os preços e as fotos das camisetas

var camisetas = {
    'branca': {
        
        'gola_v': {
            'sem_estampa': {
                'preco_unit': 5.12,
                'foto': 'v-white.jpg' 
            },
            'com_estampa': {
                'preco_unit': 8.95,
                'foto': 'v-white-personalized.jpg' 
            }
        },
        
        'gola_normal': {
            'sem_estampa': {
                'preco_unit': 4.99,
                'foto': 'normal-white.jpg' 
            },
            'com_estampa': {
                'preco_unit': 8.77,
                'foto': 'normal-white-personalized.jpg' 
            }
        }
    },
    
    'colorida': {
        'gola_v': {
            'sem_estampa': {
                'preco_unit': 6.04,
                'foto': 'v-color.jpg' 
            },
            'com_estampa': {
                'preco_unit': 9.47,
                'foto': 'v-color-personalized.png' 
            }
        },
        
        'gola_normal': {
            'sem_estampa': {
                'preco_unit': 5.35,
                'foto': 'normal-color.jpg' 
            },
            'com_estampa': {
                'preco_unit': 9.28,
                'foto': 'normal-color-personalized.jpg' 
            }
        }
    }
}


// parâmetros da pesquisa

var parametros_pesquisa = {
    "quantidade": 10,
    "cor": "colorida",
    "gola": "gola_v",
    "qualidade": "q150",
    "estampa": "com_estampa",
    "embalagem": "bulk",
    "foto": "img/v-color-personalized.png",
    "total": ""
}


// Regras adicionais para o orçamento:

// 1. Verificar se há em localStorage os parâmetros do último orçamento e se houver, carregar a página com eles.

// 2. A camisa de qualidade alta (190g/m2) deve acrescer o preço unitário em 12%.

// 3. A embalagem unitária tem um custo de 0.15 por unidade

// 4. Após cálculo do preço, há que se aplicar um desconto por quantidade, sendo: 
    // faixa 1: acima de 1.000 - Desconto de 15%
    // faixa 2: acima de 500 - Desconto de 10%
    // faixa 3: acima de 100 - Desconto de 5%



// Resolução do desafio:
var cor, gola, qualidade, estampa, embalagem, quantidade, valorUnit, valorTotal, foto, valorEmbalagem, linkFoto;
//LocalStorage 
function loader(){
    $('.refresh-loader').show();
    window.setTimeout(function(){
        $('.refresh-loader').hide();
    },300);
    
    
}
function storageUp(){
    window.localStorage.setItem('quantidade' , parametros_pesquisa.quantidade);
    window.localStorage.setItem('cor' , parametros_pesquisa.cor);
    window.localStorage.setItem('gola' , parametros_pesquisa.gola);
    window.localStorage.setItem('qualidade' , parametros_pesquisa.qualidade);
    window.localStorage.setItem('estampa' , parametros_pesquisa.estampa);
    window.localStorage.setItem('embalagem' , parametros_pesquisa.embalagem);     
    window.localStorage.setItem('foto' , parametros_pesquisa.foto);   
    window.localStorage.setItem('total' , parametros_pesquisa.total);     
}
function updateParametros(){
    //Setando parametros
    parametros_pesquisa.quantidade = localStorage['quantidade'];
    parametros_pesquisa.cor = localStorage['cor'];
    parametros_pesquisa.gola = localStorage['gola'];
    parametros_pesquisa.qualidade = localStorage['qualidade'];
    parametros_pesquisa.estampa = localStorage['estampa'];
    parametros_pesquisa.embalagem = localStorage['embalagem'];
    parametros_pesquisa.foto = localStorage['foto'];
    parametros_pesquisa.total = localStorage['total'];

    //Setando html
    $('#quantidade').val(localStorage['quantidade']);  
    
    if(localStorage['cor'] == 'branca'){
        $('#branca').addClass('selected');
        $('#colorida').removeClass('selected');  
    }else{
        $('#colorida').addClass('selected');
        $('#branca').removeClass('selected');  
    }

    if(localStorage['gola'] == 'gola_v'){
        $('#gola_v').addClass('selected');
        $('#gola_normal').removeClass('selected');  
    }else{
        $('#gola_normal').addClass('selected');
        $('#gola_v').removeClass('selected');  
    }

    if(localStorage['qualidade'] == 'q150'){
        $('#q150').addClass('selected');
        $('#q190').removeClass('selected');  
    }else{
        $('#q190').addClass('selected');
        $('#q150').removeClass('selected');  
    }

    $('#estampa').val(localStorage['estampa']);

    $('#embalagem').val(localStorage['embalagem']);
    
   

    
}
function updateHTML(){
   if(parametros_pesquisa.gola == "gola_v"){
    $('#result_gola').html('Gola V');
   }else{
    $('#result_gola').html('Gola Normal');
   }

   if(parametros_pesquisa.estampa == "sem_estampa"){
    $('#result_estampa').html('Sem Estampa');
   }else{
    $('#result_estampa').html('Com Estampa');
   }

   if(parametros_pesquisa.qualidade == 'q150'){
    $('#result_qualidade').html('Normal(150g/m2)');
   }else{
    $('#result_qualidade').html('Alta(190g/m2)');
   }

   if(parametros_pesquisa.cor == "branca"){
    $('#result_cor').html("Branca");
   }else{
    $('#result_cor').html("Colorida");
   }
  
   
   
   
   $('#result_embalagem').html(parametros_pesquisa.embalagem);
   $('#result_quantidade').html(parametros_pesquisa.quantidade);
   $('#foto-produto').attr('src', localStorage['foto']);
   $('#valor-total').html(parametros_pesquisa.total);
}

$(function(){
    
    if(localStorage['quantidade'] != undefined){
        loader();
        updateParametros();
        updateHTML();
    }else{
        loader();
        storageUp();
        updateHTML();
    };
    
    

    cor = parametros_pesquisa.cor;
    gola = parametros_pesquisa.gola;
    qualidade = parametros_pesquisa.qualidade;
    estampa = parametros_pesquisa.estampa;
    quantidade = parametros_pesquisa.quantidade;
    embalagem = parametros_pesquisa.embalagem;

    
    //Quantidade
    $('#quantidade').change(function(){
        quantidade = Number($(this).val());
        parametros_pesquisa.quantidade = quantidade;
        console.log(quantidade)
        console.log(typeof quantidade)
        calc();
    });

    //Cor
    $('#branca').click(function(){
        cor = "branca";
        $(this).addClass('selected');
        $('#colorida').removeClass('selected'); 
        parametros_pesquisa.cor = cor;
        calc();
    });
    $('#colorida').click(function(){
        cor = "colorida";
        $(this).addClass('selected');
        $('#branca').removeClass('selected'); 
        parametros_pesquisa.cor = cor;
        calc();
    });

    //gola
    $('#gola_v').click(function(){
        gola = "gola_v";
        $(this).addClass('selected');
        $('#gola_normal').removeClass('selected');
        parametros_pesquisa.gola = gola;
        calc();
    });
    $('#gola_normal').click(function(){
        gola = "gola_normal";
        $(this).addClass('selected');
        $('#gola_v').removeClass('selected');
        parametros_pesquisa.gola = gola;
        calc();
    });

    //Qualidade
    $('#q150').click(function(){
        qualidade = "q150";
        $(this).addClass('selected');
        $('#q190').removeClass('selected');
        parametros_pesquisa.qualidade = qualidade;
        calc();
    });
    $('#q190').click(function(){
        qualidade = "q190";
        $(this).addClass('selected');
        $('#q150').removeClass('selected');
        parametros_pesquisa.qualidade = qualidade;
        calc();
    });

    //Estampa
    $('#estampa').change(function(){
        estampa = $(this).val();
        parametros_pesquisa.estampa = estampa;
        calc();
        
    });

    //Embalagem
    $('#embalagem').change(function(){
        embalagem = $(this).val();
        parametros_pesquisa.embalagem = embalagem;
        calc();
    });
    
    function calc(){
        loader();
    
        //Calculo
        switch(cor){
            case "branca":
                switch(gola){
                    case "gola_v":
                        switch(estampa){
                            case "sem_estampa":
                                valorUnit = camisetas.branca.gola_v.sem_estampa.preco_unit;
                                foto = camisetas.branca.gola_v.sem_estampa.foto;
                                break;
                            case "com_estampa":
                                valorUnit = camisetas.branca.gola_v.com_estampa.preco_unit;
                                foto = camisetas.branca.gola_v.com_estampa.foto;
                                break;
                        }
                    break;
                    case "gola_normal":
                        switch(estampa){
                            case "sem_estampa":
                                valorUnit = camisetas.branca.gola_normal.sem_estampa.preco_unit;
                                foto = camisetas.branca.gola_normal.sem_estampa.foto;
                                break;
                            case "com_estampa":
                                valorUnit = camisetas.branca.gola_normal.com_estampa.preco_unit;
                                foto = camisetas.branca.gola_normal.com_estampa.foto;
                                break;
                        }
                    break;    
    
                }
            break;
            case "colorida":
                switch(gola){
                    case "gola_v":
                        switch(estampa){
                            case "sem_estampa":
                                valorUnit = camisetas.colorida.gola_v.sem_estampa.preco_unit;
                                foto = camisetas.colorida.gola_v.sem_estampa.foto;
                                break;
                            case "com_estampa":
                                valorUnit = camisetas.colorida.gola_v.com_estampa.preco_unit;
                                foto = camisetas.colorida.gola_v.com_estampa.foto;
                                break;
                        }
                    break;
                    case "gola_normal":
                        switch(estampa){
                            case "sem_estampa":
                                valorUnit = camisetas.colorida.gola_normal.sem_estampa.preco_unit;
                                foto = camisetas.colorida.gola_normal.sem_estampa.foto;
                                break;
                            case "com_estampa":
                                valorUnit = camisetas.colorida.gola_normal.com_estampa.preco_unit;
                                foto = camisetas.colorida.gola_normal.com_estampa.foto;
                                break;
                        }
                    break;    
    
                }
            break;
    
       }
    
       console.log(valorUnit);
       if(qualidade == "q190"){
            valorUnit = valorUnit + ((valorUnit * 12)/100);
            valorTotal = valorUnit * quantidade;
       }else{
            valorTotal = valorUnit * quantidade;
       };
       
       if(embalagem == "unitaria"){
           valorTotal += 0.15 * quantidade;
       }
       
       if(quantidade >= 1000){
           valorTotal = valorTotal - ((valorTotal*15)/100);
       }else if(quantidade >= 500){
        valorTotal = valorTotal - ((valorTotal*10)/100);
       }else if(quantidade >= 100){
        valorTotal = valorTotal - ((valorTotal*5)/100);
       }
    
       valorTotal = valorTotal.toFixed(2);
       linkFoto = "img/" + foto;
       parametros_pesquisa.foto = linkFoto;
       parametros_pesquisa.total = valorTotal;
      
       $('#foto-produto').attr('src', linkFoto);
       $('#valor-total').html(valorTotal);
       

       storageUp();
       updateHTML();
    };

    
});














// Sugestão de etapas da resolução

    // 1. Crie uma função para calcular o preço baseado nos parâmetros da variável "parametros_pesquisa" e solte o 
    // valor no console para testar se está certo.

    // 2. Faça os eventos click e change para os filtros.
    
        // a. Faça o evento click para os filtros do tipo botão (.option-filter). Sempre que houver um click, 
        // remova a classe "selected" dos botões do grupo e depois aplique-a apenas ao que foi clicado para
        // que ele fique azul.

        // b. Faça o evento change para os filtros do tipo <select> e para o <input> de quantidade.

        // c. Sempre que um dos eventos acima ocorrer, atualize a variável "parametros_pesquisa" e rode a função para 
        // calcular o preço

    
    // 3. Altere a função do cálculo do preço. Em vez de soltar os valores no console, atualize as informações
    // nos elementos "result_", atualize o preço no elemento "valor-total" e mude o atributo "src" do elemento 
    // "foto-produto" para alterar a imagem mostrada (todas as imagens estão na pasta img).

    // 4. Adicione a funcionalidade de hide e show do spinner (elemento "refresh-loader") à função de cálculo de preço. 
    // Como não estamos consultando dados externos, o cálculo acaba sendo rápido demais, portanto use um setTimeout 
    // para deixar ele aparecer por pelo menos 2 segundos.

    // 5. Crie a funcionalidade do localStorage e ao carregar a página, consulte o localStorage, 
    // atualize a variável "parametros_pesquisa" e rode a função de cálculo de preço