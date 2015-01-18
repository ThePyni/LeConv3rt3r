function processInputs() {

    var dec;
    var bin;
    var hex;
    var oct;

	var convertBase = function (num) {
        this.from = function (baseFrom) {
            this.to = function (baseTo) {
                return parseInt(num, baseFrom).toString(baseTo);
            };
            return this;
        };
        return this;
    };
    
    if (document.getElementById("decimal").value){

        if (isInteger(document.getElementById("decimal").value)) {
            dec = parseInt(document.getElementById("decimal").value);
    
            bin = convertBase(dec).from(10).to(2);
            hex = convertBase(dec).from(10).to(16).toUpperCase();
            oct = convertBase(dec).from(10).to(8);
    
            data = 'dec=' + dec + '&bin=' + bin + '&hex=' + hex + '&oct=' + oct;
    
            //$.post('/?ts=' + new Date().getTime(), data);
    
            document.getElementById("conversionresult").innerHTML="The conversion is: Decimal " + dec + " Binary: " + bin + " Hexadecimal: " + hex + " Octal: " + oct;

            //return data;

        } else {
            document.getElementById("conversionresult").innerHTML="Enter a valid decimal number";
            //return null;
        }

    } else if (document.getElementById("hexadecimal").value){

        if (isHexadecimal(document.getElementById("hexadecimal").value.toUpperCase())) {
            hex = (document.getElementById("hexadecimal").value).toUpperCase();
    
            bin = convertBase(hex).from(16).to(2);
            dec = convertBase(hex).from(16).to(10).toUpperCase();
            oct = convertBase(hex).from(16).to(8);

            document.getElementById("conversionresult").innerHTML="The conversion is: Decimal " + dec + " Binary: " + bin + " Hexadecimal: " + hex + " Octal: " + oct;
        } else {
            document.getElementById("conversionresult").innerHTML="Enter a valid hexadecimal number";
        }

    } else if (document.getElementById("binary").value){

        if (isBinary(document.getElementById("binary").value)) {
            bin = parseInt(document.getElementById("binary").value);

            dec = convertBase(bin).from(2).to(10);
            hex = convertBase(bin).from(2).to(16).toUpperCase();
            oct = convertBase(bin).from(2).to(8);

            document.getElementById("conversionresult").innerHTML="The conversion is: Decimal " + dec + " Binary: " + bin + " Hexadecimal: " + hex + " Octal: " + oct;
        } else {
            document.getElementById("conversionresult").innerHTML="Enter a valid binary number";
        }

    } else if (document.getElementById("octal").value){

        if (isOctal(document.getElementById("octal").value)) {
            oct = parseInt(document.getElementById("octal").value);

            bin = convertBase(oct).from(8).to(2);
            hex = convertBase(oct).from(8).to(16).toUpperCase();
            dec = convertBase(oct).from(8).to(10);

            document.getElementById("conversionresult").innerHTML="The conversion is: Decimal " + dec + " Binary: " + bin + " Hexadecimal: " + hex + " Octal: " + oct;
        } else {
            document.getElementById("conversionresult").innerHTML="Enter a valid octal number";
        }

    }
};

function isInteger(str) {
    var pattern = "0123456789";
    var i = 0;
    do {
        var pos = 0;
        for (var j=0; j<pattern.length; j++)
            if (str.charAt(i)==pattern.charAt(j)) {
                pos = 1;
                break;
            }
        i++
    } while (pos==1 && i<str.length);
    if (pos==0)
        return false;
    return true;
};

function isBinary(str) {
    var pattern = "01";
    var i = 0;
    do {
        var pos = 0;
        for (var j=0; j<pattern.length; j++)
            if (str.charAt(i)==pattern.charAt(j)) {
                pos = 1;
                break;
            }
        i++
    } while (pos==1 && i<str.length);
    if (pos==0)
        return false;
    return true;
};

function isHexadecimal(str) {
    var pattern = "0123456789ABCDEF";
    var i = 0;
    do {
        var pos = 0;
        for (var j=0; j<pattern.length; j++)
            if (str.charAt(i)==pattern.charAt(j)) {
                pos = 1;
                break;
            }
        i++
    } while (pos==1 && i<str.length);
    if (pos==0)
        return false;
    return true;
};

function isOctal(str) {
    var pattern = "01234567";
    var i = 0;
    do {
        var pos = 0;
        for (var j=0; j<pattern.length; j++)
            if (str.charAt(i)==pattern.charAt(j)) {
                pos = 1;
                break;
            }
        i++
    } while (pos==1 && i<str.length);
    if (pos==0)
        return false;
    return true;
};

$(document).ready(processInputs);
