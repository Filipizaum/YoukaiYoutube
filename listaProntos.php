<?php

define('__listfilename__', 'listaProntos.txt');

/**
 * Retorna a lista de ids que já foram baixados
 * @return array A lista
 */
function pegaListaProntos (){
    if(file_exists(__listfilename__)){
        return file(__listfilename__);
    }
    /* Se o arquivo não existir */
    fopen(__listfilename__, "w");
    chmod(__listfilename__, 0777);
    return array();
}

function adicionaListaProntos($item){
    $listaProntos = pegaListaProntos();
    /* Se o item ainda não existia no array */
    if(!in_array($item, $listaProntos)){
        /* Adiciona diretamente ao arquivo */
        $arq = fopen(__listfilename__, 'a');
        fwrite($arq, $item.PHP_EOL);
    }
}