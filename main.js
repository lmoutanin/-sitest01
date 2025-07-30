function closeElementById(id) {
    const element = document.getElementById(id);
    while (element.hasChildNodes()) {
        element.removeChild(element.firstChild);
    }
}

function choiceSearch(choice = "") {
    let table = ""
    if (choice === "cp") {
        table = '<input type="search" placeholder="Entrez un code postal" onkeyup="searchByCp(this.value);"/>';
    } else if (choice === "insee") {
        table += '<input type="search" placeholder="Entrez un code à 5 chiffres" onkeyup="getNombreRaccordableByCodeInsee(this.value);"/>';
    } else {
        closeElementById("searchBar");
        reloadNombreRaccordableByCodePostal();
    }

    document.getElementById("searchBar").innerHTML = table;
}

async function getCodeInsee(cp) {
    const url = "https://datanova.laposte.fr/data-fair/api/v1/datasets/laposte-hexasmal/lines?q=code_postal:" + cp + "&select=code_commune_insee,nom_de_la_commune";
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const json = await response.json();
        return json.results[0];
    } catch (error) {
        console.error(error.message);
    }
}

function selectButton(button) {
    const buttons = document.querySelectorAll('.tool button');
    buttons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
}

async function getNombreRaccordableByCodeInsee(cp) {
    if (cp.length !== 5) {
        searchByCp(cp);
    } else {
        $.ajax({
            method: "POST",
            url: "api/index.php",
            dataType: "json",
            data: { "fonction": "getNombreRaccordableByCodePostal" },
            beforeSend: function () {
                nombreRaccordableByCodePostal.innerHTML = "";
                nombreRaccordableByCodePostal.innerHTML = "Merci de patienter un instant, les données arrivent.";
            }
        }).done(async function (data) {
            if (data.status == true) {
                const codeInsee = await getCodeInsee(cp);
                const dataInsee = [];
                const nbCpByInsee = [];
                let nbRaccordable = 0;

                for (const NEW_DATA of data.data) {
                    if (nbCpByInsee.includes(NEW_DATA.CP)) {

                        const index = dataInsee.findIndex(element => element.CP === NEW_DATA.CP);
                        if (index !== -1) {
                            nbRaccordable += parseInt(NEW_DATA.NB_RACCORDABLE);
                            dataInsee[index].NB_RACCORDABLE += parseInt(NEW_DATA.NB_RACCORDABLE);
                        }
                    } else {
                        const checkCodeInsee = await getCodeInsee(NEW_DATA.CP);
                        if (checkCodeInsee.code_commune_insee === codeInsee.code_commune_insee) {
                            nbCpByInsee.push(NEW_DATA.CP);
                            nbRaccordable += parseInt(NEW_DATA.NB_RACCORDABLE);

                            const newObject = {
                                CP: NEW_DATA.CP,
                                NB_RACCORDABLE: parseInt(NEW_DATA.NB_RACCORDABLE)
                            };
                            dataInsee.push(newObject);
                        }
                    }
                }
                if (dataInsee.length > 0) {
                    const title = "Nombre de raccordable pour la commune de " + codeInsee.nom_de_la_commune + " (" + codeInsee.code_commune_insee + ") .";
                    const table = buildTable(dataInsee, title.toUpperCase(), nbRaccordable);
                    nombreRaccordableByCodePostal.innerHTML = table;
                }
            }
        }).fail(function (xhr, textStatus, errorThrown) {
            alert("Une erreur est survenue durant la récupération des données");
        });
    }
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
            table = buildTable(NEW_DATA, NEW_DATA.length + " résultats trouvés pour votre recherche. ".toLocaleUpperCase());
            nombreRaccordableByCodePostal.innerHTML = table;
        }
    }).fail(function (xhr, textStatus, errorThrown) {
        alert("Une erreur est survenue durant la récupération des données");
    });

}

function buildTable(data, title, other = 0) {
    let content = document.createElement("div");
    let table_title = document.createElement('h3');

    let table = document.createElement('table');

    table_title.innerHTML = title;

    if (!data || data.length === 0) {
        return [table_title.outerHTML, "<p>Aucune donnée à afficher</p>"].join('');
    }

    let header = Object.keys(data[0]);
    let header_html = ["<tr>"];
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
    if (other !== 0) {
        let total_html = ["<tr>"];
        total_html.push("<td colspan='" + header.length + "'>TOTAL : " + other + "</td>");
        total_html.push("</tr>");
        table.innerHTML += total_html.join('');
    }
    return [table_title.outerHTML, table.outerHTML].join('');
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

