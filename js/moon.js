var type365 = "moon"; 
var website365 = "http://www.calendario-365.es";
var isIE8 = window.XDomainRequest ? true : false;
var invocation = createCrossDomainRequest();

if (window['type365'] == "moon") {
    var url = window['website365']+'/js/365.php?page=moon';
    getData();
}

function createCrossDomainRequest(url, handler) {
    var request;
    if (isIE8) {
        request = new window.XDomainRequest();
    }else {
        request = new XMLHttpRequest();
    }

    return request;
}

function getData() {
    if (invocation) {
        if(isIE8) {
            invocation.onload = outputResult;
            invocation.open("GET", url, true);
            invocation.send();
        } else {
            invocation.open('GET', url, true);
            invocation.onreadystatechange = handler;
            invocation.send();
        }
    } else {
        var text = "No Invocation TookPlace At All";
        var textNode = document.createTextNode(text);
        var textDiv = document.getElementById("calendar-365-content");
        textDiv.appendChild(textNode);
    }
}

function handler(evtXHR) {
    if (invocation.readyState == 4) {
        if (invocation.status == 200) {
            outputResult();
        } else {
            alert("Invocation Errors Occured");
        }
    }
}

function outputResult() {
    var response = invocation.responseText;
    var textDiv = document.getElementById("calendar-365-content");

    if ((document.getElementById("w1").href.indexOf("-365") > -1) && (document.getElementById("w2").href.indexOf("-365") > -1)) {
        textDiv.innerHTML += response;
    } else {
        textDiv.innerHTML += "Data not loaded...<br />Bottom entries to <a href='"+window['website365']+"'>"+window['website365']+"</a> removed. Please put them back...";
    }
}