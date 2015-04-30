<?php

define('_Q', '<br>\n');

// Create a new DOM Document to hold our webpage structure
$xml = new DOMDocument();

// Load the url's contents into the DOM
$xml->loadHTMLFile('https://www.youtube.com/watch?v=Ate-X-RxkxU&list=PLF7BA6CCFB215C13B');

// Empty array to hold all links to return
$urls = array();

$list = $xml->getElementById('playlist-autoscroll-list');

$items = $list->childNodes;

for ($i = 1; $i < $items->length; ++$i) {
    $item = $items->item($i);
    /* Se é um elemento e tem o data video id */
    if(($item instanceof \DOMElement) && ($item->hasAttribute ('data-video-id'))){
    	$arr = array(
    		0 => 'https://www.youtube.com/watch?v='.$item->getAttribute('data-video-id'), 
    		1 => 'NY'
    		);
    	$urls[] = $arr;
    }
    
}

/* Combina com as chaves */
$range = range(1, count($urls));
$urls = array_combine($range, $urls);

echo json_encode($urls, false);



/*
$myfile = fopen("webdictionary.txt", "r") or die("Unable to open file!");
$content = fread($myfile,filesize("webdictionary.txt"));

$content = explode(PHP_EOL, $content);

array_pop($content);

$range = range(1, count($content));

$new = array_combine($range, $content);

foreach ($new as $key => $value) {
	$new[$key] = explode(':::', $new[$key]);
}

echo json_encode($new, false);

fclose($myfile);
*/