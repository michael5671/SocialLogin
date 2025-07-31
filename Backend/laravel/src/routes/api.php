<?php
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\UserController;

// Đăng nhập bằng Google
Route::post('/login/google', [AuthController::class, 'handleGoogleLogin']);


Route::middleware('auth:sanctum')->get('/user', function (\Illuminate\Http\Request $request) {
    return $request->user();
});