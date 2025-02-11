<?php
class Kernel extends HttpKernel
{
    
    
    protected $routeMiddleware = [
        
        'admin' => \App\Http\Middleware\AdminMiddleware::class,
    ];
}
