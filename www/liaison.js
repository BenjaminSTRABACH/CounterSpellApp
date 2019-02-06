function createInstance() {
    var req = null;
    if (window.XMLHttpRequest) {
        req = new XMLHttpRequest();
    }
    else if (window.ActiveXObject) {
        try {
            req = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
            try {
                req = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (e) {
                alert("XHR not created");
            }
        }
    }
    return req;
};

function storing(data, element, type) {
    // if (type == "innerHTML") {
    //     element.innerHTML = data;
    // }
    // if (type == "src") {
    //     element.src = data;
    // }
    element[type] = data;
}

function submitFormAsync(id, directory, type, callback, time) {

    var id = id;
    var type = type || 'innerHTML';
    var htmlobj = document.getElementById(id);
    // document.getElementById(id).innerHTML = directory + " dans le div " + id;

    setTimeout(function setTimeoutCB(){
        var req = createInstance();
        req.onreadystatechange = function () {
        if (req.readyState == 4) {
            if (req.status == 200) {
                storing(req.responseText, htmlobj, type);
            }
            else {
                // alert("Error: returned status code " + req.status + " " + req.statusText);
            }

        }
    }

    req.open("GET", directory, false, 'ltdj', 'magasin2');

    req.send(null);

    callback(id);

    }, time);
}

function submitForm(id, directory, type) {
    var id = id;
    var type = type || 'innerHTML';
    var htmlobj = document.getElementById(id);
    // document.getElementById(id).innerHTML = directory + " dans le div " + id;

    var req = createInstance();
    req.onreadystatechange = function () {
        if (req.readyState == 4) {
            if (req.status == 200) {
                storing(req.responseText, htmlobj, type);
            }
            else {
                // alert("Error: returned status code " + req.status + " " + req.statusText);
            }
        }
    }
    req.open("GET", directory, false, 'ltdj', 'magasin2');

    req.send(null);
}