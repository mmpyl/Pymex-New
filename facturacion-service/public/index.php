<?php
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Factory\AppFactory;

require __DIR__ . '/../vendor/autoload.php';

$app = AppFactory::create();

// Middleware
$app->addBodyParsingMiddleware();
$app->addRoutingMiddleware();
$app->addErrorMiddleware(true, true, true);

// Health check
$app->get('/health', function (Request $request, Response $response) {
    $response->getBody()->write(json_encode([
        'status' => 'ok',
        'service' => 'facturacion-service',
        'timestamp' => date('c')
    ]));
    return $response->withHeader('Content-Type', 'application/json');
});

$app->get('/', function (Request $request, Response $response) {
    $response->getBody()->write(json_encode([
        'message' => 'Pymex Facturación Service API',
        'version' => '1.0.0'
    ]));
    return $response->withHeader('Content-Type', 'application/json');
});

$app->run();
