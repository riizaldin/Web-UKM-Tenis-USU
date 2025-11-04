<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@gmail.com',
            'nim' => '12345667',
            'angkatan' => '12345667',
            'fakultas' => 'fasilkom-ti',
            'jurusan' => 'teknologi informasi',
            'no_whatsapp' => '08124124124',
            'ktm' => 'klfd;jsajkfasd',
            'pasfoto' => 'klfd;jsajkfasd',
            'password' => bcrypt('password123')
        ]);
    }
}
