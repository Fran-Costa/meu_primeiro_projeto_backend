const express = require("express") //iniciando o express
const router = express.Router() //configurando a primeira parte da rota
const cors = require('cors')//trazendo o pacote cors que permite consumir esse API no Front-End 

//Ligando ao arquivo banco de dados
const conectaBancoDeDados = require('./bancoDeDados')
conectaBancoDeDados() //Chamando a função que conecta o banco de dados

const Mulher = require('./mulherModel')

const app = express() //iniciando o app
app.use(express.json())
app.use(cors())

const porta = 3333 //criando a porta

//GET
async function mostrarMulheres(resquest, response) {
    try {
        const mulheresVindasDoBancoDeDados = await Mulher.find()

        response.json(mulheresVindasDoBancoDeDados)
    } catch (erro) {
        console.log(erro)
    }
}

//POST
async function criarMulher(resquest, response) {
    const novaMulher = new Mulher({
        nome: resquest.body.nome,
        imagem: resquest.body.imagem,
        citacao: resquest.body.citacao,
        minibio: resquest.body.minibio,
    })

    try {
        const mulherCriada = await novaMulher.save()
        response.status(201).json(mulherCriada)
    } catch (erro) {
        console.log(erro)
    }
}

//PATCH
async function corrigirMulher(resquest, response) {
    try {
        const mulherEncontrada = await Mulher.findById(resquest.params.id)

        if (resquest.body.nome) {
            mulherEncontrada.nome = resquest.body.nome
        }

        if (resquest.body.imagem) {
            mulherEncontrada.imagem = resquest.body.imagem
        }

        if (resquest.body.minibio) {
            mulherEncontrada.minibio = resquest.body.minibio
        }

        if (resquest.body.citacao) {
            mulherEncontrada.citacao = resquest.body.citacao
        }

        const mulherAtualizadaNoBancoDeDados = await mulherEncontrada.save()
        response.json(mulherAtualizadaNoBancoDeDados)
    } catch (erro) {
        console.log(erro)
    }
}

//DELETE
async function deletaMulher(resquest, response) {
    try {
        await Mulher.findByIdAndDelete(resquest.params.id)
        
        response.json({messagem: 'Mulher deletada com sucesso!'})
    } catch (error) {
        console.log(error)
    }
}

//PORTA
function mostrarPorta() {
    console.log(`Servidor criado e rodando na porta ${porta}`)
}

app.use(router.get('/mulheres', mostrarMulheres)) //configura rota GET /mulheres
app.use(router.post('/mulheres', criarMulher)) //configura rota POST /mulheres
app.use(router.patch('/mulheres/:id', corrigirMulher)) //configura a rota PATCH /mulheres/:id
app.use(router.delete('/mulheres/:id', deletaMulher)) //configura a rota DELETE /mulheres/:id

app.listen(porta, mostrarPorta) //servidor ouvindo a porta
