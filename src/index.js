const path = require('path')
const express = require('express')
const port = process.env.PORT || 3000

const app = express()

app.use(express.json())

app.post('/ordenaLista', (req, res) => {
	const { listas } = req.body
	listas.salaN = listas.salaN.sort((a, b) => a - b)
	listas.salaS = listas.salaS.sort()
	res.send({ listas })
})

/**
 * NOTA: De acordo com o RFC 2616, seção 4.3 e seção 9.3, atualizado pelo
 * RFC 2616 seção 4.3.1: Um servidor WEB deveria ignorar o payload de requests
 * GET, pois eles não tem uma semântica definida
 * Além disso, o window.fetch do browser não permite que um body seja enviado
 * em um request GET, então ele foi alterado para POST
 */
app.post('/interlace', (req, res) => {
	const { intervaloA, intervaloB } = req.body
	intervaloA.sort((a, b) => a - b)
	intervaloB.sort((a, b) => a - b)
	const result = intervaloA[0] <= intervaloB[1] && intervaloA[1] >= intervaloB[0]
	res.send({ result })
})

app.use(express.static(path.join(__dirname, './static')))

app.listen(port, err => {
	if (err) console.error('Error setting up server', err)
	else console.log('Server is up on port', port)
})
