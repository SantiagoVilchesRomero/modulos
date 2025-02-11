<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $table = 'product';
    
    // Actualización: campo fillable para que coincida con la migración
    protected $fillable = [
        'brand',
        'model',
        'year',
        'license_plate',
        'engine_capacity',
        'color',
        'price',
        'mileage',
        'fuel_type',
        'transmission_type',
        'is_new',
        'description'
    ];
}
