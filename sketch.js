//Variaveis Bolinha
let xBolinha = 300;
let yBolinha = 200;
let dBolinha = 20;

//Variaveis velocidade da Bolinha
let velocidadeXBolinha = 5;
let velocidadeYBolinha = 5;

//Variavel raio da bolinha
let raio = dBolinha / 2;

//Variaveis Raquete
let xRaquete = 5;
let yRaquete = 150;
let raqueteComprimento = 10;
let raqueteAltura = 90;

//Variaveis Raquete Oponente
let xRaqueteOponente = 585;
let yRaqueteOponente = 150;
let velocidadeYOponente;
let chanceDeErrar = 0;

let colidiu = false;

//Placar
let meusPontos = 0;
let pontosOponente = 0;

//Game Songs
let raquetada;
let gol;
let trilhaSonora;

//Game Songs
function preload(){
  trilhaSonora = loadSound("trilha.mp3");
  gol = loadSound("ponto.mp3");
  raquetada = loadSound("raquetada.mp3")
}

function setup() {
  createCanvas(600, 400);
  trilhaSonora.loop();
}

function draw() {
    background(0);
    mostraBolinha();
    movimentoBolinha();
    verificaColisaoBorda();
    mostrarRaquete(xRaquete, yRaquete);
    movimentoRaquete();
    verificaColisaoRaquete(xRaquete, yRaquete);
    mostrarRaquete(xRaqueteOponente, yRaqueteOponente);
    movimentoRaqueteOponente();
    verificaColisaoRaquete(xRaqueteOponente, yRaqueteOponente);
    incluiPlacar();
    marcaPonto();
    bolinhaNaoFicaPresa();
}

//FUNCTIONS
function mostraBolinha(){
  circle(xBolinha, yBolinha, dBolinha);
}

function movimentoBolinha(){
    xBolinha += velocidadeXBolinha;
    yBolinha += velocidadeYBolinha;
}

function verificaColisaoBorda(){
    if (xBolinha + raio > width ||
        xBolinha - raio < 0) {
      velocidadeXBolinha *= -1;
    }
    if (yBolinha + raio > height || 
        yBolinha - raio < 0) {
      velocidadeYBolinha *= -1;
    }
}

function mostrarRaquete(x, y){
  rect(x, y, raqueteComprimento, raqueteAltura);
}

function movimentoRaquete(){
  if (keyIsDown(UP_ARROW)){
    yRaquete -= 10;
  }
  if (keyIsDown(DOWN_ARROW)){
    yRaquete += 10;
  }
}

function bolinhaNaoFicaPresa(){
    if (xBolinha - raio < 0){
    xBolinha = 23
    }
}

function verificaColisaoRaquete(x, y){
  colidiu = collideRectCircle(x, y, raqueteComprimento, raqueteAltura,xBolinha, yBolinha, dBolinha);
  if (colidiu){
    velocidadeXBolinha *= -1;
    raquetada.play();
  }
}

//modo multiplayer
function movimentoRaqueteOponente(){
  if (keyIsDown(87)){
  yRaqueteOponente -= 10;
  }
  if (keyIsDown(83)){
  yRaqueteOponente += 10;
  }
}

function incluiPlacar (){
  stroke(255);
  textAlign(CENTER);
  textSize(20);
  fill(color(255, 140, 0));
  rect(150, 10, 40, 20);
  fill(255);
  text(meusPontos, 170, 26);
  fill(color(255, 140, 0));
  rect(450, 10, 40, 20);
  fill(255);
  text(pontosOponente, 470, 26);
}

function marcaPonto(){
  if (xBolinha > 590){
    meusPontos += 1;
    gol.play();
  }
  if(xBolinha < 10){
    pontosOponente += 1; 
    gol.play();
  }
}
