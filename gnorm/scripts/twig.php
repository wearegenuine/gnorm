<?php

$options = getopt('c:b:');

$config = json_decode($options['c'], TRUE);

if(!$config) {
  throw new Exception('Twig config missing.');
}

$autoload = $config['vendor'] . '/autoload.php';

if(!is_file($autoload)) {
  throw new Exception('Path invalid: ' . $autoload);
}

require $autoload;

$config['baseDir'] = __DIR__ . '/../..';
$config['isBuild'] = 'TRUE' == $options['b'] ? TRUE : FALSE;

(new Gnormtwig\Gnormtwig($config))->render();


