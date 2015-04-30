

window.onload = function(){

	var lista;
	var current = '';
	var table = $('#links');
	var tbody = table.find('tbody');

	function vai() {
		console.log('procurando vídeo para baixar');
		for (var prop in lista){
			if((current ==='')||(lista[prop][0]!==current)){
				var x = lista[prop];
				if(x[1] === "NY"){
					console.log('vídeo encontrado');
					current = prop;
					console.log('baixando vídeo '+lista[current][0]);
					var row = $('#td_'+current);
					var status = $(row.find('td').get(1));
                                        var tempo = $(row.find('td').get(2));
					status.html('DL').css('color', 'blue');
                                        lista[current]['startTime'] = Date.now();
					
                                        (function(current, tempo){
                                            t = setInterval(function(){
                                                var interval = (Date.now())-lista[current]['startTime']+'';
                                                var inputHTML = '<span style="font-weight:bold;">'+interval.substr(0,interval.length-3)+'</span>'+interval.substr(interval.length-3,interval.length);
                                                tempo.html(inputHTML);
                                            },10);
                                            
                                        })(current, tempo);
                                        

					$.ajax('baixa.php', {method:'post', data:{'url':lista[current][0]}})
					.done(function(resposta){
                                            clearInterval(t);
						status.html('OK').css('color', 'green');
						lista[current][0]
						if(resposta==1){
							lista[current][1] = 'OK';
						}
						vai();
					});
					break;
					
				}	
			}
			console.log('Nenhum item encontrado');
			
			
		}
	}

	function popula() {
		
		for (var prop in lista){
			var x = lista[prop];
			var tr = $('<tr>').attr('id', 'td_'+prop);
			tbody.append(tr);
			var td = $('<td>').html(lista[prop][0]);
			var	td2 = $('<td>').html(lista[prop][1]).css('color', 'red');
                        var	td3 = $('<td>');
			tr.append(td);
			tr.append(td2);
                        tr.append(td3);
		}
	}

	$.ajax('lista.php')
	.done(function(data){
		console.log('lista baixada');
		lista = jQuery.parseJSON(data);
		console.log(Object.keys(lista).length+' items encontrados');
		console.log(lista);
		popula();
		vai();
	});
	
}