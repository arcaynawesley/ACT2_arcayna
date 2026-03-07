<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
      // Use updateOrCreate to avoid the "Duplicate entry" error
    \App\Models\User::updateOrCreate(
        ['email' => 'test@example.com'],
        [
            'name' => 'Wesley Clark',
            'password' => \Illuminate\Support\Facades\Hash::make('password123'),
        ]
    );
    }
}
