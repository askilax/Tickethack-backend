const mongoose = require('mongoose');

const connectionString = 'mongodb+srv://catherine:CjECJRKLF5iPO2ph@cluster0.mcs5y.mongodb.net/tickethack';
//const url = 'Remplacez par la chaîne de connexion MongoDB';

mongoose.connect(connectionString,{ connectTimeoutMS: 2000 } )
    .then(() => {
        console.log('Connexion réussie à MongoDB');
    })
    .catch(err => {
        console.error('Erreur lors de la connexion à MongoDB:', err);
    });
