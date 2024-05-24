import { Actor, CollisionType, Color, Engine, vec } from "excalibur"

// 1 - Criar uma instancia de Engine, que representa o jogo 
const game = new Engine({
	width: 800,
	height: 600,
	
})

// 2 - criar barra do player
const barra = new Actor({
	x: 150,
	y: game.drawHeight - 40,
	width: 200,
	height: 20,
	color: Color.Orange
})

// colisiontype siginifica que ele a barra na vai se mover quando se colidir com alguma coisa 
barra.body.collisionType = CollisionType.Fixed


// 3 - Movimentar a barra de acordo com aposicao do mouse 
game.input.pointers.primary.on("move" , (event) => {
	//  Faz a posicao x da barra, ser igual a posicao x do mouse 
	barra.pos.x = event.worldPos.x
}) 




// 4 - Criar o Actor bolinha
const bolinha = new Actor({
	x: 100,
	y: 300,
	width: 10,
	height: 10,
	color: Color.White
})

// colisão para a bolinha
bolinha.body.collisionType = CollisionType.Passive

// 5 - Criar movimentacao da bolinha
const velocidadeBolinha = vec(100, 100)

//  aqui define a velocidade que a bolinha vai ter 
setTimeout(() => {
	bolinha.vel = velocidadeBolinha
}, 1000 )


// 6 - fazer bolinha rebater na parede

bolinha.on("postupdate", () => {
	// Se a bolinha colidir com o lado esquerdo 
	if (bolinha.pos.x < bolinha.width / 2){
		bolinha.vel.x = velocidadeBolinha.x
	}

	// Se a bolinha colidir com o lado direito
	if (bolinha.pos.x + bolinha.width / 2 > game.drawWidth){
		bolinha.vel.x = -velocidadeBolinha.x
	} 
	// Se a bolinha colidir com o lado superior 
	if (bolinha.pos.y < bolinha.height / 2){
		bolinha.vel.y = velocidadeBolinha.y
	}

	// Se a bolinha colidir com o lado inferior
	// if (bolinha.pos.y + bolinha.height / 2 > game.drawHeight) {
	// 	bolinha.vel.y = -velocidadeBolinha.y
	// } 
})

// 7 - Criar os blocos 
// Configuracoes de tamanho e espacamento dos blocos 
const padding = 20

const xoffset = 65
const yoffset = 20

const colunas = 5 
const linhas = 3

const corBloco = [Color.Violet, Color.Orange, Color.Yellow]

const larguraBloco = (game.drawWidth / colunas) - padding - (padding / colunas)
// const larguraBloco = 136
const alturaBloco = 30

const listaBloco: Actor[] = []


// Insere a bolinha 
game.add(bolinha)

// insere o actorbarra - player, no game 
game.add(barra)

// Inicia o game
game.start()