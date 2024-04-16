let botto = document.getElementById("sumar");
let total = document.getElementById("total");

botto.addEventListener("click",hacersuma);

function hacersuma(){
    let n1=parseFloat(document.getElementById('n1').value);
    let n2=parseFloat(document.getElementById('n2').value);

    let = s=n1+n2;
    total.innerHTML = 'la suma es ${s}' ;
}
