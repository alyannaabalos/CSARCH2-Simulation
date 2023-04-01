const convertButton1 = document.querySelector('[convert-1]')
const convertButton2 = document.querySelector('[convert-2]')
convertButton1.onclick = ()    => { convert1(); }
convertButton2.onclick = ()    => { alert ("Converting BCD to Decimal"); }

// this function is called when the convertButton1 is clicked and it increments the input take from the html element
// with input id dec and increments it by 1 and then displays the result in the html output element with id 'y'
function convert1() {
    var x = document.getElementById("dpacked").value;
    var y = parseInt(x) + 1;
    document.getElementById("y").innerHTML = y;
}