//Inicializacion de Variables
let uncoveredCards = 0;
let cards1 = null;
let cards2 = null;
let firstResult = null;
let secondResult = null;
let movements = 0;
let successes = 0;
let timer = false;
let decreaseTimer = 40;
let initialTime =  decreaseTimer;
let decreaseTimerId = null;

//Audios
let winSound = new Audio('./sounds/win.wav');
let clickSound = new Audio('./sounds/click.wav');
let loseSound = new Audio('./sounds/lose.wav');
let rightSound = new Audio('./sounds/right.wav');
let wrongSound = new Audio('./sounds/wrong.wav');

// Apuntando a documento HTML
let showMovements = document.getElementById('movement');
let showSuccesses = document.getElementById('successes');
let showDecreaseTimer = document.getElementById('time')

//Generacion de numeros aleatorios 

//arrays ordenados con sus pares
let numbers = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8]; 
//sort ordena los numero de acuerdo a una funcion
//como parametro el orden que quiero que se ordene la funcion 
//funcion flecha 
//valor aleatorio math solo genera positivos para generar negativos restar 0.5
numbers = numbers.sort(()=>{return Math.random()-0.5});
console.log(numbers);


//Funciones

//Funcion Contar tiempo
function countTime(){
    decreaseTimerId = setInterval(()=>{
        decreaseTimer--;
        showDecreaseTimer.innerHTML = `Tiempo ${decreaseTimer} segundos`;
        if(decreaseTimer == 0 ){
            clearInterval(decreaseTimerId);
            blockCard();

        //Sonido
            loseSound.play();

        }
    },1000);
}
//Funcion Bloquear Tarjetas
function blockCard(){
    for (let i = 0; i<=15; i++){
           let cardBlock = document.getElementById(i);
           cardBlock.innerHTML =`<img src="./Img/${numbers[i]}.png" alt="">` ;
           cardBlock.disabled = true;
    }
}

//Funcion principal
function  uncover(id){
    //Temporalizador 
    if(timer == false){
        countTime();
        timer = true;
    }
    //Aumenta el contador cada vez que el usuario hace un click
    uncoveredCards++;
    console.log(uncoveredCards);

    if(uncoveredCards == 1){
        //Mostrar primer numero 
        cards1 = document.getElementById(id); //Seleccione el documento del elemento que tenga el id (parametro)
        //guardar variable
        firstResult = numbers[id];
        //imprimer valor
        cards1.innerHTML =`<img src="./Img/${firstResult}.png" alt="">`;
        
        //Sonido
        clickSound.play();
        
        //Deshabilitar el primer boton
        cards1.disabled = true;


    }else if(uncoveredCards == 2){
        //Mostrar segundo numero
        cards2 = document.getElementById(id);
        secondResult = numbers [id];
        cards2.innerHTML =`<img src="./Img/${secondResult}.png" alt="">`;
        
        //Deshabilitar el segundo boton
        cards2.disabled = true;
        
        //Incrementar Movimientos
        movements++;
        showMovements.innerHTML = `Movimientos: ${movements}`;

        if(firstResult == secondResult){

            //Encerar contador tarjetas destapadas
            uncoveredCards = 0;
         
            //Aumentar Aciertos
            successes++;
            showSuccesses.innerHTML = `Aciertos: ${successes}`;
            //Sonido
            rightSound.play();    

            // Emojis al finalizar
            if (successes == 8){
                //audio
                winSound.play();
                
                clearInterval(decreaseTimerId);
                showSuccesses.innerHTML = `Aciertos: ${successes}😱`;
                showMovements.innerHTML = `Movimientos: ${movements}🤟😎`;
                showDecreaseTimer.innerHTML = `🎉Fantastico! Solo demoraste ${initialTime - decreaseTimer} segundos🎉`;
            }
           

        }else{
            //Sonido
            wrongSound.play();      
            //Mostrar valores y tarparlos
            setTimeout(()=>{
                cards1.innerHTML = ' ';
                cards2.innerHTML = ' ';
                cards1.disabled = false;
                cards2.disabled = false;
                uncoveredCards = 0;
            },800)
        }

    }

}

// boton de Reinicio
document.addEventListener("DOMContentLoaded", function() {
    // Selecciona el botón por su ID
    var btnReset = document.getElementById("btnReset");

    // Agrega un evento de clic al botón
    btnReset.addEventListener("click", function() {
        // Aquí puedes agregar la lógica para reiniciar tu aplicación o realizar acciones de reinicio
        // En este ejemplo, simplemente recargamos la página
        location.reload();
    });
}); 