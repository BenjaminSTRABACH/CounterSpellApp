//Passer le tableau des extensions dans lesquelles la carte est disponible
//Générer les data en fonction du tableau
function initPickerExten(detail) {

    //Initialisation des données
    var data = [];
    var img = [];

    //Récupération de chaque nom d'extension de la carte
     detail.forEach(item => {
         data.push(item.NomExtension);
         img.push(item.ImgExtension.replace(/['"]+/g, ''));
     });
     //Initialisation de l'extension et de l'image au choix par défaut
     chgImg(0, img);
     setExten(0, detail);

    //Création du picker
    mobileSelectExten = new MobileSelect({
        trigger: '#extenPicker',
        title: 'Extension',
        wheels: [{data}],
        ensureBtnText: "Confirmer",
        cancelBtnText: "Annuler",
        maskopacity: 0.0,
        titleBgColor: "#ffffff",
        titleColor: "#000000",
        callback:function(){ 
            //Récupération données (getIndexArr/getCurValue)
            setExten(this.getIndexArr(), detail);
            chgImg(this.getIndexArr(), img);
            resetPickerLang();
        }
    });
}

function chgImg(index, img){
    //On change l'image en fonction de l'extension cliquée
    document.getElementById("imgext").src = img[index];
}


function initPickerEtat() {
    //Initialisation des données
    var data = ['Mint','Near-mint','Excellent','Fine','Played','Poor'];
    
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
            setEtat(this.getCurValue());
        }
    });
}

//Passer le tableau des langues dans lesquelles la carte est disponible
//Générer les data en fonction du tableau
function initPickerLang() {
    //Initialisation des données
    langBin = exten.LangPossible;
    console.log("langBin " + langBin);

    var data = ['...','...','...'];
    var langTab = ["Français", "Anglais", "Allemand", "Espagnol", "Italien", "Coréen", "Russe", "Japonais", "Chinois simplifié", "Chinois traditionnel"];
    data = langTab;
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
        }
    });
}

function initPickerQuant() {
    //Initialisation des données
    var data = ['1','2','3','4','5','6','7','8'];

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
            setQuant(this.getIndexArr())
        }
    });
}

function resetPickerLang(){
    var parent = document.getElementById('langPicker');
    mobileSelect = parent.children[0];
    parent.removeChild(mobileSelect);
    initPickerLang();

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

    console.log("RESET");
}

//SETTER

function setExten(index, detail) {
    exten = detail[index];
    console.log(exten);
}

function setEtat(value) {
    etat = value[0];
    console.log(etat);
}

function setLang(index) {

}

function setQuant(index) {
    quant = index[0] + 1;
    console.log(quant);
}