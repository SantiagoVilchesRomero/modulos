<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        $faker = Faker::create();
        
        $brands = ['Honda', 'Yamaha', 'Kawasaki', 'Suzuki', 'BMW', 'KTM', 'Ducati', 'Harley-Davidson'];
        $fuelTypes = ['Gasolina', 'Eléctrica'];
        $transmissionTypes = ['Manual', 'Automática', 'Semi-automática'];
        
        $products = [];
        
        for($i = 0; $i < 20; $i++) {
            $products[] = [
                'brand' => $faker->randomElement($brands),
                'model' => $faker->word . ' ' . $faker->numberBetween(100, 1000),
                'year' => $faker->numberBetween(2015, 2024),
                'license_plate' => strtoupper($faker->bothify('####?')),
                'engine_capacity' => $faker->randomElement([125, 250, 400, 600, 750, 1000]),
                'color' => $faker->safeColorName,
                'price' => $faker->randomFloat(2, 3000, 30000),
                'mileage' => $faker->numberBetween(0, 50000),
                'fuel_type' => $faker->randomElement($fuelTypes),
                'transmission_type' => $faker->randomElement($transmissionTypes),
                'is_new' => $faker->boolean(30),
                'created_at' => now(),
                'updated_at' => now()
            ];
        }
        
        Product::insert($products);
    }
}