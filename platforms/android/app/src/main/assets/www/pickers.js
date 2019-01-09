function initPickerEtat() {
    var mobileSelect1 = new MobileSelect({
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