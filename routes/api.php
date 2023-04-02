<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ContactController;
use App\Http\Controllers\Api\ProjectController;
use App\Http\Controllers\Api\CategoryController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request)
{
    return $request->user();
});
Route::post('/signup', [AuthController::class, "signup"]);
Route::post('/login', [AuthController::class, "login"]);
Route::post('/logout', [AuthController::class, "logout"]);
Route::get('/contact', [ContactController::class, "all"]);
Route::put('/contact/update', [ContactController::class, "store"]);
Route::get('/category', [CategoryController::class, "all"]);
Route::get('/category/{id}', [CategoryController::class, "show"]);
Route::post('/category', [CategoryController::class, "store"]);
Route::put('/category/{id}', [CategoryController::class, "modify"]);
Route::delete('/category/{id}', [CategoryController::class, "delete"]);
Route::post('/project', [ProjectController::class, "store"]);
Route::get('/project', [ProjectController::class, "all"]);
