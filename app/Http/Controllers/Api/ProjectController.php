<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ProjectRequest;
use App\Models\Project;
use Illuminate\Support\Facades\Storage;
use App\Models\Image;

class ProjectController extends Controller
{
    public function store(ProjectRequest $request)
    {
        $project = Project::create($request->safe()->except("category", "images"))->category()->associate($request->safe()->category);
        $project->save();
        foreach ($request->file("images") as $img)
        {
            $imageName =  $img->hashName();
            Storage::putFileAs(null, $img, $imageName);
            Image::create(["path" => $imageName])->project()->associate($project)->save();
        }
        return response($project);
    }
    public function all()
    {
        $projects = Project::all()->load("images", "category");
        foreach ($projects as $project)
        {

            foreach ($project->images as $img)
            {
                $img->path = Storage::url($img->path);
            }
        }
        return response($projects, 200);
    }
    public function show($id)
    {
        $project = Project::find($id)->load("images");
        $exists = !is_null($project) || !empty($project);
        if (!$exists)
        {
            return response(null, 404);
        }
        foreach ($project->images as $img)
        {
            $img->path = Storage::url($img->path);
        }
        return response($project, 200);
    }
}
