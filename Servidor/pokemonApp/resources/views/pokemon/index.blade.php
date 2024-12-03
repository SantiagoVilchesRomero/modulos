@extends('base')
@section('maintitle', 'Index')
@section('title', 'Lista de Pokémon')
@section('content')
    <table class="table table-striped table-hover" id="tablaPokemon">
        <thead>
            <tr>
                <th>ID</th>
                <th>Número</th>

                <th>Nombre</th>
                <th>Peso</th>
                <th>Altura</th>
                <th>Tipo</th>
                <th>Ver</th>
                @if(session('user'))
                    <th>Editar</th>
                    <th>Eliminar</th>
                @endif
            </tr>
        </thead>
        <tbody>
            @foreach($pokemon as $pokemon)
                <tr>
                    <td>{{$pokemon->id}}</td>
                    <td>#{{$pokemon->numero}}</td>
                    <td>{{$pokemon->nombre}}</td>
                    <td>{{$pokemon->peso}} kg</td>
                    <td>{{$pokemon->altura}} m</td>
                    <td>{{$pokemon->tipo}}</td>
                    <td><a href="{{url('pokemon/' . $pokemon->id)}}">Ver</a></td>
                    @if(session('user'))
                        <td><a href="{{url('pokemon/' . $pokemon->id . '/edit')}}">Editar</a></td>
                        <td><a href="#" data-href="{{url('pokemon/' . $pokemon->id)}}" class="borrar">Eliminar</a></td>
                    @endif
                </tr>
            @endforeach
        </tbody>
    </table>
    <div class="row">
        @if(session('user'))
            <a href="{{url('pokemon/create')}}" class="btn btn-success">Añadir Pokémon</a>
            <form id="formDelete" action="{{ url('') }}" method="post">
                @csrf
                @method('delete')
            </form>
        @endif
    </div>
@endsection
@section('scripts')
    <script src="{{url('assets/scripts/script.js')}}"></script>
@endsection