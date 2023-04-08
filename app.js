const convertButton1 = document.querySelector('[convert-1]')
const convertButton2 = document.querySelector('[convert-2]')
const downloadBtn = document.getElementById("downloadBtn");
convertButton1.onclick = ()    => { decimalToBCD(); }
convertButton2.onclick = ()    => { bcdToDECIMAL(); }
downloadBtn.onClick = ()   => { download_file(); }
downloadBtn.onClick = ()   => { download_pressed(); }
downloadBtn.addEventListener("click", download_file);
downloadBtn.addEventListener("click", download_pressed);


//this function displays an alert when the download button is clicked
function download_pressed() {
    alert("Downloading Results...");
}

// this function is called when the convertButton1 is clicked and it converts the decimal number to BCD
function decimalToBCD() {
    const x = document.getElementById("dec").value;

    // unsigned
    if(x[0] != "+" && x[0] != "-"){
        let unpacked = dec_to_unpacked(x);
        let packed = dec_to_packed(x);
        let dpacked = dec_to_densely(x, packed);
        
        let spaced_unpacked = unpacked.split('').map((c, i) => (i % 4 === 0 && i !== 0) ? " " + c : c).join('');
        let spaced_packed = packed.split('').map((c, i) => (i % 4 === 0 && i !== 0) ? " " + c : c).join('');
        let spaced_densely = dpacked.split('').map((c, i) => (i % 10 === 0 && i !== 0) ? " " + c : c).join('');

        document.getElementById("output1").innerHTML = 
        " Unpacked BCD: " + spaced_unpacked + "<br>" 
        + "Packed BCD: " + spaced_packed + "<br>"
        + " Densely-packed BCD: " + spaced_densely + "<br>" ;

        const bcdResult = "Unpacked BCD:" + spaced_unpacked + "\n" + "Packed BCD:" + spaced_packed + "\n" + "Densely-packed BCD:" + spaced_densely;
        download_file(bcdResult);
    }
    //signed
    else{
        let packed = "";

        for (let i = 1; i < x.length; i++) {
            const digit = parseInt(x[i]);
            for (let j = 0; j < 4; j++) {
                const bitValue = (digit >> (3 - j)) & 1;
                packed += bitValue.toString();
            }
        }

        let spaced_packed = packed.split('').map((c, i) => (i % 4 === 0 && i !== 0) ? " " + c : c).join('');

        if(x[0] == "+"){
            spaced_packed = spaced_packed.concat(" 1100");
        }
        else{
            spaced_packed = spaced_packed.concat(" 1101");
        }
        const bcdResult = "BCD result for Packed BCD[Signed]:" + spaced_packed;
        download_file(bcdResult);
        document.getElementById("output1").innerHTML = 
        "Packed BCD [Signed]: " + spaced_packed + "<br>"
    }
}

function dec_to_unpacked(x){
    let unpacked = "";

    for (let i = 0; i < x.length; i++) {
        const digit = parseInt(x[i]);
        for (let j = 0; j < 8; j++) {
            const bitValue = (digit >> (7 - j)) & 1;
            unpacked += bitValue.toString();
            if(j%4 == 0 && j!= 0)
                unpacked.concat(unpacked, " ");
        }
    }
    
    return unpacked;
}

function dec_to_packed(x){
    let packed = "";

    for (let i = 0; i < x.length; i++) {
        const digit = parseInt(x[i]);

        for (let j = 0; j < 4; j++) {
            const bitValue = (digit >> (3 - j)) & 1;
            packed += bitValue.toString();
        }
    }

    return packed;
}

function dec_to_densely(x, packed){
    const holder = packed.split("");
    let densely_packed = new Array(10);
    let merge = new Array(10000);


    if (x.length % 3 != 0) {
        if (x.length % 3 == 1){
            for (let i = 0; i < 8; i++){
                holder.unshift(0);
            }
        }

        else {
            for (let i = 0; i < 4; i++){
                holder.unshift(0);
            }
        }
    }

    while (holder.length > 0) {
        densely_packed[5] = holder[7];
        densely_packed[9] = holder[11];
    
        //000
        if (holder[0] == '0' && holder[4] == '0' && holder[8] == '0') {
            for (let i = 0; i < 3; i++){
                densely_packed[i] = holder[i + 1];
            }
    
            for (let i = 3; i < 5; i++){
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
        }
    
        //011
        else if (holder[0] == '0' && holder[4] == '1' && holder[8] == '1') {
            for (let i = 0; i < 3; i++){
                densely_packed[i] = holder[i + 1];
            }
            densely_packed[3] = '1';
            densely_packed[4] = '0';
            densely_packed[6] = '1';
            densely_packed[7] = '1';
            densely_packed[8] = '1';
        }
    
        //100
        else if (holder[0] == '1' && holder[4] == '0' && holder[8] == '0') {
            densely_packed[0] = holder[9];
            densely_packed[1] = holder[10];
            densely_packed[2] = holder[3];
            densely_packed[3] = holder[5];
            densely_packed[4] = holder[6];
            densely_packed[6] = '1';
            densely_packed[7] = '1';
            densely_packed[8] = '0';
        }
    
        //101
        else if (holder[0] == '1' && holder[4] == '0' && holder[8] == '1') {
            densely_packed[0] = holder[5];
            densely_packed[1] = holder[6];
            densely_packed[2] = holder[3];
            densely_packed[3] = '0';
            densely_packed[4] = '1';
            densely_packed[6] = '1';
            densely_packed[7] = '1';
            densely_packed[8] = '1';
        }
    
        //110
        else if (holder[0] == '1' && holder[4] == '1' && holder[8] == '0') {
            densely_packed[0] = holder[9];
            densely_packed[1] = holder[10];
            densely_packed[2] = holder[3];
            densely_packed[3] = '0';
            densely_packed[4] = '0';
            densely_packed[6] = '1';
            densely_packed[7] = '1';
            densely_packed[8] = '1';
        }
        
        //111
        else if (holder[0] == '1' && holder[4] == '1' && holder[8] == '1') {
            densely_packed[0] = '0';
            densely_packed[1] = '0';
            densely_packed[2] = holder[3];
            densely_packed[3] = '1';
            densely_packed[4] = '1';
            densely_packed[6] = '1';
            densely_packed[7] = '1';
            densely_packed[8] = '1';
        }

        merge = merge.concat(densely_packed);
    
        for (let i = 0; i < 12; i++){
            holder.shift()
        }

    }

    let dpacked = merge.join("");
    return dpacked;
}
function download_file(bcdResult) {


  const filename = "result.txt";

  const element = document.createElement("a");
  element.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(bcdResult));
  element.setAttribute("download", filename);

  element.style.display = "none";
  document.body.appendChild(element);

  element.click();

  document.b
}

function bcdToDECIMAL() {
    //display string "convert"
    document.getElementById("output2").innerHTML = "CONVERTING TO DECIMAL..." + "<br>";
    //convert densely-packed BCD from input and output the decimal
    let x = document.getElementById("input2").value;
    let decimal = 0;
    let densely_packed = x.split("");
    let holder = new Array(12);

    if (x.length == 1){
        for (let i = 0; i < 8; i++){
            holder.unshift(0);
        }
    }

    else if (x.length == 2){
        for (let i = 0; i < 4; i++){
            holder.unshift(0);
        }
    }

    holder[0] = densely_packed[5];
    holder[4] = densely_packed[9];

    //000
    if (densely_packed[6] == '0') {
        for (let i = 1; i < 4; i++){
            holder[i] = densely_packed[i - 1];
        }

        for (let i = 5; i < 7; i++){
            holder[i] = densely_packed[i - 2];
        }

        for (let i = 7; i < 12; i++){
            holder[i] = densely_packed[i - 3];
        }
    }

    //001
    else if (densely_packed[6] == '1' && densely_packed[7] == '0' && densely_packed[8] == '0') {
        for (let i = 1; i < 4; i++){
            holder[i] = densely_packed[i - 1];
        }

        for (let i = 5; i < 7; i++){
            holder[i] = densely_packed[i - 2];
        }

        holder[7] = '0';
        holder[8] = '0';
        holder[9] = '1';
        holder[10] = densely_packed[0];
        holder[11] = densely_packed[1];
    }

    //010
    else if (densely_packed[6] == '1' && densely_packed[7] == '0' && densely_packed[8] == '1') {
        for (let i = 1; i < 4; i++){
            holder[i] = densely_packed[i - 1];
        }

        holder[5] = '0';
        holder[6] = '1';
        holder[7] = '0';
        holder[8] = '0';
        holder[9] = densely_packed[0];
        holder[10] = densely_packed[1];
        holder[11] = densely_packed[2];
    }

    //011
    else if (densely_packed[6] == '1' && densely_packed[7] == '1' && densely_packed[8] == '0') {
        for (let i = 1; i < 4; i++){
            holder[i] = densely_packed[i - 1];
        }

        holder[5] = '1';
        holder[6] = '0';
        holder[7] = '1';
        holder[8] = '0';
        holder[9] = densely_packed[0];
        holder[10] = densely_packed[1];
        holder[11] = densely_packed[2];
    }

    //100
    else if (densely_packed[6] == '1' && densely_packed[7] == '1' && densely_packed[8] == '1') {
        holder[1] = '0';
        holder[2] = '0';
        holder[3] = '0';
        holder[5] = '0';
        holder[6] = '0';
        holder[7] = '1';
        holder[8] = '1';
        holder[9] = '0';
        holder[10] = densely_packed[0];
        holder[11] = densely_packed[1];
    }

    let unpacked = holder.join("");

    //convert unpacked BCD to decimal
    let unpackedArray = unpacked.split("");
    let decimalArray = new Array(12);

    for (let i = 0; i < 12; i++){
        if (unpackedArray[i] == '1'){
            decimalArray[i] = Math.pow(2, 11 - i);
        }
        else {
            decimalArray[i] = 0;
        }
    }

    for (let i = 0; i < 12; i++){
        decimal += decimalArray[i];
    }

    document.getElementById("output2").innerHTML =
    " Densely-packed BCD: " + x + "<br>"
    + " Unpacked BCD: " + unpacked + "<br>"
    + " Decimal: " + decimal + "<br>";
}