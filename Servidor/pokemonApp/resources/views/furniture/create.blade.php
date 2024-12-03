@extends('base')
@section('title', '')
@section('content')
    <form action="{{url('pokemon')}}" method="post">
        @csrf
        <div class="form-group">
            <label for="nombre">Nombre del Pokémon</label>
            <input value="{{old('nombre')}}" required type="text" class="form-control" id="nombre" name="nombre" placeholder="Nombre del Pokémon">
        </div>
        <div class="form-group">
            <label for="peso">Peso del Pokémon</label>
            <input value="{{old('peso')}}" required type="number" step="0.001" class="form-control" id="peso" name="peso" placeholder="Peso del Pokémon">
        </div>
        <div class="form-group">
            <label for="altura">Altura del Pokémon</label>
            <input value="{{old('altura')}}" required type="number" step="0.001" class="form-control" id="altura" name="altura" placeholder="Altura del Pokémon">
        </div>
        <div class="form-group">
            <label for="tipo">Tipo del Pokémon</label>
            <input value="{{old('tipo')}}" required type="text" class="form-control" id="tipo" name="tipo" placeholder="Tipo del Pokémon">
        </div>
        <div class="form-group">
            <label for="numero">Número del Pokémon</label>
            <input value="{{old('numero')}}" required type="number" class="form-control" id="numero" name="numero" placeholder="Número del Pokémon">
        </div>
        <button type="submit" class="btn btn-primary">añadir</button>
    </form>
@endsection