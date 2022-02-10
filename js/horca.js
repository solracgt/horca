// Inicio de variables
var dic = new Array();
var lrgplb = 0;
var plbAdivinar;
var plbJugador;
var plbErrada = new Array();
var letra;
var fallos = 0;
var sijugar = true;
var txterr;
var txtmsg = "Adivina la palabra";
var abc = [..."ABCDEFGHIJKLMNÑOPQRSTUVWXYZÁÉÍÓÚ"]; //Listado de caracteres validos
var boton = document.getElementById("jugar");
var xplb = document.getElementById("txt1");
var lienzo = document.getElementById("horca");
if (lienzo.getContext) {
   var pincel = lienzo.getContext("2d");
}
var lienzo2 = document.getElementById("horca2");
if (lienzo2.getContext) {
   var pincel2 = lienzo2.getContext("2d");
}

dibujaEntrada();

// Prepara los canvas e inserta las imagenes de portada
function dibujaEntrada() {
   // Parte izquierda de la pantalla lienzo 1
   pincel.beginPath();
   pincel.fillStyle = "lightgreen";
   pincel.fillRect(0, 0, 600, 500);
   pincel.fill();
   var img1 = new Image();
   img1.src = "img/horca.png";
   img1.onload = function() {
      pincel.drawImage(img1, 80, 20);
   }
   // Parte derecha de la pantalla lienzo 2
   pincel.beginPath();
   pincel2.fillStyle = "lightgreen";
   pincel2.fillRect(0, 0, 600, 500);
   pincel.fill();
   var img2 = new Image();
   img2.src = "img/bv.png";
   img2.onload = function() {
      pincel2.drawImage(img2, 80, 45);
   }   
}
// Elije la palabra entre el arreglo de opciones
function sorteaPalabra(){
   dic = ["ABADIA", "EBANO", "IBERIA", "OBESIDAD", "UBER", "ACARIAR", "ECOLOGIA", "ICARO", "OCULO", "UCELO", "ADEMAS", "EDELMIRA", "IDENTIFICAR", "ODIAME", "EXITO", "RIQUEZA", "ABUNDANCIA", "PLENITUD", "SALUD", "BIENESTAR", "IGLESIA"];
   return dic[Math.floor(Math.random() * dic.length)];  
}
// Inicia el juego cuando se hace click en el boton respectivo
function iniciarJuego(){
   sijugar = true;
   plbAdivinar = sorteaPalabra();
   lrgplb = plbAdivinar.length;
   plbJugador = [...plbAdivinar];
   for (var i = 0; i < lrgplb; i++) {
   plbJugador[i] = "___";
   }
   plbErrada.length = 0;
   fallos = 0;
   // iniciaCanvas();
   dibujarCanvas();
   verPlbJugador();

   // Aqui iniciar captura de las letras
   window.addEventListener("keydown", function (event) {
      if (event.defaultPrevented) {
         return; // Do nothing if the event was already processed
      }
      // Variable que obtiene el cáracter de la tecla presionada
      // Captura la letra tecleada
      var letra = event.key;
      console.log(sijugar);
      if (sijugar){
         validaLetra(letra);   
      }else {
         xplb.focus();
         window.removeEventListener("keydown", function(event){}, true)
         location.reload();
      }
      event.preventDefault();
   }, true);
}

function iniciaCanvas() {
   pincel.beginPath();
   pincel.clearRect(0, 0, 600, 500);
   pincel.fillStyle = "lightgreen";
   pincel.fillRect(0, 0, 600, 500);
   //pincel.fill();
   pincel2.beginPath();
   pincel2.clearRect(0, 0, 600, 500);
   pincel2.fillStyle = "lightgreen";
   pincel2.fillRect(0, 0, 600, 500);
   pincel2.fill();
}
// Prepara los lienzos izquierdo y derecho, izquierdo para dibujar el cadalzo y
// el derecho para mostrar los resultados del juego
function dibujarCanvas(){
   iniciaCanvas();
   var img = new Image();
   img.src = "img/h00.png";
   img.onload = function() {
      pincel.drawImage(img, 80, 45);
   }
   pincel2.beginPath();
   pincel2.fillStyle = "blue";
   pincel2.font = "bold 24px courier";
   pincel2.fillText(txtmsg + " de " + lrgplb + " letras", 20, 30);
   //pincel2.fillText(plbJugador, 20, 90);
   pincel2.fillStyle = "red";
   pincel2.fillText("Letras falladas", 20, 170);
   pincel2.fill();
}
// Valida que la letra ingresada sea mayuscula, que este en la palabra a adivinar
// Si cumple estas condiciones, agrega la letra a la respuesta del jugador
// Si no, agrega la palabra al arreglo de letras falladas e incrementa el contador
// de errores, finalmente valida si el jugador acerto la palabra o si llego al maximo de errores
function validaLetra(letra) {
   if (sijugar) {
      let esta = abc.includes(letra) ;
      if (!esta) {
         txterr = "Solo se permiten letras mayusculas, *** Verifique ***";
         msgerr(txterr);
         return;
      }
      esta = plbAdivinar.includes(letra);
      if (esta) {
         for (let i = 0; i < lrgplb; i++) {
            if (plbAdivinar[i] == letra) {
               let xletra = "_" + letra + "_";
               plbJugador[i] = xletra;
            }
         }
         verPlbJugador();
         let xhay = "N";
         for (let i = 0; i < lrgplb; i++) {
            if (plbJugador[i] == "___") {
               xhay = "S";
            }
         }
         if (xhay == "N") {
            verResultado("G");   
         }
      }else {
         plbErrada.push(letra);
         verFallos();
         fallos++ ;
         dibujarHorca(fallos);
         if (fallos == 7) {
            verResultado("P");
         }
      }
      return true;
   }else {
      return false;
   }
}
// Despliega en el lienzo 2 derecho, la palabra del jugador
function verPlbJugador() {
   let verplb = plbJugador.toString();
   pincel2.beginPath();
   pincel2.fillStyle = "blue";
   pincel2.strokeStyle = "blue";
   pincel2.font = "bold 22px courier";
   //pincel2.font = "bold 20px Playfair Display";
   //pincel2.textAlign = "center"
   pincel2.fillText(verplb.replace(/,/g," "), 20, 90);
   pincel2.fill();
}
// Despliega en el lienzo derecho las letras falladas
function verFallos(){
   pincel2.beginPath();
   pincel2.fillStyle = "red";
   pincel2.font = "bold 22px courier";
   pincel2.fillText(plbErrada, 20, 230);
   pincel2.fill();
}
// Despliega en el lienzo derecho, si gano o perdio
function verResultado(xRes){
   let resultado = "Usted Gano, felicitaciones";
   pincel2.beginPath();
   pincel2.fillStyle = "green";
   if (xRes != "G") {
      resultado = "Usted perdio, lo lamentamos"
      pincel2.fillStyle = "red";
   }
   pincel2.font = "bold 26px courier";
   pincel2.fillText(resultado, 20, 350);
   pincel2.fill();
   sijugar = false;
}
// Mensaje de error si hay caracteres invalidos
function msgerr(xtxt) {
   alert(xtxt);
}
// Despliega en lienzo izquierdo las partes del cadalzo y del ahorcado
function dibujarHorca(nError) {
   if (sijugar) {
      let ximg = "img/h0" + nError + ".png";
      var img = new Image();
      img.src = ximg;
      img.onload = function() {
         pincel.drawImage(img, 80, 45);
      }      
   }
}
// Dibujar X final
function dibujarEquis(){
   pincel.beginPath();
   pincel.lineWidth = 5;
   // Tangential lines
   pincel.strokeStyle = 'red';
   pincel.moveTo(300, 150);
   pincel.lineTo(350, 450);
   pincel.moveTo(350, 150);
   pincel.lineTo(300, 450);
   pincel.stroke();
   pincel.fill();
}

function agregarPalabra(){
   let yplb = xplb.value.toUpperCase();
   let esta = "N";
   dic.forEach(function(plb){
      if (plb == yplb) {
         esta = "S";
      }
   })
   if (esta == "S") {
      txterr = "Esta palabra ya esta en el diccionario, *** Verifique ***";
      msgerr(txterr);
   }else {
      dic.push(yplb);
   }
   xplb.value = ""
   xplb.focus();
}
