<?php
  error_reporting(E_ALL & ~E_NOTICE);
  $pathStr = $_SERVER['PATH_INFO'];
  $pathStr = substr( $pathStr, 1 );
  $pathinfo = explode( '/', $pathStr );
  $foldername = $pathinfo[ 0 ];
  $filename = $pathinfo[ 1 ];
  if(count($pathinfo)==1){
    if($foldername==""){
      $foldername='index';
    }
      $filename=$foldername;
      $foldername='index';
  }  
  include '/views/' . $foldername . '/' . $filename . '.html';
?>

