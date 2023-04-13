<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\FileManager\FileManager;
use App\FileManager\SaveFiles;
use App\attributes\IItemManager;
use App\attributes\ItemManager;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {

        $this->app->bind(SaveFiles::class, function ($app) {
           
   
              return new FileManager;
           });

           $this->app->bind(IItemManager::class, function ($app) {
           
   
            return new ItemManager;
         });
          

           
  
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }
}
