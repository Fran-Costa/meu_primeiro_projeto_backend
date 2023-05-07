const express = require("express") //iniciando o express
const router = express.Router() //configurando a primeira parte da rota
const { v4: uuidv4 } = require("uuid")

const app = express() //iniciando o app
app.use(express.json())

const porta = 3333 //criando a porta

//criando lista inicial de mulheres
const mulheres = [
    {
        id: '1',
        nome: "Simara Conceição",
        imagem: "http://teste.png",
        minibio: "Desenvolvedora e Instrutora"
    },
    {
        id: '2',
        nome: "Iana Chan",
        imagem: "http://teste.png",
        minibio: "Fundadora da Programaria"
    },
    {
        id: '3',
        nome: "Nina da Hora",
        imagem: "http://teste.png",
        minibio: "Hacker antirracista"
    },
]

//GET
function mostrarMulheres(resquest, response) {
    response.json(mulheres)
}

//POST
function criarMulher(resquest, response) {
    const novaMulher = {
        id: uuidv4(),
        nome: resquest.body.nome,
        imagem: resquest.body.imagem,
        minibio: resquest.body.minibio,
    }

    mulheres.push(novaMulher)

    response.json(mulheres)
}

//PORTA
function mostrarPorta() {
    console.log(`Servidor criado e rodando na porta ${porta}`)
}

//PATCH
function corrigirMulher(resquest, response) {
    function encontrarMulher(mulher) {
        if (mulher.id === resquest.params.id) {
            return mulher
        }
    }

    const mulherEncontrada = mulheres.find(encontrarMulher)

    if (resquest.body.nome) {
        mulherEncontrada.nome = resquest.body.nome
    }
    if (resquest.body.imagem) {
        mulherEncontrada.imagem = resquest.body.imagem
    }
    if (resquest.body.minibio) {
        mulherEncontrada.minibio = resquest.body.minibio
    }

    response.json(mulheres)
}

//DELETE
function deletaMulher(resquest, response) {
    function todasMenosEla(mulher) {
        if (mulher.id !== resquest.params.id) {
            return mulher
        }
    }

    const mulheresQueFicam = mulheres.filter(todasMenosEla)

    response.json(mulheresQueFicam)
}

app.use(router.get('/mulheres', mostrarMulheres)) //configura rota GET /mulheres
app.use(router.post('/mulheres', criarMulher)) //configura rota POST /mulheres
app.use(router.patch('/mulheres/:id', corrigirMulher)) //configura a rota PATCH /mulheres/:id
app.use(router.delete('/mulheres/:id', deletaMulher)) //configura a rota DELETE /mulheres/:id

app.listen(porta, mostrarPorta) //servidor ouvindo a porta
