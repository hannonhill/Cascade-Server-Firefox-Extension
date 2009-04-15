/*****************
invert bulk change checkboxes
******************/
function bulkChangeInvertSelect() {
    var inputs = window._content.document.getElementsByTagName("input");

    for (var j = 0; j < inputs.length; j++) {
        var input = inputs[j];

        if (input.getAttribute("type") == "checkbox") {
            input.checked = !input.checked;
        }
    }
}

/*****************
select all or deselect all
******************/
function bulkChangeSelect(value) {
    var inputs = window._content.document.getElementsByTagName("input");

    for (var j = 0; j < inputs.length; j++) {
        var input = inputs[j];

        if (input.getAttribute("type") == "checkbox") {
            input.checked = value;
        }
    }
}

/*****************
select only assets of type: type
******************/
function bulkChangeByType(type) {
    var inputs = window._content.document.getElementsByTagName("input");
    var checkit = false;

    for (var j = 0; j < inputs.length; j++) {
        var input = inputs[j];

        if (input.getAttribute("name").indexOf("type") != -1) {

            if (input.getAttribute("value") == type)
             checkit = true;
            else
             checkit = false;

         } else if (input.getAttribute("type") == "checkbox" && checkit) {
            input.checked = true;
         }
    }
}

/*****************
select only assets of type: type
******************/
function bulkChangeByRegex() {
    var inputs = window._content.document.getElementsByTagName("input");
    var regex = prompt("Select all assets which match regex:", "");
    var checkit = false;

    for (var j = 0; j < inputs.length; j++) {
        var input = inputs[j];

        if (input.getAttribute("name").indexOf("path") != -1) {

            if (input.getAttribute("value").search(regex) != -1)
             checkit = true;
            else
             checkit = false;

         } else if (input.getAttribute("type") == "checkbox" && checkit) {
            input.checked = true;
         }
    }
}
