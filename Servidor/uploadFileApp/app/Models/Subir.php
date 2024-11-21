<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Subir extends Model
{
    protected $table = 'subir';

    protected $fillable = ['nombre_original', 'nombre', 'link',];
}