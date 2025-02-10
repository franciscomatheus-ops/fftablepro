<?php
if (isset($_GET['dados'])) {
    // Recupera os dados da query string
    $dados = $_GET['dados'];

    // Decodifica a string JSON de volta para uma array
    $lines = json_decode($dados, true);

    // Salva os dados em um arquivo JSON
    file_put_contents('dados.json', json_encode($lines, JSON_PRETTY_PRINT));

    // Para verificar o conteúdo
    print_r($lines);
}
else if (isset($_GET['q'])) {
    // Recupera os dados da query string
    $q = $_GET['q'];

    // Decodifica a string JSON de volta para uma array
    $quedas = json_decode($q, true);

    // Salva os dados em um arquivo JSON
    file_put_contents('quedas.json', json_encode($quedas, JSON_PRETTY_PRINT));

    // Para verificar o conteúdo
    print_r($q);
}
?>