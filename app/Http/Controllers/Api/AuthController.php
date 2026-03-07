<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

class AuthController extends Controller
{
    public function login(Request $request) {
        // 1. Validate the incoming request
        $fields = $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string'
        ]);

        // 2. Check the credentials
        if (!Auth::attempt($fields)) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }

        // 3. Create a token for this user
        $user = Auth::user();
        $token = $user->createToken('myapptoken')->plainTextToken;

        // 4. Send back the user and the token
        return response()->json([
            'user' => $user,
            'token' => $token
        ], 200);
    }
}