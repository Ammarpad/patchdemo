<?php
header( 'HTTP/1.0 404 Not Found' );
require_once "includes.php";

// Check for redirect
$redirects = get_if_file_exists( 'redirects.txt' );
if ( $redirects ) {
	$uri = $_SERVER['REQUEST_URI'];
	$lines = explode( "\n", $redirects );
	foreach ( $lines as $line ) {
		$parts = explode( ' ', $line );
		if ( strpos( $uri, $parts[0] ) !== false ) {
			header( 'HTTP/1.1 301 Moved Permanently' );
			header( 'Location: ' . str_replace( $parts[0], $parts[1], $uri ) );
			die();
		}
	}
}

echo new \OOUI\MessageWidget( [
	'type' => 'error',
	'label' => 'Page not found. The wiki you are looking for may have been deleted.'
] );

include "footer.html";
