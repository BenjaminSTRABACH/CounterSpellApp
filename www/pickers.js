//Passer le tableau des extensions dans lesquelles la carte est disponible
//Générer les data en fonction du tableau
function initPickerExten(detail, idcarte) {
    //Initialisation des données
    var data = [];
    var img = [];
    var ext;
    for(var i = 0; i < detail.length; i++){
        if(detail[i].idcarte == idcarte){
            ext = i;
        }
    }

    //Récupération de chaque nom d'extension de la carte
    detail.forEach(item => {
        data.push(item.NomExtension);
        img.push(item.ImgExtension.replace(/['"]+/g, ''));
    });
    //Initialisation de l'extension et de l'image au choix par défaut
    chgImg(ext, img);
    setExten(ext, detail);


    //Création du picker
    mobileSelectExten = new MobileSelect({
        trigger: '#extenPicker',
        title: 'Extension',
        position: [ext],
        wheels: [{data}],
        ensureBtnText: "Confirmer",
        cancelBtnText: "Annuler",
        maskopacity: 0.0,
        titleBgColor: "#ffffff",
        titleColor: "#000000",
        callback:function(){ 
            //Récupération données (getIndexArr/getCurValue)
            idcarte = detail[this.getIndexArr()].idcarte;
            setExten(this.getIndexArr(), detail);
            chgImg(this.getIndexArr(), img);
            chgCardImg(this.getIndexArr(), detail);
            resetPickerFoil(idcarte, detail);
            resetPickerLang(idcarte, detail);
            updatePrixRachat(idcarte,detail);
            updateAddPanier(idcarte);
        }
    });
}

function chgCardImg(index, detail){
    var carte = document.getElementById('cartemdl');
    var source = detail[index].ImgCarte.replace(/['"]+/g, '')
    carte.src = source;
}

function chgImg(index, img){
    //On change l'image en fonction de l'extension cliquée
    document.getElementById("imgext").src = img[index];
}


function initPickerEtat(idcarte, detail) {
    //Initialisation des données
    var data = ['Near-mint','Excellent','Fine','Played','Poor'];

    //Initialisation de l'état au choix par défaut
    setEtat([0]);

    //Création du picker
    mobileSelectEtat = new MobileSelect({
        trigger: '#etatPicker',
        title: 'Etat',
        wheels: [{data}],
        ensureBtnText: "Confirmer",
        cancelBtnText: "Annuler",
        maskopacity: 0.0,
        titleBgColor: "#ffffff",
        titleColor: "#000000",
        callback:function(){ 
            //Récupération données (getIndexArr/getCurValue)
            setEtat(this.getIndexArr());
            idcarte = exten.idcarte;
            updatePrixRachat(idcarte, detail);
            updateAddPanier(idcarte)
        }
    });
}

//Passer le tableau des langues dans lesquelles la carte est disponible
//Générer les data en fonction du tableau
function initPickerLang(idcarte, detail) {

    //Initialisation des données
    langBin = exten.LangPossible;
    langBin = "" + langBin;
    var array = Array.from(langBin);
    
    var langTab = ["Français", "Anglais", "Allemand", "Espagnol", "Italien", "Coréen", "Russe", "Japonais", "Chinois simplifié", "Chinois traditionnel"];
    var listDrap = ["drapFra", "drapAng", "drapAll", "drapEsp", "drapIta", "drapCor", "drapRus", "drapJap", "drapChi", "drapChi"];

    var imgDrap = [];
    var data = [];
    for(i = 0; i < array.length -1; i++){
        if(array[i] == 1){
            data.push(langTab[i]);
            imgDrap.push(listDrap[i]);
        }
    }

    //Initialisation de la langue et de l'image au choix par défaut
    setLang([0]);
    chgDrap(0, imgDrap);

    //Création du picker
    mobileSelectLang = new MobileSelect({
        trigger: '#langPicker',
        title: 'Langue',
        wheels: [{data}],
        ensureBtnText: "Confirmer",
        cancelBtnText: "Annuler",
        maskopacity: 0.0,
        titleBgColor: "#ffffff",
        titleColor: "#000000",
        callback:function(){    
            //Récupération données (getIndexArr/getCurValue)
            chgDrap(this.getIndexArr(), imgDrap);
            setLang(this.getIndexArr());
            updatePrixRachat(idcarte, detail);
            updateAddPanier(idcarte)
        }
    });
}

function chgDrap(index, imgDrap){
    document.getElementById("imgdrap").src = "media/" + imgDrap[index] + ".png";
    document.getElementById("imgdrap").style["height"] = 15;
}

function initPickerQuant(idcarte, detail) {

    //Initialisation des données
    var data = ['1','2','3','4','5','6','7','8'];

    //Initialisation de la quantitéau choix par défaut
    setQuant([0]);

    //Création du picker
    mobileSelectQuant = new MobileSelect({
        trigger: '#quantPicker',
        title: 'Quantité',
        wheels: [{data}],
        ensureBtnText: "Confirmer",
        cancelBtnText: "Annuler",
        maskopacity: 0.0,
        titleBgColor: "#ffffff",
        titleColor: "#000000",
        callback:function(){    
            //Récupération données (getIndexArr/getCurValue)
            setQuant(this.getIndexArr());
            idcarte = exten.idcarte;
            updatePrixRachat(idcarte, detail);
            updateAddPanier(idcarte)
        }
    });
}

function initPickerFoil(idcarte, detail){
    var foilDef = exten.FoilPossible;

    if(foilDef == '0' || foilDef == '2'){
        setFoil('0', idcarte);
        document.getElementById('idfoil').checked = false;
    }
    else{
        setFoil('1', idcarte);
    }


    var pick = document.getElementById('idfoil');
    var title = document.getElementById('foilTitle');
    // title.style.display = 'block';

    //0 LES DEUX
    //1 FORCEMENT FOIL
    //2 FORCEMENT PAS FOIL

    if(foilDef == '2'){
        pick.style.display = 'none';
        title.innerHTML = "Foil indisponible";
        setFoil('0', idcarte);
    }
    else if(foilDef == '1'){
        pick.style.display = 'none';
        title.innerHTML = 'Foil uniquement';
        setFoil('1', idcarte);
    }
    else{
        title.innerHTML = 'Foil : ';
        pick.style.display = 'block';
        pick.onclick = function(){
            if(foil == '1'){
                setFoil('0', idcarte);
            }
            else if(foil == '0'){
                setFoil('1',idcarte);
            }
            updatePrixRachat(idcarte, detail);
        }
    }
}

function resetPickerFoil(idcarte, detail){
    // var title = document.getElementById('foilTitle');
    // title.style.display = 'none';
     initPickerFoil(idcarte, detail);
}

function resetPickerLang(idcarte, detail){
    var parent = document.getElementById('langPicker');
    mobileSelect = parent.children[0];
    parent.removeChild(mobileSelect);
    initPickerLang(idcarte, detail);
}

function resetPickers() {
    //On supprime l'interface des pickers en html
    var mobileSelect = document.getElementsByClassName('mobileSelect mobileSelect-show');
    for(var i = mobileSelect.length - 1; i >= 0 ; i--){
        var parent = mobileSelect[i].parentNode;
        parent.removeChild(mobileSelect[i]);
    }

    //On remet l'image à la valeur par défaut
    document.getElementById('imgext').src = "";

    mobileSelectExten = null;
    mobileSelectLang = null;
    mobileSelectEtat = null;
    mobileSelectQuant = null;
}

//SETTER

function setExten(index, detail) {
    exten = detail[index];
}

function setFoil(choice, idcarte){
    foil = choice;
}

function setEtat(index) {
    etat = index[0] + 2;
}

function setLang(index) {
    lang = index[0] + 1;
}

function setQuant(index) {
    quant = index[0] + 1;
}