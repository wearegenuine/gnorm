<?php

require getenv('PROJECT_ROOT') . '/vendor/autoload.php';

$baseDir = __DIR__ . '/../..';
$sourceDir = 'app';
$sourcePath = $baseDir . '/' . $sourceDir;
$sourcePattern = $sourcePath . "/*.twig";
$buildDir = 'build';
$buildPath = $baseDir . '/' . $buildDir;
$jsonPath = $sourcePath . '/json';
$includeDir = $sourceDir . '/includes';
$globalJsonFile = $jsonPath . "/global.json";
$globalJson = getJson($globalJsonFile);


$loader = new \Twig_Loader_Filesystem($baseDir);
$loader->addPath($includeDir, 'includes');
$twig = new \Twig_Environment($loader, array(
  'cache' => false,
  'debug' => true,
  'autoescape' => false,
));


// Loop through each file that matches the source pattern.
foreach (glob($sourcePattern) as $filename) {
  // Get the name of the file without extension.
  $basename = basename($filename, '.twig');

  echo "Rendering $basename\n";

  // Get any json.
  $jsonFile = $jsonPath ."/{$basename}.json";
  $json = getJson($jsonFile);
  $json = array_merge($json, $globalJson);

  // Render the twig file.
  $file = $sourceDir . "/{$basename}.twig";
  $rendered = $twig->render($file, $json);

  // Write the output file.
  $destination = $buildPath . "/{$basename}.html";
  file_put_contents($destination, $rendered);
}

function getJson($file_path) {
  if (file_exists($file_path)) {
    $json_string = file_get_contents($file_path);
    return json_decode($json_string, true);
  }
  else{
    return [];
  }
}