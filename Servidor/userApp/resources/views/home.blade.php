⠀@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">
                    Boton para acceder a la lista de usuarios
                </div>
                <div class="card-body">
                    <div class="mb-3">
                        <a class="btn btn-success" href="{{ route('users.index') }}">
                            {{ __('Ver Usuarios') }}
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection