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
            console.log(this.getIndexArr());   
            console.log(this.getCurValue());
            chgImg(this.getIndexArr(), img);
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
            console.log(this.getIndexArr());   
            console.log(this.getCurValue());
        }
    });
}

//Passer le tableau des langues dans lesquelles la carte est disponible
//Générer les data en fonction du tableau
function initPickerLang() {
    //Initialisation des données
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
            console.log(this.getIndexArr());
            console.log(this.getCurValue());
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
            console.log(this.getIndexArr());
            console.log(this.getCurValue());
        }
    });
}

function resetPickers() {
    //On supprime l'interface des pickers en html
    var mobileSelect = document.getElementsByClassName('mobileSelect mobileSelect-show');
    for(var i = mobileSelect.length - 1; i >= 0 ; i--){
        var parent = mobileSelect[i].parentNode;
        parent.removeChild(mobileSelect[i]);
    }

    //On remets les valeurs de base dans les div
    // var html = document.getElementById('extenPicker');
    // html.innerHTML = "..."
    // var html = document.getElementById('etatPicker');
    // html.innerHTML = "..."
    // var html = document.getElementById('langPicker');
    // html.innerHTML = "..."
    // var html = document.getElementById('quantPicker');
    // html.innerHTML = "..."
    document.getElementById('imgext').src = "";

    console.log("RESET");
}