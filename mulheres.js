const express = require("express")
const router = express.Router()

const app = express()
const porta = 3333

const mulheres = [
    {
        nome: "Simara Conceição",
        imagem: "http://teste.png",
        minibio: "Desenvolvedora e Instrutora"
    },
    {
        nome: "Iana Chan",
        imagem: "http://teste.png",
        minibio: "Fundadora da Programaria"
    },
    {
        nome: "Nina da Hora",
        imagem: "http://teste.png",
        minibio: "Hacker antirracista"
    },
]

function mostrarMulheres(resquest, response){
    response.json(mulheres)
}


function mostrarPorta(){
    console.log(`Servidor criado e rodando na porta ${porta}`)
}

app.use(router.get('/mulheres', mostrarMulheres))
app.listen(porta, mostrarPorta)
