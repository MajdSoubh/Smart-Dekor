<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ProjectRequest;
use App\Models\Image;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProjectController extends Controller
{
    public function store(ProjectRequest $request)
    {

        $project = Project::create($request->safe()->except(["images", "category"]))->category()->associate($request->category)->save();
        foreach ($request->file("images") as $imgFile)
        {
            $imageName = time() . "." . $imgFile->extension();
            Storage::put($imageName, $imgFile);
            Image::create(["path" => $imageName])->project()->associate($project)->save();
        }
        return response([$project]);
    }
    public function all()
    {
        $projects = Project::with("category", "images")->get();
        return response($projects);
    }
}
