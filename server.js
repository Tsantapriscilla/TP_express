import express from 'express';
import mongoose from 'mongoose';
import Test from './model/test.js';

const app = express();

const port = 8080;

app.use(express.json());

mongoose.connect("mongodb://localhost:27017/testes_tp_express")

//first practice
// app.get('/', (req, res) => {
//     res.send('requête GET to homepage');
// })

// app.post('/', (req, res) => {
//     res.send('requête POST to homepage too');
// })

// app.get('/about', (req, res) => {
//     res.send('About page');
// })

// app.all('/*splat', (req, res) => {  // * remplacé par /*splat après express 4
//     res.status(404).send('404 - Page not found');
// })


// TP
// const tests = []

// // read
// app.get('/', (req, res) => {
//     res.send(testes)
// })

//create
// app.post('/new', (req, res) => {
//     const { titre } = req.body;

//     if (!titre) {
//         return res.status(400).send('Il faut insérer un titre');
//     }

//     const newTest = {
//         id: tests.length + 1,
//         titre: titre,
//     }

//     taches.push(newTest);

//     res.status(201).send({
//         message: "Test ajoutée",
//         data: newTest,
//     })
// })

// app.delete('/delete/:id', (req, res) => {
//     const id = Number(req.params.id);

//     const index = tests.findIndex((tache) => tache.id == id);

//     if (index == -1) {
//         return res.status(404).json({
//             message: "Test non trouvée"
//         })
//     }

//     const tacheSupprimee = tests.splice(index, 1);

//     res.json({
//         message: "test supprimée",
//         data: testSupprimee[0]
//     })
// })


// With mongoose and MongoDB
app.post("/new", async (req, res) => {
    const { titre } = req.body;

    const test = await Test.create({
        titre: titre,
    })

    res.status(201).send({
        message: "Test créée",
        data: test,
    })
})

app.put("/update/:id", async (req, res) => {
    const id = req.params.id;
    const updateTest = await Test.findByIdAndUpdate(id, {
        titre: req.body.titre
    }, {new: true})
    res.status(201).json({
        message: "Testupdated",
        data: updateTest,
    })
})

app.delete("/delete/:id", async (req, res) => {
    const id = req.params.id;
    const deleteTest= await Test.findByIdAndDelete(id);
    res.status(201).send({
        message: "Test supprimée",
    })
})

app.get("/", async (req, res) => {
    const tests = await Test.find();
    res.json(tests);
})

app.get("/:id", async (req, res) => {
    const test= await Test.findById(req.params.id);
    res.json(test);
})



app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
})