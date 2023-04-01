const convertButton1 = document.querySelector('[convert-1]')
const convertButton2 = document.querySelector('[convert-2]')
convertButton1.onclick = ()    => { convert1(); }
convertButton2.onclick = ()    => { alert ("Converting BCD to Decimal"); }

// this function is called when the convertButton1 is clicked and it increments the input take from the html element
// with input id dec and increments it by 1 and then displays the result in the html output element with id 'y'
function convert1() {
    const x = document.getElementById("dec").value;

    let packed = "";
    let unpacked = "";

    for (let i = 0; i < x.length; i++) {
        const digit = parseInt(x[i]);

        for (let j = 0; j < 8; j++) {
            const bitValue = (digit >> (7 - j)) & 1;
            unpacked += bitValue.toString();
        }
    }

    for (let i = 0; i < x.length; i++) {
        const digit = parseInt(x[i]);

        for (let j = 0; j < 4; j++) {
            const bitValue = (digit >> (3 - j)) & 1;
            packed += bitValue.toString();
        }
    }

    const holder = packed.split("");
    let densely_packed = new Array(10);
    densely_packed[5] = holder[7];

    //000
    if (holder[0] == '0' && holder[4] == '0' && holder[8] == '0') {
        for (let i = 0; i < 3; i++){
            densely_packed[i] = holder[i + 1];
        }

        for (let i = 3; i < 4; i++){
            densely_packed[i] = holder[i + 2];
        }

        densely_packed[6] = '0';

        for (let i = 7; i < 10; i++){
            densely_packed[i] = holder[i + 2];
        }
    }

    //001
    else if (holder[0] == '0' && holder[4] == '0' && holder[8] == '1') {
        for (let i = 0; i < 3; i++){
            densely_packed[i] = holder[i + 1];
        }

        for (let i = 3; i < 5; i++){
            densely_packed[i] = holder[i + 2];
        }

        densely_packed[6] = '1';
        densely_packed[7] = '0';
        densely_packed[8] = '0';
        densely_packed[9] = holder[11];
    }

    //010
    else if (holder[0] == '0' && holder[4] == '1' && holder[8] == '0') {
        for (let i = 0; i < 3; i++){
            densely_packed[i] = holder[i + 1];
        }
        densely_packed[3] = holder[9];
        densely_packed[4] = holder[10];
        densely_packed[6] = '1';
        densely_packed[7] = '0';
        densely_packed[8] = '1';
        densely_packed[9] = holder[11];
    }

    //011
    //100
    //101
    //110
    //111
    
    let dpacked = densely_packed.join("");

    document.getElementById("output1").innerHTML = 
    " Unpacked BCD: " + unpacked + "<br>" 
    + "Packed BCD: " + packed + "<br>"
    + " Densely-packed BCD: " + dpacked + "<br>" ;
}


