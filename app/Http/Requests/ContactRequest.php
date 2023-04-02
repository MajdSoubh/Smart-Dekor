<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ContactRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    protected function onCreate()
    {
        return [
            "phone" => "string|nullable",
            "email" => "email|nullable",
            "address" => "string|nullable",
            "whatsapp" => "string|nullable",
            "facebook" => "string|nullable",
            "instagram" => "string|nullable",
        ];
    }
    protected function onUpdate()
    {
        return [
            "phone" => "string|nullable",
            "email" => "email|nullable",
            "address" => "string|nullable",
            "whatsapp" => "string|nullable",
            "facebook" => "string|nullable",
            "instagram" => "string|nullable",
        ];
    }
    public function attributes()
    {
        return [
            'email' => 'Email address',
            'whatsapp' => 'Whats app',
        ];
    }

    public function rules()
    {
        return request()->isMethod("put") || request()->isMethod("patch") ?
            $this->onUpdate() : $this->onCreate();
    }
}
