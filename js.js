
/* Quando o documento carregar */
$(document).ready(function () {
    /* Esconde a Log Popup */
    $("#logPopup").hide(0);
});

/* Quando todo o conteúdo for carregado */
window.onload = function () {

    /* Declara variáveis importantes */
    var lista;
    var current = '';
    var table = $('#links');
    var tbody = table.find('tbody');
    var logPopup = $("#logPopup");

    /**
     * Procura vídeo a ser baixado e baixa
     */
    function vai() {
        console.log('procurando vídeo para baixar');
        /* Para cada item na lista */
        for (var prop in lista) {
            /* Pega o item da lista */
            var x = lista[prop];
            /* Se o vídeo não foi baixado ainda */
            if ((x[1] !== "OK")&&(x[1] !== "BP")) {
                current = prop;
                console.log('baixando vídeo ' + lista[current][0]);
                var row = $('#td_' + current);
                var status = $(row.find('td').get(2));
                var erros = $(row.find('td').get(3));
                var tempo = $(row.find('td').get(4));
                var logs = $(row.find('td').get(5));
                /* Se o item não está em estado de erro */
                if(lista[current][1]!=='ER'){
                    setStatus(current, 'DL');
                }
                
                lista[current]['startTime'] = Date.now();
                (function (current, tempo) {
                    t = setInterval(function () {
                        var interval = (Date.now()) - lista[current]['startTime'] + '';
                        var inputHTML = '<span style="font-weight:bold;">' + interval.substr(0, interval.length - 3) + '</span>' + interval.substr(interval.length - 3, interval.length);
                        tempo.html(inputHTML);
                    }, 10);

                })(current, tempo);

                $.ajax('baixa.php', {method: 'post', data: {'url': lista[current][0]}})
                        .done(function (resposta) {
                            clearInterval(t);
                            resposta = $.parseJSON(resposta);
                            /* Pega o Log e salva dentro da lista */
                            var log = resposta.log;
                            lista[current]['log'] = log;
                            /* Cria o botão para ver o Log, inserindo o valor de 'current' dentro
                             do escopo de uma função anônima */
                            (function (current, logs) {
                                /* Cria o botão */
                                lista[current]['logButton'] = $('<button>')
                                        .html('Ver Log')
                                        .attr('type', 'button')
                                        .on('click', function () {
                                            logPopup.find('textarea').html(lista[current]['log']);
                                            logPopup.show(500);
                                        });
                                /* Insere o botão na tabela */
                                logs.empty().append(lista[current]['logButton']);
                            })(current, logs);


                            
                            lista[current][0]
                            if (resposta.code == 1) {
                                console.log(1312123);
                                setStatus(current, 'OK');
                                lista[current][1] = 'OK';
                            } else {
                                /* Incrementa a quantidade de erros */
                                var qtErros = parseInt(erros.html());
                                qtErros += 1;
                                erros.html(qtErros);
                                console.log(qtErros+' erros');
                                console.warn('Houve uma falha');
                                if(qtErros<3){
                                    setStatus(current, 'ER');
                                }else{
                                    setStatus(current, 'BP');
                                }
                            }
                            /* Escolhe novamente o vídeo */
                            vai();
                        });
                break;

            }

        }
    }

    function popula() {

        for (var prop in lista) {
            var x = lista[prop];
            var tr = $('<tr>').attr('id', 'td_' + prop);
            tbody.append(tr);
            var thNumero = $('<td>').html(prop);
            var td = $('<td>').html(lista[prop][0]);
            var td2 = $('<td>').html('NY').css('color', 'red').attr('title', 'O vídeo ainda não foi baixado');
            var td3 = $('<td>').html('0').css('color', 'blue');
            var td4 = $('<td>');
            var td5 = $('<td>');

            tr.append(thNumero);
            tr.append(td);
            tr.append(td2);
            tr.append(td3);
            tr.append(td4);
            tr.append(td5);
        }
    }
    
    function setStatus(index, status){
        /* Pega a célula de status */
        var statusEl = $($('#td_' + index).find('td').get(2));
        /* Ajusta o status da lista objeto */
        lista[index][1] = status;
        switch (status){
            case 'BP':
                console.log('vai bai pess');
                statusEl.html('BP').css('color', '#a55').attr('title', 'Este vídeo possívelmente não está mais disponível');
                break;
            case 'DL':
                statusEl.html('DL').css('color', 'blue').attr('title', 'O vídeo está sendo baixado');
                break;
            case 'OK':
                statusEl.html('OK').css('color', 'green').attr('title', 'O vídeo foi baixado');
                break;
            case 'NY':
                statusEl.html('NY').css('color', 'darkblue').attr('title', 'O vídeo ainda não foi verificado');
                break;
            case 'ER':
                statusEl.html('ER').css('color', 'red').attr('title', 'Houve um erro ao tentar baixar');
                break;
                
            default: break;
        }
    }

    $.ajax('lista.php')
            .done(function (data) {

                lista = jQuery.parseJSON(data);

                popula();
                vai();
            });
	
}