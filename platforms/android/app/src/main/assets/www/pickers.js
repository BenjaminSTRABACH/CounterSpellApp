//Passer le tableau des extensions dans lesquelles la carte est disponible
//Générer les data en fonction du tableau
function initPickerExten() {
    mobileSelectExten = new MobileSelect({
        trigger: '#extenPicker',
        title: 'Extension',
        wheels: [
            {data:['...','...','...']}
        ],
        ensureBtnText: "Confirmer",
        cancelBtnText: "Annuler",
        maskopacity: 0.0,
        titleBgColor: "#ffffff",
        titleColor: "#000000",
    });
}

function initPickerEtat() {
    mobileSelectEtat = new MobileSelect({
        trigger: '#etatPicker',
        title: 'Etat',
        wheels: [
                    {data:['Mint','Near-mint','Excellent','Fine','Played','Poor']}
                ],
        ensureBtnText: "Confirmer",
        cancelBtnText: "Annuler",
        maskopacity: 0.0,
        titleBgColor: "#ffffff",
        titleColor: "#000000",
    });
}

//Passer le tableau des langues dans lesquelles la carte est disponible
//Générer les data en fonction du tableau
function initPickerDrap(tabdrap) {
    mobileSelectDrap = new MobileSelect({
        trigger: '#drapPicker',
        title: 'Langue',
        wheels: [
            {data:['...','...','...']}
        ],
        ensureBtnText: "Confirmer",
        cancelBtnText: "Annuler",
        maskopacity: 0.0,
        titleBgColor: "#ffffff",
        titleColor: "#000000",
    });
}

function initPickerQuant() {
    mobileSelectQuant = new MobileSelect({
        trigger: '#quantPicker',
        title: 'Quantité',
        wheels: [
                    {data:['1','2','3','4','5','6','7','8']}
                ],
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
    console.log(mobileSelect.length);
    for(var i = mobileSelect.length - 1; i >= 0 ; i--){
        parent.removeChild(mobileSelect[i]);
        console.log(i);
    }

    //On remets les valeurs de base dans les div
    var html = document.getElementById('extenPicker');
    html.innerHTML = "..."
    var html = document.getElementById('etatPicker');
    html.innerHTML = "..."
    var html = document.getElementById('drapPicker');
    html.innerHTML = "..."
    var html = document.getElementById('quantPicker');
    html.innerHTML = "..."

    console.log("RESET");
}