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
        // Admin
        User::factory()->create([
            'name' => 'Admin UKM Tenis',
            'email' => 'admin@ukmtenis.com',
            'nim' => null,
            'angkatan' => null,
            'fakultas' => null,
            'jurusan' => null,
            'no_whatsapp' => '081234567890',
            'ktm' => null,
            'pasfoto' => null,
            'role' => 'admin',
            'jabatan' => 'anggota',
            'password' => bcrypt('admin123')
        ]);

        // Ketua
        User::factory()->create([
            'name' => 'Budi Santoso',
            'email' => 'ketua@ukmtenis.com',
            'nim' => '220101001',
            'angkatan' => '2022',
            'fakultas' => 'Fakultas Hukum',
            'jurusan' => 'Ilmu Hukum',
            'no_whatsapp' => '081234567891',
            'ktm' => 'ktm_budi.jpg',
            'pasfoto' => 'foto_budi.jpg',
            'role' => 'anggota',
            'jabatan' => 'ketua',
            'password' => bcrypt('password123')
        ]);

        // Wakil Ketua
        User::factory()->create([
            'name' => 'Siti Aminah',
            'email' => 'wakilketua@ukmtenis.com',
            'nim' => '220102002',
            'angkatan' => '2022',
            'fakultas' => 'Fakultas Ekonomi',
            'jurusan' => 'Manajemen',
            'no_whatsapp' => '081234567892',
            'ktm' => 'ktm_siti.jpg',
            'pasfoto' => 'foto_siti.jpg',
            'role' => 'anggota',
            'jabatan' => 'wakil_ketua',
            'password' => bcrypt('password123')
        ]);

        // Bendahara
        User::factory()->create([
            'name' => 'Ahmad Fauzi',
            'email' => 'bendahara@ukmtenis.com',
            'nim' => '220103003',
            'angkatan' => '2022',
            'fakultas' => 'Fakultas Ekonomi',
            'jurusan' => 'Akuntansi',
            'no_whatsapp' => '081234567893',
            'ktm' => 'ktm_ahmad.jpg',
            'pasfoto' => 'foto_ahmad.jpg',
            'role' => 'anggota',
            'jabatan' => 'bendahara',
            'password' => bcrypt('password123')
        ]);

        // Wakil Bendahara
        User::factory()->create([
            'name' => 'Dewi Lestari',
            'email' => 'wakilbendahara@ukmtenis.com',
            'nim' => '220104004',
            'angkatan' => '2022',
            'fakultas' => 'Fakultas Ekonomi',
            'jurusan' => 'Ekonomi Pembangunan',
            'no_whatsapp' => '081234567894',
            'ktm' => 'ktm_dewi.jpg',
            'pasfoto' => 'foto_dewi.jpg',
            'role' => 'anggota',
            'jabatan' => 'wakil_bendahara',
            'password' => bcrypt('password123')
        ]);

        // Sekretaris
        User::factory()->create([
            'name' => 'Rina Wijaya',
            'email' => 'sekretaris@ukmtenis.com',
            'nim' => '220105005',
            'angkatan' => '2022',
            'fakultas' => 'Fakultas Ilmu Sosial dan Politik',
            'jurusan' => 'Administrasi Negara',
            'no_whatsapp' => '081234567895',
            'ktm' => 'ktm_rina.jpg',
            'pasfoto' => 'foto_rina.jpg',
            'role' => 'anggota',
            'jabatan' => 'sekretaris',
            'password' => bcrypt('password123')
        ]);

        // Wakil Sekretaris
        User::factory()->create([
            'name' => 'Indra Gunawan',
            'email' => 'wakilsekretaris@ukmtenis.com',
            'nim' => '220106006',
            'angkatan' => '2022',
            'fakultas' => 'Fakultas Ilmu Sosial dan Politik',
            'jurusan' => 'Ilmu Komunikasi',
            'no_whatsapp' => '081234567896',
            'ktm' => 'ktm_indra.jpg',
            'pasfoto' => 'foto_indra.jpg',
            'role' => 'anggota',
            'jabatan' => 'wakil_sekretaris',
            'password' => bcrypt('password123')
        ]);

        // Koordinator Kepelatihan
        User::factory()->create([
            'name' => 'Yoga Pratama',
            'email' => 'koordkepelatihan@ukmtenis.com',
            'nim' => '220107007',
            'angkatan' => '2022',
            'fakultas' => 'Fakultas Ilmu Keolahragaan',
            'jurusan' => 'Pendidikan Olahraga',
            'no_whatsapp' => '081234567897',
            'ktm' => 'ktm_yoga.jpg',
            'pasfoto' => 'foto_yoga.jpg',
            'role' => 'anggota',
            'jabatan' => 'koordinator_kepelatihan',
            'password' => bcrypt('password123')
        ]);

        // Koordinator Medinfo
        User::factory()->create([
            'name' => 'Dani Prasetyo',
            'email' => 'koordmedinfo@ukmtenis.com',
            'nim' => '220108008',
            'angkatan' => '2022',
            'fakultas' => 'Fakultas Ilmu Komputer dan Teknologi Informasi',
            'jurusan' => 'Ilmu Komputer',
            'no_whatsapp' => '081234567898',
            'ktm' => 'ktm_dani.jpg',
            'pasfoto' => 'foto_dani.jpg',
            'role' => 'anggota',
            'jabatan' => 'koordinator_medinfo',
            'password' => bcrypt('password123')
        ]);

        // Koordinator Keperalatan
        User::factory()->create([
            'name' => 'Eko Saputra',
            'email' => 'koordkeperalatan@ukmtenis.com',
            'nim' => '220109009',
            'angkatan' => '2022',
            'fakultas' => 'Fakultas Teknik',
            'jurusan' => 'Teknik Mesin',
            'no_whatsapp' => '081234567899',
            'ktm' => 'ktm_eko.jpg',
            'pasfoto' => 'foto_eko.jpg',
            'role' => 'anggota',
            'jabatan' => 'koordinator_keperalatan',
            'password' => bcrypt('password123')
        ]);

        // Anggota Biasa
        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@gmail.com',
            'nim' => '220110010',
            'angkatan' => '2022',
            'fakultas' => 'Fakultas Ilmu Komputer dan Teknologi Informasi',
            'jurusan' => 'Teknologi Informasi',
            'no_whatsapp' => '081234567900',
            'ktm' => 'ktm_test.jpg',
            'pasfoto' => 'foto_test.jpg',
            'role' => 'anggota',
            'jabatan' => 'anggota',
            'password' => bcrypt('password123')
        ]);

        // Tambah beberapa anggota lagi
        for ($i = 1; $i <= 5; $i++) {
            User::factory()->create([
                'name' => "Anggota " . $i,
                'email' => "anggota{$i}@ukmtenis.com",
                'nim' => '22011' . str_pad($i + 10, 4, '0', STR_PAD_LEFT),
                'angkatan' => '2022',
                'fakultas' => 'Fakultas Ilmu Komputer dan Teknologi Informasi',
                'jurusan' => 'Sistem Informasi',
                'no_whatsapp' => '08123456790' . $i,
                'ktm' => "ktm_anggota{$i}.jpg",
                'pasfoto' => "foto_anggota{$i}.jpg",
                'role' => 'anggota',
                'jabatan' => 'anggota',
                'password' => bcrypt('password123')
            ]);
        }
    }
}
