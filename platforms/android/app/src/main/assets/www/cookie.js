function getCookie() {
    var jour = 31;
    // alert(jour);
    if ($.cookie("uniqueID") == null && $.cookie("uniqueID") == undefined) {
        var directory = 'https://www.counterspell.fr/app_user/createuniqueid';
        var element_idCook = 'storCook';
        submitForm(element_idCook, directory, 'innerHTML');
        var recupCook = document.getElementById(element_idCook).innerHTML;
        $.cookie("uniqueID", recupCook, { expires: jour });
        // alert("Nop");
    } else {
        // $.cookie("uniqueID")
        // alert("C'est bon");
        $.cookie("uniqueID", $.cookie("uniqueID"), { expires: jour });
        // alert($.cookie("uniqueID"));
    }
}