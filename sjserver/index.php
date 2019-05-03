<?php
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;
use \Firebase\JWT\JWT;
require './vendor/autoload.php';
include_once('./Inscriptor.php');
include_once('./AdminPuntajes.php');

$app = new \Slim\App(['settings' => ['displayErrorDetails' => true]]);

// Registrarse -------------------------------------------------------
$app->post('/registro', function(Request $request, Response $response){
    if(Inscriptor::registrarUsuario($request->getParsedBody()["usr"], $request->getParsedBody()["pass"])){
        $response->getBody()->write(json_encode(array('mensaje' => 'Usuario Registrado Con Exito', 'status' => 200)));
    } else {
        $response->getBody()->write(json_encode(array('mensaje' => 'Nombre De Usuario Inválido Por Repetición', 'status' => 407)));
    }

    return $response;
});

$app->options('/registro', function(Request $request, Response $response){
    return $newResponse = $response
    ->withAddedHeader("Access-Control-Allow-Headers", "Content-Type")
    ->withAddedHeader("Access-Control-Allow-Origin", "*");
});
//--------------------------------------------------------------------

// Login -------------------------------------------------------------
$app->post('/login', function(Request $request, Response $response){
    $login = Inscriptor::Login($request->getParsedBody()["usr"], $request->getParsedBody()["pass"]);

    if ($login === -1) {
        $response->getBody()->write(-1);
    } else if($login === 0) {
        $response->getBody()->write(0);
    } else {
        $response->getBody()->write($login);
    }

    return $response;
});

$app->options('/login', function(Request $request, Response $response){
    return $newResponse = $response
    ->withAddedHeader("Access-Control-Allow-Headers", "Content-Type")
    ->withAddedHeader("Access-Control-Allow-Origin", "*");
});
// -------------------------------------------------------------------

// Registrar Puntaje -------------------------------------------------
$app->post('/registroPuntajes', function(Request $request, Response $response){
    $adminPuntajes = new AdminPuntajes($request->getParsedBody()["usr"]);
    if($adminPuntajes->registrarPuntaje($request->getParsedBody()["codigoJuego"], $request->getParsedBody()["puntaje"])){
        $response->getBody()->write(json_encode(array("mensaje" => "Puntaje Registrado Con Exito", "status" => 200)));
    }else {
        $response->getBody()->write(json_encode(array("mensaje" => "Error Al Registrar El Nuevo Puntaje", "status" => 407)));
    }

    return $response;
});

$app->options('/registroPuntajes', function(Request $request, Response $response){
    return $newResponse = $response
    ->withAddedHeader("Access-Control-Allow-Headers", "Content-Type")
    ->withAddedHeader("Access-Control-Allow-Origin", "*");
});
// --------------------------------------------------------------------

// Consultar Puntajes -------------------------------------------------
$app->post('/consultarPuntajes', function(Request $request, Response $response){
    $adminPuntajes = new AdminPuntajes($request->getParsedBody()["usr"]);
    $puntajes = $adminPuntajes->consultarPuntajes();
    if($puntajes != false){
        $response->getBody()->write($puntajes);
    } else{
        $response->getBody()->write(json_encode(array("mensaje" => "Error al leer la base de datos/Usuario inexistente", "codigo" => 407)));
    }
});

$app->options('/consultarPuntajes', function(Request $request, Response $response){
    return $newResponse = $response
    ->withAddedHeader("Access-Control-Allow-Headers", "Content-Type")
    ->withAddedHeader("Access-Control-Allow-Origin", "*");
});
// --------------------------------------------------------------------

$app->run();

?>