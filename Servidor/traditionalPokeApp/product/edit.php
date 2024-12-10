<?php

ini_set('display_errors', 1);
error_reporting(E_ALL);

session_start();
if (!isset($_SESSION['user'])) {
    header('Location:.');
    exit;
}
$user = $_SESSION['user'];

try {
    $connection = new PDO(
        'mysql:host=localhost;dbname=pokemons',
        'santi',
        '121223',
        array(
            PDO::ATTR_PERSISTENT => true,
            PDO::MYSQL_ATTR_INIT_COMMAND => 'set names utf8'
        )
    );
} catch (PDOException $e) {
    header('Location:..');
    exit;
}

if (isset($_GET['id'])) {
    $id = $_GET['id'];
} else {
    $url = '.?op=editpokemon&result=noid';
    header('Location: ' . $url);
    exit;
}

$sql = 'select * from pokemon where id = :id';
$sentence = $connection->prepare($sql);
$parameters = ['id' => $id];
foreach ($parameters as $nombreParametro => $valorParametro) {
    $sentence->bindValue($nombreParametro, $valorParametro);
}

try {
    $sentence->execute();
    $row = $sentence->fetch();
} catch (PDOException $e) {
    header('Location:.');
    exit;
}

if ($row == null) {
    header('Location: .');
    exit;
}

$name = $row['name'];
$type = $row['type'];
$ability = $row['ability'];
$hp = $row['hp'];
$attack = $row['attack'];
$defense = $row['defense'];

if (isset($_SESSION['old'])) {
    $name = $_SESSION['old']['name'];
    $type = $_SESSION['old']['type'];
    $ability = $_SESSION['old']['ability'];
    $hp = $_SESSION['old']['hp'];
    $attack = $_SESSION['old']['attack'];
    $defense = $_SESSION['old']['defense'];
    unset($_SESSION['old']);
}

$errors = [];
if (isset($_SESSION['errors'])) {
    $errors = $_SESSION['errors'];
    unset($_SESSION['errors']);
}

$connection = null;
?>
<!doctype html>
<html>

<head>
    <meta charset="UTF-8">
    <title>dwes</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
        integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
</head>

<body>
    <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
        <a class="navbar-brand" href="..">dwes</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault"
            aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item">
                    <a class="nav-link" href="..">home</a>
                </li>
                <li class="nav-item active">
                    <a class="nav-link" href="./">pokemons</a>
                </li>
            </ul>
        </div>
    </nav>
    <main role="main">
        <div class="jumbotron">
            <div class="container">
                <h4 class="display-4">Edit Pokémon</h4>
            </div>
        </div>
        <div class="container">
            <?php
            if (!empty($errors)) {
                ?>
                <div class="alert alert-danger" role="alert">
                    <ul>
                        <?php foreach ($errors as $error) { ?>
                            <li><?= $error ?> is invalid</li>
                        <?php } ?>
                    </ul>
                </div>
                <?php
            }
            ?>
            <form action="update.php" method="post">
                <div class="form-group">
                    <label for="name">Pokémon Name</label>
                    <input value="<?= $name ?>" required type="text" class="form-control" id="name" name="name"
                        placeholder="Enter Pokémon name">
                </div>
                <div class="form-group">
                    <label for="type">Type</label>
                    <select required class="form-control" id="type" name="type">
                        <option value="fire" <?= $type == 'fire' ? 'selected' : '' ?>>Fire</option>
                        <option value="water" <?= $type == 'water' ? 'selected' : '' ?>>Water</option>
                        <option value="grass" <?= $type == 'grass' ? 'selected' : '' ?>>Grass</option>
                        <option value="electric" <?= $type == 'electric' ? 'selected' : '' ?>>Electric</option>
                        <option value="psychic" <?= $type == 'psychic' ? 'selected' : '' ?>>Psychic</option>
                        <option value="ice" <?= $type == 'ice' ? 'selected' : '' ?>>Ice</option>
                        <option value="dragon" <?= $type == 'dragon' ? 'selected' : '' ?>>Dragon</option>
                        <option value="dark" <?= $type == 'dark' ? 'selected' : '' ?>>Dark</option>
                        <option value="fairy" <?= $type == 'fairy' ? 'selected' : '' ?>>Fairy</option>
                        <option value="normal" <?= $type == 'normal' ? 'selected' : '' ?>>Normal</option>
                        <option value="fighting" <?= $type == 'fighting' ? 'selected' : '' ?>>Fighting</option>
                        <option value="flying" <?= $type == 'flying' ? 'selected' : '' ?>>Flying</option>
                        <option value="poison" <?= $type == 'poison' ? 'selected' : '' ?>>Poison</option>
                        <option value="ground" <?= $type == 'ground' ? 'selected' : '' ?>>Ground</option>
                        <option value="rock" <?= $type == 'rock' ? 'selected' : '' ?>>Rock</option>
                        <option value="bug" <?= $type == 'bug' ? 'selected' : '' ?>>Bug</option>
                        <option value="ghost" <?= $type == 'ghost' ? 'selected' : '' ?>>Ghost</option>
                        <option value="steel" <?= $type == 'steel' ? 'selected' : '' ?>>Steel</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="ability">Ability</label>
                    <input value="<?= $ability ?>" required type="text" class="form-control" id="ability" name="ability"
                        placeholder="Enter Pokémon ability">
                </div>
                <div class="form-group">
                    <label for="hp">HP</label>
                    <input value="<?= $hp ?>" required type="number" class="form-control" id="hp" name="hp"
                        placeholder="Enter Pokémon HP">
                </div>
                <div class="form-group">
                    <label for="attack">Attack</label>
                    <input value="<?= $attack ?>" required type="number" class="form-control" id="attack" name="attack"
                        placeholder="Enter Pokémon attack">
                </div>
                <div class="form-group">
                    <label for="defense">Defense</label>
                    <input value="<?= $defense ?>" required type="number" class="form-control" id="defense"
                        name="defense" placeholder="Enter Pokémon defense">
                </div>
                <input type="hidden" name="id" value="<?= $id ?>" />
                <button type="submit" class="btn btn-primary">Edit Pokémon</button>
            </form>
        </div>
        <hr>
    </main>
    <footer class="container">
        <p>&copy; IZV 2024</p>
    </footer>
    <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js"
        integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN"
        crossorigin="anonymous"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"
        integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl"
        crossorigin="anonymous"></script>
</body>

</html>