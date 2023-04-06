<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\header;
use App\Http\Requests\HeaderRequest;

class HeaderController extends Controller
{
    public function store(HeaderRequest $request)
    {
        $validated = $request->validated();
        $header = Header::updateOrCreate([], $validated);
        return response($header->toArray());
    }
    public function all()
    {
        $header = Header::first();

        return response($header);
    }
}
