const { request } = require('express');
const playProvider = require('../providers/playerProvider');

//Listado por ID
const getPlayer = async (id)=>{
    return await playProvider.getPlayer(id);
}

//Listado por filtro
const getPlayers = async(request)=>{
    return await playProvider.getPlayers(request);
};

// Creación del jugador
const createPlayer = async (Player) => {
    return await playProvider.createPlayer(Player);
};
const updatePlayer = async(id, player)=>{
    return await playProvider.updatePlayer(id, player);
};

const queryPlayer =(name)=>{};

module.exports={
    getPlayer,
    getPlayers,
    createPlayer,
    updatePlayer
}