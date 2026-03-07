<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\StatsController;
use App\Models\User;

// Public Routes
Route::get('/login', function() {
    return response()->json(['message' => 'Please use the React login form to authenticate.'], 405);
});
Route::post('/login', [AuthController::class, 'login'])->name('login');

// Protected Routes
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/stats', [StatsController::class, 'getDashboardStats']);
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::get('/users-all', function () {
        return response()->json(User::all());
    });
    Route::get('/token-test', function (Request $request) {
        return response()->json(['message' => 'Token is active!']);
    });
    Route::delete('/users/{id}', function ($id) {
        $user = User::find($id);
        if (auth()->id() == $id) return response()->json(['message' => 'Cannot delete self'], 403);
        if ($user) { $user->delete(); return response()->json(['message' => 'Deleted']); }
        return response()->json(['message' => 'Not found'], 404);
    });
});