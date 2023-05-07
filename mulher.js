const express = require("express")
const router = express.Router()

const app = express()
const porta = 3333

function mostrarMulher(resquest, response){
    response.json({
        nome: "Simara Conceição",
        imagem: "https://github.com/simaraconceicao.png",
        minibio: "Desenvolvedora e Instrutora"
    })
}


function mostrarPorta(){
    console.log(`Servidor criado e rodando na porta ${porta}`)
}

app.use(router.get('/mulher', mostrarMulher))
app.listen(porta, mostrarPorta)
