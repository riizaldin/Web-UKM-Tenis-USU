<?php

namespace App\Providers;

use Illuminate\Support\Facades\Vite;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Fix for older MySQL / MariaDB default index length when using utf8mb4.
        // Ensures migrations that create string columns with indexes don't exceed
        // the database's max key length (common workaround: set to 191).
        Schema::defaultStringLength(191);

        Vite::prefetch(concurrency: 3);
    }
}
