//Passer le tableau des extensions dans lesquelles la carte est disponible
//Générer les data en fonction du tableau
function initPickerExten(detail) {
    //Initialisation des données
    var data = [];
    detail.forEach(item => {
        data.push(item.NomExtension);
    });
    
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
    });
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
    });
}

//Passer le tableau des langues dans lesquelles la carte est disponible
//Générer les data en fonction du tableau
function initPickerLang() {
    //Initialisation des données
    var data = ['...','...','...'];
    var langTab = ["Français", "Anglais", "Allemand", "Espagnol", "Italien", "Corée", "Russe", "Japonais", "Chinois simplifié", "Chinois traditionnel"];
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
    });
}

function resetPickers() {
    //On supprime l'interface des pickers en html
    var mobileSelect = document.getElementsByClassName('mobileSelect');
    var parent = document.body;
    for(var i = mobileSelect.length - 1; i >= 0 ; i--){
        parent.removeChild(mobileSelect[i]);
    }

    //On remets les valeurs de base dans les div
    var html = document.getElementById('extenPicker');
    html.innerHTML = "..."
    var html = document.getElementById('etatPicker');
    html.innerHTML = "..."
    var html = document.getElementById('langPicker');
    html.innerHTML = "..."
    var html = document.getElementById('quantPicker');
    html.innerHTML = "..."
}