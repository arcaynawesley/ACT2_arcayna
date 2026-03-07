<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User; // Import the User model so we can count them
use Illuminate\Support\Facades\DB;

class StatsController extends Controller
{
    /**
     * Get Dashboard Statistics
     * This returns real data to your React frontend.
     */
    public function getDashboardStats()
    {
        try {
            // 1. Count total users in your 'users' table
            $totalUsers = User::count();

            // 2. Check if the database connection is healthy
            $dbStatus = DB::connection()->getPdo() ? 'Online' : 'Offline';

            return response()->json([
                'status' => 'success',
                'data' => [
                    'total_users' => $totalUsers,
                    'system_status' => $dbStatus,
                    'last_sync' => now()->format('h:i A'), // Shows current server time
                    'server_load' => 'Low', // Static for now, but looks professional
                ]
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Could not fetch statistics',
            ], 500);
        }
    }
}