<!DOCTYPE html>
<html>
<head>
    <title>TEST01</title>
    <link rel="stylesheet" href="css/default.css">
</head>
<body>
    <?php include('menu.html'); ?>
    <div id="nombreRaccordableByCodePostal">
    </div>
    <script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
    <script>

        function buildTable(data, title) {
            let content = document.createElement("div");
            let table_title = document.createElement('h3');
            let table = document.createElement('table');

            table_title.innerHTML = title;
            header = Object.keys(data[0]);
            header_html = ["<tr>"];
            for(let i =0; i < header.length; i++) {
                header_html.push("<th>" + header[i] + "</th>");
            }
            header_html.push("</tr>");
            table.innerHTML += header_html.join('');

            for(let i = 0; i < data.length; i++) {
                let content_html = ["<tr>"];
                for(let j=0; j < header.length; j++) {
                    content_html.push("<td>" + data[i][header[j]] + "</td>");
                }
                content_html.push('</tr>');
                table.innerHTML += content_html.join('');
            }
            return [table_title.outerHTML,table.outerHTML].join('');
        }

        function reloadNombreRaccordableByCodePostal() {
            $.ajax({
                method: "POST",
                url: "api/index.php",
                dataType: "json",
                data: {
                    "fonction": "getNombreRaccordableByCodePostal"
                },
                beforeSend: function () {
                    nombreRaccordableByCodePostal.innerHTML = "";
                    nombreRaccordableByCodePostal.innerText = "Chargement des données en cours";
                }
            }).done(function (data) {
                if (data.status == true) {
                    table = buildTable(data.data, "Nombre de raccordable par code postal");
                    nombreRaccordableByCodePostal.innerHTML = table;
                }
            }).fail(function (xhr, textStatus, errorThrown) {
                alert("Une erreur est survenue durant la récupération des données");
            });
        }

        var nombreRaccordableByCodePostal = document.getElementById('nombreRaccordableByCodePostal');

        $(document).ready(function () {
            reloadNombreRaccordableByCodePostal();
        });
    </script>
</body>
</html>
