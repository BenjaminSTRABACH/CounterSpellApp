function openNavG() {
    document.getElementById('nom').innerHTML = Cookies.get('Pseudo');
    document.getElementById('boutique_preferee').innerHTML = Cookies.get('Boutique_preferee');
    document.getElementById("infonav").style.width = "100%";
    $(".darkbox").css("display", "initial");
    $(".darkbox").height($(document).height());
}
function closeNavG() {
    document.getElementById("infonav").style.width = "0";
    $(".darkbox").css("display", "none");
}
function openNavD() {
    document.getElementById("infonavperson").style.width = "100%";
    $(".slidenavperson").height($(document).height());
    recupPanier();
}
function closeNavD() {
    document.getElementById("infonavperson").style.width = "0";
}
