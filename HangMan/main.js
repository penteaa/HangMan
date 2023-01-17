const btn = document.getElementById('btn');
const poza = document.getElementById('poza');
const litere = document.getElementById('litere');
const erori = document.getElementById('erori');

let cuvant;
let greseli = 6;

document.addEventListener('DOMContentLoaded', onLoad);
document.addEventListener('keyup', onKeyUp);

function onLoad(){
  onReset();
  btn.addEventListener('click', onReset);
}
function onKeyUp(e){
  if(e.keyCode<65 || e.keyCode>90) return;
  let litera = e.key;
  let empty = getEmptySlots();
  let ghicite = 0
  empty.forEach(l=>{
    if(l.k==litera){
      l.textContent=litera;
      delete l.k;
      ghicite++;
    }
  });
  if(ghicite==0){
    erori.textContent = `${erori.textContent} ${litera} | `;
    deseneazaPersonaj(greseli);
    greseli--;
  }
  if(getEmptySlots().length==0){
    alert('You Won!');
  }else if(greseli==0){
    alert('You lost :( !');
  }
}
function onReset(){
  greseli = 6;
  erori.innerHTML='';
  poza.querySelectorAll('[id]').forEach(x=>x.style.display="none");
  cuvant = alegeCuvant();
  deseneazaCuvant(cuvant);
}
function alegeCuvant(){
  let cuvinte = ['elefant', 'dinozaur', 'tastatura','spanzuratoare','javascript'];
  let ndx = genereazaNumar(0,cuvinte.length-1);
  return cuvinte[ndx];
}
function deseneazaCuvant(cuvant){
  let litera;
  litere.innerHTML='';
  cuvant.split('').forEach((l,i)=>{
    litera = document.createElement('span');
    if(i==0 || i==cuvant.length-1)
      litera.textContent = l;
    else
      litera.k = l;
    litere.appendChild(litera);
  });
}
function genereazaNumar(minValue, maxValue){
	return Math.ceil(minValue + Math.random()*(maxValue-minValue));
}
function getEmptySlots(){
  return Array.from(litere.querySelectorAll('span')).filter(l=>l.textContent=="");
}
function deseneazaPersonaj(greseli){
  let id = `id${greseli}`;
  poza.getElementById(id).style.display="inherit";
}
