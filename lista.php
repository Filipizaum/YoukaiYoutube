<?php

function toYoutubeUrl($vid){
    return 'https://www.youtube.com/watch?v='.$vid;
}

include 'listaProntos.php';

// Create a new DOM Document to hold our webpage structure
$xml = new DOMDocument();

// Load the url's contents into the DOM
@$xml->loadHTMLFile('https://www.youtube.com/watch?v=Okz92FBC1NQ&index=1&list=PLsrQAKqWfP3BApU52zO5zfVgezuBWNDzY');

// Empty array to hold all links to return
$urls = array();

$list = $xml->getElementById('playlist-autoscroll-list');

$items = $list->childNodes;

/* Pega os que já foram baixados, salvos em um arquivo de texto */
$listaProntos = pegaListaProntos();

/*
for ($i = 0; $i < $items->length; ++$i) {
    $item = $items->item($i);
    // Se é um elemento e tem o data video id 
    if(($item instanceof \DOMElement) && ($item->hasAttribute ('data-video-id'))){
        $vid = $item->getAttribute('data-video-id');
        // Correção do episódio 15 temporada 2 
        if($vid == 'uKa3BUG2mk0'){
            $vid = 'wfyI0M_cdlA';
        }
        // Se o vídeo não foi baixado 
        if (!in_array(toYoutubeUrl($vid).PHP_EOL, $listaProntos)) {
            $arr = array(
                    0 => toYoutubeUrl($vid), 
                    1 => 'NY'
                    );
            $urls[] = $arr;
        }
    }
    
}
*/

$vidArr = array(
	'EiD0ZIr8di8',
	'_Z_oH_orS80',
	'MN1mVQoxtYc',
	'JKWCzKiy3RI',
	'CQBANIuybDA',
	'QStDdo5J0lw'
);

for ($i = 0; $i < count($vidArr); ++$i) {
    $vid = $vidArr[$i];
    /* Se o vídeo não foi baixado */
    if (!in_array(toYoutubeUrl($vid).PHP_EOL, $listaProntos)) {
        $arr = array(
                0 => toYoutubeUrl($vid), 
                1 => 'NY'
                );
        $urls[] = $arr;
    }
    
}

/* Combina com as chaves */
$range = range(1, count($urls));
$urls = array_combine($range, $urls);

echo json_encode($urls, false);
