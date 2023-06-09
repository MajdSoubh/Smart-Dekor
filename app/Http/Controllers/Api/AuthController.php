<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\LogoutRequest;
use App\Http\Requests\SignupRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function login(LoginRequest $request)
    {
        $credinatials = $request->validated();
        if (!Auth::attempt($credinatials))
        {
            return response(['message' => "Email address or password is incorrect"]);
        }
        /** @var user User */
        $user =   Auth::user();
        $token =   $user->createToken('main')->plainTextToken;
        return response(['user' => $user->name, 'token' => $token]);
    }
    public function signup(SignupRequest $request)
    {
        /** @var user User */
        $user = User::create([
            'name' => $request['name'],
            'email' => $request['email'],
            'password' => bcrypt($request['password'])
        ]);
        $token =   $user->createToken('main')->plainTextToken;
        return response(['user' => $user->name, 'token' => $token]);
    }
    public function logout(LogoutRequest $request)
    {

        $request->user()->currentAccessToken()->delete();
        return response('true', 204);
    }
}
