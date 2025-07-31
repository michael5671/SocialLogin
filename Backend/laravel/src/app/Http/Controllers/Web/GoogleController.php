<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Laravel\Socialite\Facades\Socialite;

class GoogleController extends Controller
{
    public function redirectToGoogle()
    {
        return Socialite::driver('google')
            ->scopes([
                'openid',
                'profile',
                'email',
                'https://www.googleapis.com/auth/user.phonenumbers.read',
                'https://www.googleapis.com/auth/user.birthday.read',
                'https://www.googleapis.com/auth/user.addresses.read',
                'https://www.googleapis.com/auth/user.gender.read',
            ])
            ->redirect();
    }

    public function handleGoogleCallback()
    {
        $googleUser = Socialite::driver('google')->stateless()->user();

        $accessToken = $googleUser->token;

        // Gọi Google People API
        $client = new \GuzzleHttp\Client();
        $response = $client->get('https://people.googleapis.com/v1/people/me', [
            'query' => [
                'personFields' => 'genders,birthdays,phoneNumbers,addresses',
            ],
            'headers' => [
                'Authorization' => 'Bearer ' . $accessToken,
            ],
        ]);

        $peopleData = json_decode($response->getBody(), true);

        // Lấy các thông tin cần thiết
        $gender = $peopleData['genders'][0]['value'] ?? null;
        $birthDate = isset($peopleData['birthdays'][0]['date'])
            ? implode('-', $peopleData['birthdays'][0]['date'])
            : null;
        $phone = $peopleData['phoneNumbers'][0]['value'] ?? null;
        $address = $peopleData['addresses'][0]['formattedValue'] ?? null;

        // Lưu vào DB
        $user = \App\Models\User::updateOrCreate(
            ['email' => $googleUser->getEmail()],
            [
                'name' => $googleUser->getName(),
                'avatar' => $googleUser->getAvatar(),
                'gender' => $gender,
                'birth_date' => $birthDate,
                'phone' => $phone,
                'address' => $address,
                'google_id' => $googleUser->getId(),
                'password' => \Illuminate\Support\Facades\Hash::make(\Illuminate\Support\Str::random(16)),
            ]
        );

        auth()->login($user);

        // Danh sách field bị thiếu
        $missingFields = [];
        if (!$gender)
            $missingFields[] = 'Gender';
        if (!$birthDate)
            $missingFields[] = 'Birth Date';
        if (!$phone)
            $missingFields[] = 'Phone';
        if (!$address)
            $missingFields[] = 'Address';

        if (!empty($missingFields)) {
            session()->flash('missing_fields', $missingFields);
        }

        return redirect('/dashboard');
    }
}
