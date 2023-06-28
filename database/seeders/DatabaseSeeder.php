<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        \App\Models\User::factory(10)->create()->each(function($user){
            \App\Models\Cars::factory(5)->create([
                "user_id" => $user->id
            ]);
        });

        \App\Models\User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
            "password" => bcrypt("12345678")
        ]);
    }
}
