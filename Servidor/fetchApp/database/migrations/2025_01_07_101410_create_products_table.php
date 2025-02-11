<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('product', function (Blueprint $table) {
            $table->id();
            $table->string('brand', 50);              // Marca
            $table->string('model', 100);             // Modelo
            $table->integer('year');                  // Año
            $table->string('license_plate', 10);      // Matrícula
            $table->integer('engine_capacity');       // Cilindrada en cc
            $table->string('color', 30);              // Color
            $table->decimal('price', 10, 2);          // Precio
            $table->integer('mileage');               // Kilometraje
            $table->string('fuel_type', 20);          // Tipo de combustible
            $table->string('transmission_type', 20);  // Tipo de transmisión
            $table->boolean('is_new')->default(true); // Si es nueva o usada
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('product');
    }
};
