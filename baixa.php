<?php

$resposta = shell_exec('youtube-dl --format=18 '.$_POST['url'].' && echo "\nVALEU"');

$ex = explode(PHP_EOL, $resposta);

$last = $ex[count($ex)-2];

/* Se o Valeu foi encontrado*/
if(strpos('VALEU', $last) !== false){
	echo 1;
}else{
	echo 0;
}


