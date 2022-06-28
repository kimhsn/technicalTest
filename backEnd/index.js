const express =require('express');
const cors =require('cors');
const app=express();
const data_mock=require('./MOCK_DATA');
const { body, validationResult } = require('express-validator');

// Middleware
app.use(express.json())
app.use(cors());

// Exercice 1
app.get('/establishment',(req,res)=>{
    res.status(200).json(data_mock)
})


// Créer un nouvel élément en vérifiant la validité des valeurs
app.post('/establishment',
    body('mail').isEmail().normalizeEmail(),
    (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array()
            });
        }
        data_mock.push(req.body)

        res.status(200).json({
            success: true,
            data_mock
        })
})

// Supprimer un élément à l’aide de son ID
app.delete('/establishment/delete/:id', (req,res) => {
    const id = parseInt(req.params.id)
    let e = data_mock.find(e => e.id === id)
    data_mock.splice(data_mock.indexOf(e),1)
    res.status(200).json(data_mock)
})



// Obtenir un élément à l’aide de son nom
app.get('/establishment/:etablissement', (req,res) => {
    const etablissement = req.params.etablissement
    const data = data_mock.find(data => data.etablissement === etablissement)
    res.status(200).json(data)
})


// Modifier un élément à l’aide de son ID
app.put('/establishment/:id', 
body('mail').isEmail().normalizeEmail(),
(req,res) => {
    const id = parseInt(req.params.id)
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array()
            });
    }
    let e = data_mock.find(e => e.id === id)
    e.etablissement_type =req.body.etablissement_type,
    e.etablissement =req.body.etablissement,
    e.location =req.body.location,
    e.address =req.body.address,
    e.mail =req.body.mail,
    res.status(200).json(e)
})



//exercice 2
//Obtenir la somme de tous les commerces d’un secteur d’activité donné
app.get('/trade/:etablissement_type', (req, res) => {
    const etabType = req.params.etablissement_type
    var dataFilterByType = data_mock.filter( element => element.etablissement_type ==etabType)
    res.status(200).json({sum:dataFilterByType.length})

})
    
//Obtenir la somme de tous les commerces d’une ville donné
app.get('/trade/location/:location', (req, res) => {
    const loc = req.params.location
    var dataFilterByLocation = data_mock.filter( element => element.location ==loc)
    res.status(200).json({sum:dataFilterByLocation.length})
})


//Obtenir la somme de tous les commerces d’un secteur d’activité dans une ville donnée
app.get('/api/location=:location&etablissement_type=:etablissement_type', (req, res) => {
    const loc = req.params.location
    const etabType = req.params.etablissement_type
    var dataFilterByLocation = data_mock.filter( element => element.location ==loc)
    var dataFilterByEtablissement_typeAndLocation = dataFilterByLocation.filter( element => element.etablissement_type ==etabType)
        res.status(200).json({sum:dataFilterByEtablissement_typeAndLocation.length})

})


//Exercice 3
//Obtenir tous les établissements en fonction d’une ville donnée
app.get('/api/establishment/:location', (req, res) => {
    const loc = req.params.location

    var dataFilterByLocation = data_mock.filter( element => element.location ==loc)

    res.status(200).json(dataFilterByLocation)
})

// Obtenir tous les établissements en fonctions du secteur et de la ville
app.get('/api/location=:location&etablissement_type=:etablissement_type', (req, res) => {
    const loc = req.params.location
    const etabType = req.params.etablissement_type

    var dataFilterByLocation = data_mock.filter( element => element.location ==loc)
    var dataFilterByEtablissementTypeAndLocation = dataFilterByLocation.filter( element => element.etablissement_type ==etabType)
        res.status(200).json(dataFilterByEtablissementTypeAndLocation)

})

//Supprimer tous les établissements d’une ville
app.delete('/delete/location/:location', (req, res) => {
    const loc = req.params.location

    for( var i = 0; i < data_mock.length; i++){ 
        let e = data_mock.find(e => e.location === loc)
        data_mock.splice(data_mock.indexOf(e),1)
    }
    res.status(200).json(data_mock)
})

//Supprimer tous les établissements d’un secteur d’activité
app.delete('/delete/sector/:etablissement_type', (req, res) => {
    const etabType = req.params.etablissement_type

    for( var i = 0; i < data_mock.length; i++){ 
        let e = data_mock.find(e => e.etablissement_type === etabType)
        data_mock.splice(data_mock.indexOf(e),1)
    }
    res.status(200).json(data_mock)
})


app.listen(8080, () => {
    console.log('listening on port 8080')
})