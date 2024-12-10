<?php

ini_set('display_errors', 1);
error_reporting(E_ALL);

session_start();
if (!isset($_SESSION['user'])) {
    header('Location:.');
    exit;
}

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

if (isset($_POST['id'], $_POST['name'], $_POST['type'], $_POST['ability'], $_POST['hp'], $_POST['attack'], $_POST['defense'])) {
    $id = $_POST['id'];
    $name = $_POST['name'];
    $type = $_POST['type'];
    $ability = $_POST['ability'];
    $hp = $_POST['hp'];
    $attack = $_POST['attack'];
    $defense = $_POST['defense'];

    $ok = true;
    $errors = [];

    // Validaciones
    if (strlen($name) < 2 || strlen($name) > 100) {
        $ok = false;
        $errors[] = 'name';
    }
    if (strlen($type) < 3 || strlen($type) > 50) {
        $ok = false;
        $errors[] = 'type';
    }
    if (strlen($ability) < 3 || strlen($ability) > 100) {
        $ok = false;
        $errors[] = 'ability';
    }
    if (!(is_numeric($hp) && $hp > 0 && $hp <= 9999)) {
        $ok = false;
        $errors[] = 'hp';
    }
    if (!(is_numeric($attack) && $attack > 0 && $attack <= 9999)) {
        $ok = false;
        $errors[] = 'attack';
    }
    if (!(is_numeric($defense) && $defense > 0 && $defense <= 9999)) {
        $ok = false;
        $errors[] = 'defense';
    }

    if ($ok) {
        $sql = "UPDATE pokemon SET name = :name, type = :type, ability = :ability, hp = :hp, attack = :attack, defense = :defense WHERE id = :id";
        $statement = $connection->prepare($sql);

        $parameters = [
            ':id' => $id,
            ':name' => $name,
            ':type' => $type,
            ':ability' => $ability,
            ':hp' => $hp,
            ':attack' => $attack,
            ':defense' => $defense
        ];

        try {
            $statement->execute($parameters);
            header('Location: .?op=editpokemon&result=success');
        } catch (PDOException $e) {
            header('Location: .?op=editpokemon&result=fail');
        }
    } else {
        $_SESSION['old']['name'] = $name;
        $_SESSION['old']['type'] = $type;
        $_SESSION['old']['ability'] = $ability;
        $_SESSION['old']['hp'] = $hp;
        $_SESSION['old']['attack'] = $attack;
        $_SESSION['old']['defense'] = $defense;
        $_SESSION['errors'] = $errors;
        header('Location: edit.php?id=' . $id);
    }
} else {
    header('Location: .?op=editpokemon&result=invalid');
}

?>