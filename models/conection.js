const mongoose = require('mongoose');


const uri = 'Remplacez par la chaîne de connexion MongoDB';

mongoose.connect(uri)
    .then(() => {
        console.log('Connexion réussie à MongoDB');
    })
    .catch(err => {
        console.error('Erreur lors de la connexion à MongoDB:', err);
    });
