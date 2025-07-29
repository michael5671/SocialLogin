<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class UserController extends Controller
{
   // Lấy user hiện tại
    public function me(Request $request)
    {
        return response()->json($request->user());
    }
}
