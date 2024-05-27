import { Actor, CollisionType, Color, Engine, Font, Text ,vec } from "excalibur"

// 1 - Criar uma instancia de Engine, que representa o jogo 
const game = new Engine({
	width: 800,
	height: 600,
	
})

// 2 - criar barra do player
const barra = new Actor({
	x: 150,
	y: game.drawHeight - 40,
	width: 50,
	height: 20,
	color: Color.fromRGB(165,171,207)
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
const velocidadeBolinha = vec(750, 750)

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

// adiconando pontuacao
let pontos = 0

const textPontos = new Text({
	text: "0",
	font: new Font({ size: 30})
})

const objetoTexto = new Actor({
	x: game.drawWidth - 80,
	y: game.drawHeight - 15
})

objetoTexto.graphics.use(textPontos)

game.add(objetoTexto)




let colidindo: boolean = false

// isso aqui é uma resposta que vai aparece no console quanto a bolinha tocar nna barra 
// bolinha.on("collisionstart", () => {
// 	console.log("caiuuuuuuuuuuu")
// })

bolinha.on("collisionstart", (event) => {
	// verificar se a vbolinha colidiu com algum bloco destrutivel
	if (listaBloco.includes(event.other)){

		event.other.kill()
	}
	
	// Rebater a bolinha e inverter as direcoes
	// esse cara vai pegar a area de contato 
	let interseccao = event.contact.mtv.normalize()

	if (!colidindo) {
		colidindo = true

		// interccao.x e interseccao
		// o maior representa o eixo onde houve o contato
		if (Math.abs(interseccao.x) > Math.abs(interseccao.y)){
			// bolinha.vel.x = -bolinha.vel.x
			// bolinha.vel.x *= -1
			bolinha.vel.x = bolinha.vel.x * -1
		} else {
			// bolinha.vel.y = -bolinha.vel.y
			// bolinha.vel.y *= -1
			bolinha.vel.y = bolinha.vel.y * -1
		}
	}

})

// 7 - Criar os blocos 
// Configuracoes de tamanho e espacamento dos blocos 
const padding = 20

const xoffset = 65
const yoffset = 20

const colunas = 5 
const linhas = 3

const corBloco = [Color.Yellow, Color.Blue, Color.Red]

const larguraBloco = (game.drawWidth / colunas) - padding - (padding / colunas)
// const larguraBloco = 136
const alturaBloco = 30

const listaBloco: Actor[] = []

// renderização dos bloquinhos

// Renderiza as 3 linhas
for(let j = 0; j < linhas; j++){
	
	
	// Renderiza 5 bloquinhos
	for(let li = 0; li < colunas; li++) {
		listaBloco.push(
			new Actor({
				// a gente vai usar o offset pra indicar o deslocammento debloco do outro e irar trocar a posiçao por conta da variavel "i"
				x: xoffset + li * (larguraBloco + padding) + padding,
				y: yoffset + j * (alturaBloco + padding) + padding,
				width: larguraBloco,
				height: alturaBloco,
				color: corBloco[j]
			})
		)
	}
}

listaBloco.forEach(bloco => {
	// Define o tipo de colisor de cada bloco
	bloco.body.collisionType = CollisionType.Active

	//  adiciona cada bloco no game
	game.add(bloco)
})


bolinha.on("collisionend", () => {
	colidindo = false
})

bolinha.on("exitviewport", () => {
	alert("mirreu")
	window.location.reload()
})

// Insere a bolinha 
game.add(bolinha)

// insere o actorbarra - player, no game 
game.add(barra)

// Inicia o game
game.start()

