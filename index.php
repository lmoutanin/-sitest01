<!DOCTYPE html>
<html>

<head>
    <title>TEST01</title>
    <link rel="stylesheet" href="css/default.css">
</head>

<body>
    <?php include('menu.html'); ?>

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
                    <h2>AUTRE</h2>
                    <div class="other">
                        <button onclick="choiceSearch();">Rafraichir</button>
                    </div>
                </div>
            </div>
            <div id="nombreRaccordableByCodePostal"></div>
        </div>
    </main>

    <script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
    <script src="main.js"></script>

</body>

</html>