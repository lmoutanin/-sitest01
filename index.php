<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>ACCUEIL</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.7/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-LN+7fdVzj6u52u30Kp6M/trliBMCMKTyK833zpbD+pXdCLuTusPj697FH4R/5mcr" crossorigin="anonymous">
    <link rel="stylesheet" href="css/default.css">
    <link href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.css" rel="stylesheet">

</head>

<body>

    <?php $accueil = "active";
    include('menu.html'); ?>

    <main>
        <div class="principal">
            <div class="tool">
                <div class="element">
                    <h1>RECHERCHE</h1>
                    <div class="search">
                        <button onclick="choiceSearch('cp');">Code Postal</button>
                        <button onclick="choiceSearch('insee');">Code Insee</button>
                    </div>
                    <div id="searchBar"></div>
                </div>

                <div class="element">
                    <h2>ACTUALISER</h2>
                    <div class="other">
                        <button onclick="choiceSearch();">Tableau</button>
                    </div>
                </div>
            </div>
            <div id="nombreRaccordableByCodePostal"></div>
        </div>
    </main>
  
    <?php include('footer.html'); ?>
  
    <script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.7/dist/js/bootstrap.bundle.min.js" integrity="sha384-ndDqU0Gzau9qJ1lfW4pNLlhNTkCfHzAVBReH9diLvGRem5+R9g2FzA8ZGN954O5Q" crossorigin="anonymous"></script>
    <script src="main.js"></script>

</body>

</html>