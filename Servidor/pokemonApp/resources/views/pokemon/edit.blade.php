
@extends('base')
@section('maintitle', 'Edit')
@section('title', 'Editar Pokémon')
@section('content')
    <form action="{{url('pokemon/' . $pokemon->id)}}" method="post">
        @csrf
        @method('put')
        <div class="form-group">
            <label for="numero">Número</label>
            <input value="{{old('numero', $pokemon->numero)}}" required type="number" class="form-control" id="numero" name="numero" placeholder="Número del Pokémon">
        </div>
        <div class="form-group">
            <label for="nombre">Nombre</label>
            <input value="{{old('nombre', $pokemon->nombre)}}" required type="text" class="form-control" id="nombre" name="nombre" placeholder="Nombre del Pokémon">
        </div>
        <div class="form-group">
            <label for="peso">Peso</label>
            <input value="{{old('peso', $pokemon->peso)}}" required type="number" step="0.001" class="form-control" id="peso" name="peso" placeholder="Peso del Pokémon">
        </div>
        <div class="form-group">
            <label for="altura">Altura</label>
            <input value="{{old('altura', $pokemon->altura)}}" required type="number" step="0.001" class="form-control" id="altura" name="altura" placeholder="Altura del Pokémon">
        </div>
        <div class="form-group">
            <label for="tipo">Tipos</label>
            <div id="checkbox-container" class="d-flex flex-wrap">
                @php
                    $tipos = ['Normal', 'Fuego', 'Agua', 'Planta', 'Eléctrico', 'Hielo', 'Lucha', 'Veneno', 'Tierra', 'Volador', 'Psíquico', 'Bicho', 'Roca', 'Fantasma', 'Dragón', 'Siniestro', 'Acero', 'Hada'];
                    $pokemonTipos = explode(',', $pokemon->tipo); // Convertir el string de tipos a un array
                @endphp
                @foreach($tipos as $tipo)
                    <div class="col-6 col-md-4">
                        <div class="form-check">
                            <input 
                                type="checkbox" 
                                id="tipo-{{ $tipo }}" 
                                name="tipo[]" 
                                value="{{ $tipo }}" 
                                class="form-check-input"
                                {{ (is_array(old('tipo', $pokemonTipos)) && in_array($tipo, old('tipo', $pokemonTipos))) ? 'checked' : '' }}
                            >
                            <label class="form-check-label" for="tipo-{{ $tipo }}">{{ $tipo }}</label>
                        </div>
                    </div>
                @endforeach
            </div>
            <small class="form-text text-muted">Puedes seleccionar hasta dos tipos.</small>
        </div>
        <button type="submit" class="btn btn-primary">Editar</button>
    </form>
@endsection

@section('scripts')
<script>
    const checkboxes = document.querySelectorAll('#checkbox-container input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const selected = Array.from(checkboxes).filter(chk => chk.checked);
            if (selected.length > 2) {
                alert('Solo puedes seleccionar hasta dos tipos.');
                this.checked = false;
            }
        });
    });
</script>
@endsection