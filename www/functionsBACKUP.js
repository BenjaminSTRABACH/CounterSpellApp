function afficherAchat(idcarte) {
    var detail = recupRachat(idcarte);
    var valeurmax = detail.length - 1;
    var valeurdepart = position_dans_le_tableau(idcarte, detail);
    var tabdrap = [];
    tabdrap = index_string_lang(detail, position_dans_le_tableau(idcarte, detail));

    var blocmodal = document.getElementById('cartemdl');
    var imcartesrc = replaceAll(detail[position_dans_le_tableau(idcarte, detail)].ImgCarte, '"', '');
    blocmodal.src = imcartesrc;
    var contenu = "";

    contenu += "<div id='nomext'> Extension : " + afficher_Nom_Ext(idcarte, detail) + "</div>";
    contenu += "<img id='imgext'src=" + afficher_Img_Ext(idcarte, detail) + ">";
    if (detail.length == 1) {
        contenu += '<li style="display:none;" class="lislid ui-btn-icon-right ui-icon-carat-r lictn"><label for="slider-1"></label><br><input type="range" name="slider-1" id="slider-1" value="0" min="0" max="0" data-popup-enabled="true"></li><br>';
    }
    else {
        contenu += '<li class="lislid ui-btn-icon-right ui-icon-carat-r lictn"><label for="slider-1">Extension :</label><br><input onchange="refreshmodal(this,' + idcarte + ');prixRachat(' + idcarte + ');" type="range" name="slider-1" id="slider-1" value="' + valeurdepart + '" min="0" max="' + valeurmax + '" data-popup-enabled="true"></li><br>';
    }
    // contenu += '<li class="lislid ui-btn-icon-right ui-icon-carat-r lictn"><label for="slider-1"><div id="etatCarte">Etat : Mint</div></label><input onchange="etatSlider(this);prixRachat(' + idcarte + ');" type="range" name="slider-1" id="slider-2" value="1" min="1" max="6" data-popup-enabled="true"></li><br>';
    contenu += '<li class="lislid ui-btn-icon-right ui-icon-carat-r lictn"><label for="slider-1"><div id="etatCarte">Etat : Mint</div></label><input onchange="etatSlider(this);prixRachat(' + idcarte + ');" type="range" name="slider-1" id="slider-2" value="1" min="1" max="6" data-popup-enabled="true"></li><br>';
    contenu += '<li class="lislid ui-btn-icon-right ui-icon-carat-r lictn"><label for="slider-1"><div id="slidDrap">Langue : <img src="media/' + afficherDrap(0, tabdrap) + '.png" height=15></div></label><input onchange="langueSlider(this,' + idcarte + ');prixRachat(' + idcarte + ');" type="range" name="slider-1" id="slider-3" value="1" min="1" max="' + tabdrap.length + '" data-popup-enabled="true"></li><br>';
    // contenu += '<li class="lislid ui-btn-icon-right ui-icon-carat-r lictn"><label for="slider-1"><div id="slidDrap">Langue :</div></label><ul class="drapList">';
    // for(var i = 0; i < tabdrap.length - 1; i++) {
    //     contenu += "<li class='drap' onclick='selectDrap(" + i + "," + idcarte + ")'><img src='media/" + afficherDrap(i, tabdrap) + ".png' height=42></li>";
    // }
    // contenu +='</ul></li><br>';
    
    if (detail[position_dans_le_tableau(idcarte, detail)].FoilPossible == 0) {
        // contenu += '<li class="lislid ui-btn-icon-right ui-icon-carat-r lictn"><label for="slider-1"><div id="slidFoil">Foil</div></label><input onchange="foilSlider(this);prixRachat(' + idcarte + ');" type="range" name="slider-1" id="slider-4" value="0" min="0" max="1" data-popup-enabled="true"></li><br>';
        contenu += '<li class="lislid ui-btn-icon-right ui-icon-carat-r lictn"><label for="slider-1"><div id="slidFoil">Foil</div></label><input onchange="foilSlider(this);prixRachat(' + idcarte + ');" type="range" name="slider-1" id="slider-4" value="0" min="0" max="1" data-popup-enabled="true"></li><br>';
    }
    if (detail[position_dans_le_tableau(idcarte, detail)].FoilPossible == 1) {
        contenu += '<li style="display:none;" class="lislid ui-btn-icon-right ui-icon-carat-r lictn"><label for="slider-1"><div id="slidFoil">Foil : Non</div></label><input type="range" name="slider-1" id="slider-4" value="1" min="1" max="1" data-popup-enabled="true"></li>';
        contenu += '<li class="lislid ui-btn-icon-right ui-icon-carat-r lictn">Cette carte n\'existe qu\'en FOIL.</li><br>';
    }
    if (detail[position_dans_le_tableau(idcarte, detail)].FoilPossible == 2) {
        contenu += '<li style="display:none;" class="lislid ui-btn-icon-right ui-icon-carat-r lictn"><label for="slider-1"><div id="slidFoil">Foil : Non</div></label><input type="range" name="slider-1" id="slider-4" value="0" min="0" max="0" data-popup-enabled="true"></li>';
        contenu += '<li class="lislid ui-btn-icon-right ui-icon-carat-r lictn">Cette carte n\'existe pas en FOIL.</li><br>';
    }

    contenu += '<li class="lislid ui-btn-icon-right ui-icon-carat-r lictn"><label for="slider-1"><div id="slidQte">Quantité : 1</div></label><input onchange="qteSlider(this);prixRachat(' + idcarte + ');" type="range" name="slider-1" id="slider-5" value="1" min="1" max="8" data-popup-enabled="true"></li>';
    contenu += '<li class="lislid ui-btn-icon-right ui-icon-carat-r lictn"><div id="liprix"></div></li>'
    document.getElementById('genul0').innerHTML = contenu;
    contenu = "";
    contenu += "<img onclick='reprise_carte(" + idcarte + "," + prixRachat(idcarte) + ");' src='media/cart.png'>";
    contenu += "<div id='divpan'></div>";
    document.getElementById('genul0').innerHTML += contenu;

    // prixRachat(idcarte);

    // document.getElementById('slider-4').style.backgroundImage == 'linear-gradient(to right, grey, white, grey, white, grey )';
}

function prixRachat(idcarte) {
    var detail = recupRachat(idcarte);
    var tabdrap = [];
    tabdrap = index_string_lang(detail, position_dans_le_tableau(idcarte, detail));

    // var extension = document.getElementById("slider-1").value;
    var etat = document.getElementById("slider-2").value;
    console.log(etat);
    var langue = document.getElementById("slider-3").value;
    console.log(langue);
    var langue2 = tabdrap[langue - 1];

    var foil = document.getElementById("slider-4").value;
    console.log(foil);
    var qte = document.getElementById("slider-5").value;
    console.log(qte);
    console.log("----------------------")
    // alert(etat);
    // var prixRachat = $('#storJson').load('https://www.counterspell.fr/affiche_prix_simple/' + idcarte + '/' + foil + '/' + etat + '/' + langue + '/echange/72000/rien');//remplacer rien par la boutique préférée 
    // var prixRachatP = parseInt(prixRachat);
    var directory = 'http://www.counterspell.fr/affiche_prix_simple/' + idcarte + '/' + foil + '/' + etat + '/' + langue2 + '/echange/72000/rien';
    console.log(directory);
    var element_idJson = 'storJson';
    submitForm(element_idJson, directory, 'innerHTML');
    var recup = document.getElementById(element_idJson).innerHTML;
    var prixRachat = recup * qte;
    // alert(prixRachat);
    // var prixRachatP = document.getElementById('storJson').innerHTML;
    // alert(prixRachatP);
    if (prixRachat == '0.00' || prixRachat == 'NaN' || prixRachat == '0') {
        document.getElementById('liprix').innerHTML = 'Veuillez vérifier vos informations de cartes, ou contacter directement la boutique.';
        return false
    } else {
        document.getElementById('liprix').innerHTML = Number.parseFloat(prixRachat).toFixed(2) + '€';
        return prixRachat;
    }

}

function etatSlider(etat) {
    var etats = ['', 'Mint', 'Near-mint', 'Excellent', 'Fine', 'Played', 'Poor'];
    document.getElementById('etatCarte').innerHTML = 'Etat : ' + etats[etat.value];
}

function langueSlider(valeur, idcarte) {
    var detail = recupRachat(idcarte);
    tabdrap = index_string_lang(detail, position_dans_le_tableau(idcarte, detail));
    valeur = tabdrap[(valeur.value) - 1];
    document.getElementById('slidDrap').innerHTML = "Langue : <img src='media/" + afficherDrap(valeur) + ".png' height=15>";
    console.log(afficherDrap(valeur));
}

function foilSlider(boolFoil) {
    // var deb = document.getElementById('foilSlider').innerHTML;
    // alert(deb);
    if (boolFoil.value == 0) {
        document.getElementById('slidFoil').innerHTML = "Foil : Non";
        document.getElementById('slider-4').style.backgroundImage = 'linear-gradient(to right, white, white)';
    }
    else {
        document.getElementById('slidFoil').innerHTML = "Foil : Oui";
        document.getElementById('slider-4').style.backgroundImage = 'linear-gradient(to right, red, yellow, green, blue,green, yellow, red)';
    }
}

function qteSlider(qte) {
    // alert(qte.value);
    document.getElementById('slidQte').innerHTML = 'Quantité : ' + qte.value;
}

function reprise_carte(idcarte, prixRachat) {
    var detail = recupRachat(idcarte);
    var tabdrap = [];
    tabdrap = index_string_lang(detail, position_dans_le_tableau(idcarte, detail));
    var etat = document.getElementById("slider-2").value;
    var langue = document.getElementById("slider-3").value;
    var foil = document.getElementById("slider-4").value;
    var qte = document.getElementById("slider-5").value;
    var langue2 = tabdrap[langue - 1];
    var alteree = "0";
    var tampon = "0";
    var datee = "0";
    var dedicace = "0";
    var idelmt = "divpan";
    var boutiquepref = 'nantes_temple'
    modif_panier(idcarte, etat, langue2, (qte * (-1)), foil, prixRachat, boutiquepref, alteree, tampon, datee, dedicace, idelmt);
}

function afficherStock(idcarte) {


    var element_idJson = 'storJson';
    //stock devient un objet avec le stock de toutes les boutiues pour cette carte et celles avec le même nom
    directory = 'http://www.counterspell.fr/app_json_cartes/getstock/' + idcarte;
    submitForm(element_idJson, directory, 'innerHTML');
    stock = document.getElementById(element_idJson).innerHTML;
    var stock = JSON.parse(stock);
    //Fin récup stock
    //boutiques devient le tableau de données sur les boutiques existantes

    // directory = 'https://www.counterspell.fr/app_json_cartes/getboutiques';
    // submitForm(element_idJson, directory, 'innerHTML');
    // recup = document.getElementById(element_idJson).innerHTML;
    // var boutiques = JSON.parse(recup);

    //Tableau avec le nom de chaque boutique ayant au moins une carte en stock
    var boutTab = Object.getOwnPropertyNames(stock);

    // var prix = "9.99";
    // var nomBout = "";
    var contenu_total = "";
    var contenu_first = "";

    if (boutTab.length == 1) {
        contenu += "<ul id='ulll' data-role='listview' class= 'ui-listview ui-listview-inset ui-corner-all ui-shadow' data-inset='true' data-divider-theme='a'><li class='ui-li-divider ui-bar-a ui-first-child' data-role='list-divider'>Pas de stock disponible pour cette carte</li><div id='contenu1' class='divctn'></div></ul>";
    }

    //boucle pour chaque boutique ayant du stock
    for (var h = 0; h < boutTab.length - 1; h++) {
        var villeBout = boutTab[h];
        var idcartecheck = 0;
        var idboutiquecheck = 0;
        for (var i = 0; i < stock[villeBout].length; i++) {
            var contenu = "";

            if (idboutiquecheck == 0 || idboutiquecheck != stock[villeBout][i].NomBoutique) {
                contenu += "<ul id='ulll' data-role='listview' class= 'ui-listview ui-listview-inset ui-corner-all ui-shadow' data-inset='true' data-divider-theme='a'><li class='ui-li-divider ui-bar-a ui-first-child' data-role='list-divider'>" + stock[villeBout][i].NomBoutique + "</li><div id='contenu" + h + "' class='divctn'></div></ul>";
            }
            idboutiquecheck = stock[villeBout][i].NomBoutique;
            if (idcartecheck == 0 || idcartecheck != stock[villeBout][i].Carte_idCarte) {
                texttemp = "<img src=" + stock[villeBout][i].ImgExtension + " height=12>";
                contenu += "<li class='liext'><div id='liii'>" + texttemp + " " + stock[villeBout][i].NomExtension + "</div></li>";
            }
            idcartecheck = stock[villeBout][i].Carte_idCarte;
            style = "";
            var foil = stock[villeBout][i].Foil;
            if (foil == 1) {
                style = "style='background-image : url(\"media/surfoil.png\");' ";
            }
            contenu += "<li id='idfoil" + i + "' class='ui-btn ui-btn-icon-right ui-icon-carat-r lictn'><a href='#'><div class='flex-container lideplus' " + style + "id='divfoil" + i + "'>";
            var idlang = stock[villeBout][i].Langages_idLangages;
            if (idlang != 0) {
                contenu += "<img src='media/" + afficherDrap(idlang) + ".png' height=15>&nbsp;&nbsp;";
            }
            var qte = stock[villeBout][i].Quantite;
            contenu += 'Dispo : ' + qte + '&nbsp;';
            var etat = stock[villeBout][i].Etats_idEtats;
            contenu += GetEtat(etat);
            contenu += stock[villeBout][i].prix_vente + '€&nbsp;';
            contenu += "<SELECT class='selectopt' id='selectopt_" + i + "_" + h + "' name='quantite'>";
            for (var x = 1; x <= qte; x++) {
                contenu += "<OPTION value='" + x + "'>" + x + "</OPTION>";
            }
            contenu += "</SELECT>";
            var alteree = stock[villeBout][i].Alteration;
            var tampon = stock[villeBout][i].Tampon;
            var datee = stock[villeBout][i].Datee;
            var dedicace = stock[villeBout][i].Dedicace;
            idelmt = "panier_" + i + "_" + h;
            contenu += "&nbsp;&nbsp;&nbsp;&nbsp;<img id='cart' src='media/cart.png' onclick='modif_panier(" + stock[villeBout][i].Carte_idCarte + "," + etat + "," + idlang + "," + "document.getElementById(`selectopt_" + i + "_" + h + "`).value" + "," + foil + "," + stock[villeBout][i].prix_vente + ",`" + escape(villeBout) + "`," + alteree + "," + tampon + "," + datee + "," + dedicace + ",`" + idelmt + "`);' ></a ></div><div class='retourpanier' id='panier_" + i + "_" + h + "'></div></li > ";
            if (stock[villeBout][i].NomBoutique == Cookies.get('Boutique_preferee')) {
                contenu_first += contenu;
            } else {
                contenu_total += contenu;
            }
        }

        //FIN boucle pour chaque ligne de stock de cette boutique
    }
    //FIN boucle pour chaque boutique ayant du sto
    document.getElementById('infc').innerHTML = stock.general.nom_carte;
    document.getElementById('genul0').innerHTML = contenu_first + contenu_total;
}
