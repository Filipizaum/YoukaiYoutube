<?php

include 'listaProntos.php';

$resposta = shell_exec('youtube-dl --format=18 ' . $_POST['url'] . ' && echo "\nVALEU"');

$ex = explode(PHP_EOL, $resposta);

$last = $ex[count($ex)-2]; 

/* Remove os dois últimos elementos do array */
$pureEx = $ex;
array_pop($pureEx); // remove a última linha (em branco)
array_pop($pureEx); // remove a mensagem VALEU

$im = implode('', $pureEx); // junta os pedaços em uma String

/* Se o VALEU foi encontrado*/
if(strpos('VALEU', $last) !== false){
    adicionaListaProntos($_POST['url']);
    /* Retorna um json com o log */
    echo json_encode(
            array(
                'code' => 1,
                'log' => $im
            )
    );
}else{
    /* Retorna um json com o log */
    echo json_encode(
            array(
                'code' => 0,
                'log' => $im
            )
    );
}





