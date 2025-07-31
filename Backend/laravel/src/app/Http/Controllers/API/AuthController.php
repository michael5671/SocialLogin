<?php

namespace App\Http\Controllers\API;

use App\Models\User;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Laravel\Sanctum\HasApiTokens;

use Google_Client;

class AuthController extends Controller
{
    //
    use HasApiTokens;
    
    public function handleGoogleLogin(Request $request)
    {
        $user = User::updateOrCreate(
            ['email' => $request->email],
            [
                'name' => $request->name,
                'avatar' => $request->avatar,
                'gender' => $request->gender,
                'birth_date' => $request->birthdate,
                'phone' => $request->phone,
                'address' => $request->address,
                'password' => Hash::make(Str::random(16)),
                'google_id' => $request->google_id,

            ]
        );

        $token = $user->createToken('google-token')->plainTextToken;

        return response()->json([
            'message' => 'Login successful',
            'user' => $user,
            'token' => $token,
        ]);
    }
}
