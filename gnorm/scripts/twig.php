<?php

// All of the following parameters are required.
$longopts = [
  'source:',
  'pattern:',
  'dest:',
  'data:',
  'includes:',
  'global:',
];
$options = getopt('', $longopts);

require getenv('PROJECT_ROOT') . '/vendor/autoload.php';

// Set targets based on passed configuration.
$baseDir = __DIR__ . '/../..';
$sourceDir = $options['source'];
$sourcePath = $baseDir . '/' . $sourceDir;
$sourcePattern = $options['pattern'];
$buildDir = $options['dest'];
$buildPath = $baseDir . '/' . $buildDir;
$jsonPath = $options['data'];
$includeDir = $options['includes'];
$globalJsonFile = $options['global'];
$globalJson = getJson($globalJsonFile);

try {
// Load twig.
  $loader = new \Twig_Loader_Filesystem($baseDir);
  $loader->addPath($includeDir, 'includes');
  $twig = new \Twig_Environment($loader, array(
    'cache' => FALSE,
    'debug' => TRUE,
    'autoescape' => FALSE,
  ));


// Loop through each file that matches the source pattern.
  foreach (glob($sourcePattern) as $filename) {
    try {
      // Get the name of the file without extension.
      $basename = basename($filename, '.twig');

      echo "Rendering $basename\n";

      // Get any json.
      $jsonFile = $jsonPath . "/{$basename}.json";
      $json = getJson($jsonFile);
      $json = array_merge($json, $globalJson);

      // Render the twig file.
      $file = $sourceDir . "/{$basename}.twig";
      $rendered = $twig->render($file, $json);

      // Write the output file.
      $destination = $buildPath . "/{$basename}.html";
      file_put_contents($destination, $rendered);
    }
    catch (Exception $e) {
      echo $e->getMessage() . "\n";
    }
  }
}
catch (Exception $e) {
  echo $e->getMessage() . "\n";
}

function getJson($file_path) {
  if (file_exists($file_path)) {
    $json_string = file_get_contents($file_path);
    if ($json = json_decode($json_string, true)) {
      return $json;
    }
    else {
      return [];
    }
  }
  else{
    return [];
  }
}