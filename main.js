function closeElementById(id) {
    const element = document.getElementById(id);
    while (element.hasChildNodes()) {
        element.removeChild(element.firstChild);
    }
}

function choiceSearch(choice = "") {
    let table = ""
    if (choice === "cp") {
        table = '<input type="search" placeholder="Entrez le code postal" onkeyup="searchByCp(this.value);"/>';
    } else if (choice === "insee") {
        table += '<input type="search"  placeholder="Entrez le code insee"/>';
    } else {
        closeElementById("searchBar");
        reloadNombreRaccordableByCodePostal();
    }

    document.getElementById("searchBar").innerHTML = table;
}

function buildTable(data, title) {
    let content = document.createElement("div");
    let table_title = document.createElement('h3');
    let table = document.createElement('table');

    table_title.innerHTML = title;
    header = Object.keys(data[0]);
    header_html = ["<tr>"];
    for (let i = 0; i < header.length; i++) {
        header_html.push("<th>" + header[i] + "</th>");
    }
    header_html.push("</tr>");
    table.innerHTML += header_html.join('');
    for (let i = 0; i < data.length; i++) {
        let content_html = ["<tr>"];
        for (let j = 0; j < header.length; j++) {
            content_html.push("<td>" + data[i][header[j]] + "</td>");
        }
        content_html.push('</tr>');
        table.innerHTML += content_html.join('');
    }
    return [table_title.outerHTML, table.outerHTML].join('');
}

function searchByCp(str) {
    $.ajax({
        method: "POST",
        url: "api/index.php",
        dataType: "json",
        data: {
            "fonction": "getNombreRaccordableByCodePostal"
        },
        beforeSend: function () {
            nombreRaccordableByCodePostal.innerHTML = "";
            nombreRaccordableByCodePostal.innerHTML = "Aucun résultat trouvé pour cette recherche.";
        }
    }).done(function (data) {
        if (data.status == true) {
            const NEW_DATA = [];
            for (const datas of data.data) {
                const VALUES = Object.values(datas)
                if (VALUES[0].includes(str)) {
                    NEW_DATA.push(datas);
                }
            }
            table = buildTable(NEW_DATA, NEW_DATA.length + " résultats trouvés pour votre recherche. ");
            nombreRaccordableByCodePostal.innerHTML = table;
        }
    }).fail(function (xhr, textStatus, errorThrown) {
        alert("Une erreur est survenue durant la récupération des données");
    });

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
            table = buildTable(data.data, "NOMBRE DE RACCORDABLE PAR CODE POSTAL");
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