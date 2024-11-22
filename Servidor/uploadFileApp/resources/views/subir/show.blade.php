@extends('layouts.app')

@section('content')
    <div class="container">
        <h1>{{ $subir->nombreoriginal }}</h1>
        <img src="{{ route('photos.view', $subir) }}" alt="{{ $subir->nombreoriginal }}" style="max-width: 100%; height: 900px;">
        <p><a href="{{ route('subir.index') }}">Volver a la lista</a></p>
    </div>
@endsection