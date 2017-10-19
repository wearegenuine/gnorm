<?php

error_reporting(E_ALL & ~E_NOTICE);

try {
  // All of the following parameters are required.
  /**
   * Options:
   * c = The json encoded config.
   * b = Boolean telling if this is a build.
   */
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

  // Set targets based on passed configuration.
  // The location of the theme directory.
  $baseDir = __DIR__ . '/../..';

  // The location of the application directory.
  $sourceDir = $config['source'];
  $sourcePath = $baseDir . '/' . $sourceDir;

  // The pattern to search for source twig files.
  $sourcePattern = $config['pattern'];

  // The location to save built files.
  $buildDir = $config['dest'];
  $buildPath = $baseDir . '/' . $buildDir;

  // The location of the json data files.
  $jsonPath = $config['data'];

  // The namespaces and their locations.
  $namespaces = $config['namespaces'];

  // The location of the global json file.
  $globalJsonFile = $config['global'];

  // If this is a build or not.
  $isBuild = 'TRUE' == $options['b'] ? TRUE : FALSE;

  // Load the global json and set the build flag.
  $globalJson = getJson($globalJsonFile);
  $globalJson['isBuild'] = $isBuild;

  // Load twig.
  $loader = new \Twig_Loader_Filesystem($baseDir);

  // Add the namespaces.
  foreach ($namespaces as $key => $location) {
    $loader->addPath($location, $key);
  }

  // Setup the twig environment.
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
    catch (Twig_Error $e) {
      $context = $e->getSourceContext();
      echo $e->getRawMessage() . "\n"
        . $context->getName() . " line: " . $e->getLine()
        . "\n" . $context->getCode()
        . "\n";
    }
    catch (Throwable $e) {
      echo $e->getMessage() . "\n" . $e->getTraceAsString() . "\n";
    }
  }
}
catch (Throwable $e) {
  echo $e->getMessage() . "\n" . $e->getTraceAsString() . "\n";
}

/**
 * Get Json file and ensure output is an array.
 *
 * @param $file_path
 * @return array
 */
function getJson($file_path) {
  if (file_exists($file_path)) {
    $json_string = file_get_contents($file_path);
    if ($json = json_decode($json_string, true)) {
      return $json;
    }
    else {
      echo "Invalid JSON: $file_path\n";
      return [];
    }
  }
  else{
    return [];
  }
}