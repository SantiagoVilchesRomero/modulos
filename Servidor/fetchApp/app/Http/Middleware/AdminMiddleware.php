<?php
// File: laraveles/userApp/app/Http/Middleware/AdminMiddleware.php
namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class AdminMiddleware
{
    public function handle($request, Closure $next)
    {
        if (Auth::check()) {
            $user = Auth::user();
            // Registra todos los detalles del usuario para depuración
            Log::info('AdminMiddleware: Detalles del usuario: ' . json_encode([
                'id'   => $user->id,
                'role' => $user->role,
            ]));
            
            $role = trim(strtolower($user->role));
            if ($role === 'admin') {
                return $next($request);
            }
        }
        abort(403, 'No autorizado.');
    }
}