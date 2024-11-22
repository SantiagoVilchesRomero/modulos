@extends('layouts.app')

@section('content')
    <div class="container">
        <h1>Subir Imagen</h1>
        <form action="{{ route('subir.store') }}" method="POST" enctype="multipart/form-data">
            @csrf
            <div class="form-group">
                <label for="file">Seleccionar Imagen</label>
                <input type="file" class="form-control" id="file" name="file" required>
            </div>
            <button type="submit" class="btn btn-primary">Subir</button>
        </form>
    </div>
@endsection