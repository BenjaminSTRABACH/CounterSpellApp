// $(document).on("pagecreate", function () {
//     $("#slider-1").on('slidestop', function (event) {
//         console.log("slidestop event fired");
//     });
// });
var marchand = "achat";
function recupCard() {
    var card = document.getElementById("basic").value;
    rechercheCarte(card);
}

function uniqueID() {
    if ((Cookies.get('UniqueID')) == undefined) {
        modal(0, '0');
        recup_pseudo();
    }
    else {
        Cookies.set('UniqueID', Cookies.get('UniqueID'), { expires: 30 });
        Cookies.set('Pseudo', Cookies.get('Pseudo'), { expires: 30 });
        Cookies.set('Boutique_preferee', Cookies.get('Boutique_preferee'), { expires: 30 });
        Cookies.set('Boutique_preferee_nom_court', Cookies.get('Boutique_preferee_nom_court'), { expires: 30 });
    }
    if (Cookies.get('Boutique_preferee') == undefined) {
        Cookies.set('Boutique_preferee', "Le Temple du Jeu Nantes", { expires: 30 });
        Cookies.set('Boutique_preferee_nom_court', "nantes_temple", { expires: 30 });
    }
}

//Fonction de récupération des cartes
//*******************************************************************************************************//
function changerboutique() {
    var directory = 'http://www.counterspell.fr/app_json_cartes/getboutiques';
    var element_idJson = 'storJson';
    submitForm(element_idJson, directory, 'innerHTML');
    recup = document.getElementById(element_idJson).innerHTML;
    var boutiques = JSON.parse(recup);

    var contenu = "<SELECT onchange='changercookieboutique(this);' class='selectopt' id='change' name='quantite'>";
    contenu += "<OPTION value='0'>Changer de boutique préférée</OPTION>";
    for (var i = 0; i < boutiques.length; i++) {
        if (boutiques[i].Nom_complet != "Boutique Test") {
            contenu += "<OPTION value='" + boutiques[i].Nom_complet + "___" + boutiques[i].nom_boutique + "'>" + boutiques[i].Nom_complet + "</OPTION>";
        }
    }
    contenu += "</SELECT>";
    document.getElementById('chg_boutique').innerHTML = contenu;
}

function changercookieboutique(valeur) {
    valeur = valeur.value;
    if (valeur == 0) {
        return false;
    }
    valeurdebut = valeur.split("___");
    Cookies.set('Boutique_preferee', valeurdebut[0], { expires: 30 });
    Cookies.set('Boutique_preferee_nom_court', valeurdebut[1], { expires: 30 });
    document.getElementById('boutique_preferee').innerHTML = Cookies.get('Boutique_preferee');
    affichercarterechercher();
}

function modal(card, liencarte) {
    if (card != 0){
        var contenu = '<div id="mdcContent" class="modal-content"><span class="close">&times;</span><div id="mdlct"><div id="prescart"><img id="cartemdl" class="imgg modalmdf"><div id="infc"></div></div><div id="genul0"></div></div><div>';
        document.getElementById('myModal').innerHTML = contenu;
        var card = card;
        // Get the modal
        var modal = document.getElementById('myModal');
        // Get the <span> element that closes the modal
        var span = document.getElementsByClassName("close")[0]; 1
        modal.style.display = "block";
        //Affichage carte + nom + rareté
        var blocmodal = document.getElementById('cartemdl');
        blocmodal.src = "http://www.counterspell.fr/" + liencarte;
        // var directory = 'https://www.counterspell.fr/app_json_cartes/voir_json/' + card;
        // var element_idJson = 'storJson';
        // submitForm(element_idJson, directory, 'innerHTML');

        if (marchand == "achat") {
            afficherStock(card);
        }
        else {
            // alert(card);
            afficherAchat(card);
        }
    }
    
    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
        modal.style.display = "none";
    }
    
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}

function recup_pseudo() {
    var contenu = "<br><br>Veuillez mettre votre pseudo,<br> il ne sera utilisé que pour la sauvegarde de votre panier.<br><br><input id='pseudo' type='text' placeholder='Votre pseudo.'/>";
    contenu += "<button onclick='sauvegarde_pseudo();'>Valider</button>";
    document.getElementById('mdlct').innerHTML = contenu;
}

function sauvegarde_pseudo() {
    var pseudo = document.getElementById("pseudo").value;
    Cookies.set('Pseudo', pseudo, { expires: 30 });
    var start = (Date.now()).toString();
    var uniqueID = Cookies.get('Pseudo') + "_" + start.substr(start.length - 1);
    var alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    for (var i = 0; i < 3; i++) {
        uniqueID += alphabet[Math.floor(Math.random() * Math.floor(alphabet.length))];
    }
    Cookies.set('UniqueID', uniqueID, { expires: 30 });
    document.getElementById('myModal').style.display = "none";

}

//Fonction de récupération du nom des cartes
//*******************************************************************************************************//
function getNomCarte(idcarte) {
    var directory = 'http://www.counterspell.fr/app_json_cartes/voir_json/' + idcarte;
    var element_idJson = 'storJson';
    submitForm(element_idJson, directory, 'innerHTML');
    var recup = document.getElementById(element_idJson).innerHTML;
    var infoCarte = JSON.parse(recup);
    var nomCarte = '';
    if ((infoCarte.NomFr == null) || (infoCarte.NomFr == "")) {
        nomCarte = infoCarte.NomEn;
    } else {
        nomCarte = infoCarte.NomFr;
    }
    return nomCarte;
}

//Fonction de recherche des cartes
//*******************************************************************************************************//
function rechercheCarte(card) {
    var motsaisi = card;

    if (motsaisi.length < 4) {
        document.getElementById("nbrcartes").innerHTML = "Votre recherche doit comporter un minimum de 3 lettres";
        document.getElementById("slider").innerHTML = "";
        return false;
    }
    var directory = 'http://www.counterspell.fr/app_json_cartes/recherche_carte/' + escape(card);
    var element_idJson = 'storJson';
    // var element_idCarte = 'carte';
    submitForm(element_idJson, directory, 'innerHTML');
    var recup = document.getElementById(element_idJson).innerHTML;
    if (recup.length == 0) {
        document.getElementById("nbrcartes").innerHTML = "";
        document.getElementById("slider").innerHTML = " <div style='color:red; font-weight:bold; font-size:25;'>/!\\ Aucun Résultat /!\\</div> <br>Veuillez réessayer";
        return false;
    }
    // alert(recup);
    var carte = JSON.parse(recup);

    if (carte.length > 1) {
        document.getElementById('nbrcartes').innerHTML = carte.length + " cartes trouvées.";

    } else {
        document.getElementById('nbrcartes').innerHTML = "Une carte trouvée.";
    }
    var contenu = "<div id='top'></div>";
    for (i = 0; i < carte.length; i++) {
        // alert(carte[i].img);
        // contenu += "<img class='lazyload cards' alt='Photo' src='img/rainbow.jpg' data-src='https://www.counterspeel.fr/app_json_cartes/recherche_carte/'" + carte[i].img + "' style='width:29%;'>";
        src = "http://www.counterspell.fr/" + carte[i].img;
        contenu += "<div class='conteneur_imgcarte'><img class='lazyload cards'  alt='Photo' src='media/nope.png' data-src='" + src + "' onclick='modal(" + carte[i].id + ",`" + escape(carte[i].img) + "` ) '></div>";

    }
    document.getElementById("slider").innerHTML = contenu;
    load2();
}

//Fonction d'affichage des cartes
//*******************************************************************************************************//
function afficherCarte(card) {
    var directory = 'http://www.counterspell.fr/app_json_carte/img_to_app/' + card;
    var element_idJson = 'storJson';
    submitForm(element_idJson, directory, 'innerHTML');
    var recup = document.getElementById(element_idJson).innerHTML;

    return recup;
}

function affichercarterechercher() {
    var directory = 'http://www.counterspell.fr/int_client/recherches_to_csmobile/' + Cookies.get('Boutique_preferee_nom_court');
    var element_idJson = 'storJson';
    submitForm(element_idJson, directory, 'innerHTML');
    var recup = document.getElementById(element_idJson).innerHTML;
    var carte = JSON.parse(recup);

    document.getElementById('nbrcartes').innerHTML = "Cartes recherchées par votre boutique.";
    var contenu = "<div id='top'></div>";
    if (carte.length == 0) {
        document.getElementById("slider").innerHTML = "<br>Votre boutique ne recherche actuellement aucune carte.";
        return false;
    }
    for (i = 0; i < carte.length; i++) {
        // alert(carte[i].img);
        // contenu += "<img class='lazyload cards' alt='Photo' src='img/rainbow.jpg' data-src='https://www.counterspeel.fr/app_json_cartes/recherche_carte/'" + carte[i].img + "' style='width:29%;'>";
        src = replaceAll(carte[i].img, '"', "");
        src2 = replaceAll(carte[i].img, 'http://www.counterspell.fr/', "");
        src2 = replaceAll(src2, '"', "");
        contenu += "<div class='conteneur_imgcarte'><img class='lazyload cards'  alt='Photo' src='media/nope.png' data-src='" + src + "' onclick='modal(" + carte[i].id + ",`" + src2 + "` ) '></div>";

    }
    document.getElementById("slider").innerHTML = contenu;
    load2();
}

//Fonction d'affichage des drapeaux
//*******************************************************************************************************//
function afficherDrap(idDrap, tableau, verif) {
    // var directory = 'https://www.counterspell.fr/app_json_cartes/idlang_to_imgdrap/' + idDrap;
    // var element_idImg = 'storImg';
    // submitForm(element_idImg, directory, 'innerHTML');
    // var recup = document.getElementById(element_idImg).innerHTML;
    if (tableau == undefined && verif == undefined) {
        verif = 1;
    }
    var recup = "";
    var listDrap = ["", "drapFra", "drapAng", "drapAll", "drapEsp", "drapIta", "drapCor", "drapRus", "drapJap", "drapChi", "drapChi"];
    if (marchand == "achat" || verif == 1) {
        if (idDrap > 0 && idDrap < 10) {
            recup = listDrap[idDrap];
        }
    }
    else {
        recup = listDrap[tableau[idDrap]];
    }

    return recup;
}

//Fonction d'affichage des extensions
//*******************************************************************************************************//
function afficherExt(idExt) {
    var directory = 'http://www.counterspell.fr/app_json_cartes/idcarte_to_imgsrcext/' + idExt;
    var element_idImg = 'storImg';
    submitForm(element_idImg, directory, 'innerHTML');
    var recup = document.getElementById(element_idImg).innerHTML;
    return recup;
}

//Fonction d'affichage des foils
//*******************************************************************************************************//
function afficherFoil() {
    var directory = 'http://www.counterspell.fr/app_json_cartes/getimgfoil';
    var element_idImg = 'storImg';
    submitForm(element_idImg, directory, 'innerHTML');
    var recup = document.getElementById(element_idImg).innerHTML;
    return recup;
}

function GetNomBoutique(idboutique) {
    //boutiques devient le tableau de données sur les boutiques existantes
    directory = 'http://www.counterspell.fr/app_json_cartes/getboutiques';
    var element_idJson = 'storJson';
    submitForm(element_idJson, directory, 'innerHTML');
    recup = document.getElementById(element_idJson).innerHTML;
    var boutiques = JSON.parse(recup);

    var nomBout = "";
    for (var j = 0; j < boutiques.length; j++) {
        if (boutiques[j].idBoutiques == idboutique) {
            nomBout = boutiques[j].Nom_complet;
        }
    }
    // alert(nomBout);
    return nomBout;
}

function GetEtat(etat) {
    var contenu = "";
    if (etat == 1) {
        contenu += '| M &nbsp;| &nbsp; ';
    }
    if (etat == 2) {
        contenu += '| NM | &nbsp;';
    }
    if (etat == 3) {
        contenu += '| EX | &nbsp;';
    }
    if (etat == 4) {
        contenu += '| F &nbsp;| &nbsp;';
    }
    if (etat == 5) {
        contenu += '| P &nbsp;| &nbsp;';
    }
    if (etat == 6) {
        contenu += '| Po | &nbsp;';
    }
    return contenu
}

//Fonction d'affichage du stock
//*******************************************************************************************************//
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
    contenu += '<li class="lislid ui-btn-icon-right ui-icon-carat-r lictn"><label for="slider-1"><div id="etatCarte">Etat : Mint</div></label><input onchange="etatSlider(this);prixRachat(' + idcarte + ');" type="range" name="slider-1" id="slider-2" value="1" min="1" max="6" data-popup-enabled="true"></li><br>';
    // contenu += '<li class="lislid ui-btn-icon-right ui-icon-carat-r lictn"><label for="slider-1"><div id="slidDrap">Langue : <img src="media/' + afficherDrap(0, tabdrap) + '.png" height=15></div></label><input onchange="langueSlider(this,' + idcarte + ');prixRachat(' + idcarte + ');" type="range" name="slider-1" id="slider-3" value="1" min="1" max="' + tabdrap.length + '" data-popup-enabled="true"></li><br>';
    contenu += '<li class="lislid ui-btn-icon-right ui-icon-carat-r lictn"><label for="slider-1"><div id="slidDrap">Langue :</div></label><ul class="drapList">';
    for(var i = 0; i < tabdrap.length - 1; i++) {
        contenu += "<li class='drap' onclick='selectDrap(" + i + "," + idcarte + ")'><img src='media/" + afficherDrap(i, tabdrap) + ".png' height=42></li>";
    }
    contenu +='</ul></li><br>';
    
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

function index_string_lang(detail, valeur) {
    var str = detail[valeur].LangPossible;
    var comp = 0;
    var tablo = [];
    while (str.indexOf('1', comp) != -1) {
        comp = str.indexOf('1', comp) + 1;
        tablo.push(comp);
    }
    return tablo;
}

function position_dans_le_tableau(idcarte, detail) {
    for (var i = 0; i < detail.length; i++) {
        if (idcarte == detail[i].idcarte) {
            return i;
        }
    }
    return false;
}

function replaceAll(machaine, chaineARemaplacer, chaineDeRemplacement) {
    return machaine.replace(new RegExp(chaineARemaplacer, 'g'), chaineDeRemplacement);
}

function afficher_Nom_Ext(idcarte, detail) {
    var nomExt = "";
    for (var i = 0; i < detail.length; i++) {
        if (idcarte == detail[i].idcarte) {
            nomExt = detail[i].NomExtension;
            return nomExt;
        }
    }
    return false;
}

function afficher_Img_Ext(idcarte, detail) {
    var srcImage = "";
    for (var i = 0; i < detail.length; i++) {
        if (idcarte == detail[i].idcarte) {
            srcImage = detail[i].ImgExtension;
            return srcImage;
        }
    }
    return false;
}

function tabExt(valeur, detail) {
    document.getElementById('carmdl').src = detail[valeur].ImgCarte;
}

function recupRachat(idcarte) {
    var directory = 'http://www.counterspell.fr/app_json_cartes/idcarte_to_details/' + idcarte;
    var element_idJson = 'storJson';
    submitForm(element_idJson, directory, 'innerHTML');
    var rachat = document.getElementById(element_idJson).innerHTML;
    var rachatP = JSON.parse(rachat);
    return rachatP;
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

function selectDrap(valeur, idcarte) {
    console.log("selectDrap");
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

function prixRachat(idcarte) {
    var detail = recupRachat(idcarte);
    var tabdrap = [];
    tabdrap = index_string_lang(detail, position_dans_le_tableau(idcarte, detail));

    // var extension = document.getElementById("slider-1").value;
    var etat = document.getElementById("slider-2").value;
    var langue = document.getElementById("slider-3").value;
    var langue2 = tabdrap[langue - 1];

    var foil = document.getElementById("slider-4").value;
    var qte = document.getElementById("slider-5").value;
    // alert(etat);
    // var prixRachat = $('#storJson').load('https://www.counterspell.fr/affiche_prix_simple/' + idcarte + '/' + foil + '/' + etat + '/' + langue + '/echange/72000/rien');//remplacer rien par la boutique préférée 
    // var prixRachatP = parseInt(prixRachat);
    var directory = 'http://www.counterspell.fr/affiche_prix_simple/' + idcarte + '/' + foil + '/' + etat + '/' + langue2 + '/echange/72000/rien';
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

//Fonction d'ajout au panier
//*******************************************************************************************************//
function modif_panier(idcarte, etat, idlang, qte, foil, prix, villeBout, alteree, tampon, datee, dedicace, idelement) {
    var uniqueID = Cookies.get('UniqueID');
    var villeBout = villeBout || '';
    var idcarte = idcarte || '';
    var etat = etat || '';
    var idlang = idlang || '';
    var qte = qte || '';
    var prix = prix || '';
    var alteree = alteree || 0;
    var tampon = tampon || 0;
    var datee = datee || 0;
    var dedicace = dedicace || 0;
    if (alteree != 0) {
        alteree = 1;
    }
    if (dedicace != 0) {
        dedicace = 1;
    }
    if (tampon != 0) {
        tampon = 1;
    }
    if (datee != 0) {
        datee = 1;
    }
    // recupPanier(uniqueID);
    // ('https://www.counterspell.fr/ajout_panier/' + idcarte + '/' + etat + '/' + idlang + '/' + qte + '/' + foil + '/' + prix + '/' + villeBout + '/' + alteree + '/' + tampon + '/' + datee + '/' + dedicace + '/' + uniqueID);
    $('#' + idelement).load('http://www.counterspell.fr/ajout_panier/' + idcarte + '/' + etat + '/' + idlang + '/' + qte + '/' + foil + '/' + prix + '/' + villeBout + '/' + alteree + '/' + tampon + '/' + datee + '/' + dedicace + '/' + uniqueID);
    // return uniqueID;
}

//Fonction de récupération du panier
//*******************************************************************************************************//
function recupPanier() {

    var uniqueID = Cookies.get('UniqueID');
    var contenu = "<div id='divpanier'>";
    var contenu_reprise = "";
    var element_idJson = 'storJson';
    directory = 'http://www.counterspell.fr/app_user/voirpanier/' + uniqueID;
    // alert(directory);
    submitForm(element_idJson, directory, 'innerHTML');
    // alert(document.getElementById(element_idJson).innerHTML);
    var recup = document.getElementById(element_idJson).innerHTML;
    
    var panier = JSON.parse(recup);
    total = 0;
    idboutiquecheck = 0;
    var compteur = 0;
    for (var i = 0; i < panier.length; i++) {
        // alert(GetNomBoutique(panier[i].Boutiques_idBoutiques));
        // var idcarte = panier[i].Carte_idCarte;
        var nomBoutique = panier[i].NomBoutique;
        var nomCarte = panier[i].NomCarte;
        if (idboutiquecheck == 0 || idboutiquecheck != panier[i].Boutiques_idBoutiques) {
            var compteur = 0;
            contenu += "</div></td></tr ></table ></a > ";
            contenu += "<ul id='ulll' data-role='listview' class= 'ui-listview ui-listview-inset ui-corner-all ui-shadow' data-inset='true' data-divider-theme='a'><li class='ui-li-divider ui-bar-a ui-first-child' data-role='list-divider'>" + nomBoutique + "</li></ul>";
        }
        idboutiquecheck = panier[i].Boutiques_idBoutiques;
        var foil = panier[i].Foil;
        style = "";
        if (foil == 1) {
            style = "style='background-image : url(\"media/surfoil.png\");' ";
        }

        // if (compteur == 0 || idcarteavant == panier[i].Carte_idCarte) {
        //     if (compteur != 0) {
        contenu += "</div></td></tr></table></a>";
        // }
        // contenu += "<table><tr><td><img class='imgpan' src =" + panier[i].Img_Carte + "></td><td id='tdli'><li class='ui-btn ui-btn-icon-right ui-icon-carat-r lictn'><div class='licarte flex-container'>" + nomCarte + "</div></li>";
        // }
        // contenu += "<li id='refreshli " + i + "' class='ui-btn ui-btn-icon-right ui-icon-carat-r lictn'><a href='#'><div class='flex-containerpan lideplus' " + style + "><img src='media/" + afficherDrap(panier[i].Langages_idLangages) + ".png' height=15>&nbsp;&nbsp;<img id='suppr' src='media/bin.png' onclick='supprLigne(" + panier[i].idPanier_en_cours + ");'>";
        var qtepanier = panier[i].Quantite;
        var qtemax = panier[i].QteEnStock;

        if (qtepanier <= 0) {
            contenu_reprise += "<table><tr><td><img class='imgpan' src =" + panier[i].Img_Carte + "></td><td id='tdli'><li class='ui-btn ui-btn-icon-right ui-icon-carat-r lictn'><div class='licarte flex-container'>" + nomCarte + "</div></li>";
            contenu_reprise += "<li id='refreshli " + i + "' class='ui-btn ui-btn-icon-right ui-icon-carat-r lictn'><a href='#'><div class='flex-containerpan lideplus' " + style + "><img src='media/" + afficherDrap(panier[i].Langages_idLangages) + ".png' height=15>&nbsp;&nbsp;<img id='suppr' src='media/bin.png' onclick='supprLigne(" + panier[i].idPanier_en_cours + ");'>";
            contenu_reprise += "<SELECT class='selectopt2' id='selectopt_" + i + "' name='quantite' onchange='getval(this," + panier[i].idPanier_en_cours + ");refreshli(" + i + ");'>";
            for (var x = 1; x <= 8; x++) {
                if (qtepanier == (x * (-1))) {
                    contenu_reprise += "<OPTION value='" + (x * (-1)) + "' selected>" + x + "</OPTION>";
                } else {
                    contenu_reprise += "<OPTION value='" + (x * (-1)) + "'>" + x + "</OPTION>";
                }
            }
            contenu_reprise += "</SELECT>";
            contenu_reprise += GetEtat(panier[i].Etats_idEtats);
            contenu_reprise += "Pu : " + Number.parseFloat(panier[i].Prix_Unitaire).toFixed(2) + "€ | Total : " + Number.parseFloat(panier[i].Quantite * panier[i].Prix_Unitaire).toFixed(2) + "€</li>";
            contenu_reprise += "</div></td></tr></table></a>";
        } else {
            contenu += "<table><tr><td><img class='imgpan' src =" + panier[i].Img_Carte + "></td><td id='tdli'><li class='ui-btn ui-btn-icon-right ui-icon-carat-r lictn'><div class='licarte flex-container'>" + nomCarte + "</div></li>";
            // }
            contenu += "<li id='refreshli " + i + "' class='ui-btn ui-btn-icon-right ui-icon-carat-r lictn'><a href='#'><div class='flex-containerpan lideplus' " + style + "><img src='media/" + afficherDrap(panier[i].Langages_idLangages) + ".png' height=15>&nbsp;&nbsp;<img id='suppr' src='media/bin.png' onclick='supprLigne(" + panier[i].idPanier_en_cours + ");'>";
            contenu += "<SELECT class='selectopt2' id='selectopt_" + i + "' name='quantite' onchange='getval(this," + panier[i].idPanier_en_cours + ");refreshli(" + i + ");'>";
            for (var x = 1; x <= qtemax; x++) {
                if (qtepanier == x) {
                    contenu += "<OPTION value='" + x + "' selected>" + x + "</OPTION>";
                } else {
                    contenu += "<OPTION value='" + x + "'>" + x + "</OPTION>";
                }
            }
            contenu += "</SELECT>";
            contenu += GetEtat(panier[i].Etats_idEtats);
            contenu += "Pu : " + Number.parseFloat(panier[i].Prix_Unitaire).toFixed(2) + "€ | Total : " + Number.parseFloat(panier[i].Quantite * panier[i].Prix_Unitaire).toFixed(2) + "€</li>";
            contenu += "</div></td></tr></table></a>";
        }

        total += panier[i].Quantite * panier[i].Prix_Unitaire;


        var idcarteavant = panier[i].Carte_idCarte;
        compteur++;
        // alert(nomBoutique);
    }
    total = Number.parseFloat(total).toFixed(2);
    // alert(total);
    contenu += "<ul id='ulll' data-role='listview' class= 'ui-listview ui-listview-inset ui-corner-all ui-shadow' data-inset='true' data-divider-theme='a'><li class='ui-li-divider ui-bar-a ui-first-child' data-role='list-divider'>Carte(s) Reprise(s)   </li>" + contenu_reprise + "</ul>";
    contenu += "<ul id='ulll' data-role='listview' class= 'ui-listview ui-listview-inset ui-corner-all ui-shadow' data-inset='true' data-divider-theme='a'><li class='ui-li-divider ui-bar-a ui-first-child' data-role='list-divider'>Total du panier : " + total + "€</li></ul>";
    contenu += "<li class='ui-btn ui-btn-icon-right ui-icon-carat-r lictn'><div class='licarte flex-container'>Numéro de commande : " + uniqueID + "</div></li></div>";
    document.getElementById('panier').innerHTML = contenu;

    return panier;
}

//Fonction d'affichage du panier
//*******************************************************************************************************//

// function affichagePanier(panier) {
//     alert(panier);
// }
function supprLigne(idLigne) {
    // alert(idLigne);
    if (confirm('Voulez vous vraiment supprimer cette carte')) {
        $('#supprhide').load('http://www.counterspell.fr/gestion_panier/enlever_panier_ligne/' + idLigne + '/niet');
        refresh();
    }
    // alert('https://www.counterspell.fr/gestion_panier/enlever_panier_ligne/' + idLigne + '/niet');
}
function getval(select, idLigne) {
    var newqte = select.value;
    // alert('https://www.counterspell.fr/chgqtepanier/' + newqte + '/' + idLigne + '/niet');
    $('#supprhide').load('http://www.counterspell.fr/chgqtepanier/' + newqte + '/' + idLigne + '/niet');
    // alert(select.value);

}
function refresh() {
    $.get(recupPanier(), function (data) {
        $("#slidenavperson").html(data);
    });
}

function refreshli(cpt) {
    // alert(cpt);
    $.get(recupPanier(), function (data) {
        $("#refreshli" + cpt).html(data);
    });
}
function refreshmodal(valeur, idcarte) {
    var detail = recupRachat(idcarte);
    alert(detail[valeur.value].idcarte);
    afficherAchat(detail[valeur.value].idcarte);
}
function load2() {
    $("img.lazyload").lazyload();
}

function remonter() {
    document.getElementById('slider').scrollTop = 0;
}

function ecranSlider() {
    var hauteur = window.innerHeight;
    document.getElementById('slider').style.maxHeight = (0.8 * hauteur);
}

function chgmodemarchand() {
    if (marchand == "achat") {
        marchand = "vente";
    }
    else {
        marchand = "achat";
    }
}