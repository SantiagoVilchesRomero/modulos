
@extends('base')
@section('maintitle', 'Show')
@section('title', 'Detalles del Pokémon')
@section('content')
    <div class="form-group">
        Número: 
        #{{$pokemon->numero}}
    </div>
    <div class="form-group">
        Nombre:
        {{$pokemon->nombre}}
    </div>
    <div class="form-group">
        Peso:
        {{$pokemon->peso}} kg
    </div>
    <div class="form-group">
        Altura:
        {{$pokemon->altura}} m
    </div>
    <div class="form-group">
        Tipos:
        {{$pokemon->tipo}}
    </div>
    <div class="form-group">
        <a href="{{url()->previous()}}" class="btn btn-success">Volver</a>
    </div>
@endsection