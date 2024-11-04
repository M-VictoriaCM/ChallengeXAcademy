const express =require('express');
const playerService = require('../services/player');
const router = express.Router();

//obtener jugador por ID
router.get('/:playerId', async(request, response) =>{
    const playerId = request.params.playerId;
    try {
        const player = await playerService.getPlayer(playerId);
        response.status(200).json(player);
    } catch (error) {
        response.status(500).json({
            message: error.message
        });
    }
});
//Listar por Filtro
router.get('/', async (request, response) => {
    try {
        const players = await playerService.getPlayers(request);
        response.status(200).json(players);
    } catch (error) {
        response.status(400).json({message: error.message});
    }    
});

router.post('/', async (request, response) => {
    const { 
        fifa_version,
        fifa_update ='2',
        player_face_url,
        long_name,
        short_name, 
        player_url, 
        player_positions,
        overall,
        potential, 
        age, 
        height_cm=null,
        weight_kg=null,
        preferred_foot=null,
        body_type=null,
        nationality_name=null,
        club_name='sin club'        
    } = request.body;

    // Validación de los campos requeridos
    if (!fifa_version || !fifa_update || !player_face_url || !long_name ||
        !short_name || !player_url || !player_positions || !overall ||
        !potential || !age || !height_cm ||
        !weight_kg|| !preferred_foot ||
        !body_type || !nationality_name || !club_name)  {
        return response.status(400).json({ message: "Todos los campos son requeridos." });
    }

    try {
        const fifa_update_date = new Date(); // Obtener la fecha y hora actuales

        const player = await playerService.createPlayer({ 
            fifa_version,
            fifa_update, 
            player_face_url,
            long_name,
            short_name, 
            player_url, 
            player_positions,
            overall,
            potential, 
            age,
            height_cm,
            weight_kg,
            preferred_foot,
            body_type,
            nationality_name,
            club_name,
            fifa_update_date
        });
        response.status(201).json(player);
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
});

//Modificacion del  jugador
router.put('/:playerId', async (request, response) => {
    const playerId =request.params.playerId;
    const { fifa_version, 
        fifa_update, 
        player_face_url, 
        long_name, 
        short_name, 
        player_url, 
        player_positions,
        overall,
        potential, 
        age,
        height_cm,
        weight_kg,
        preferred_foot,
        body_type,
        nationality_name,
        club_name}= request.body;
    try {
        const newPlayer =await playerService.updatePlayer(playerId, {
            fifa_version, 
            fifa_update, 
            player_face_url, 
            long_name, 
            short_name, 
            player_url, 
            player_positions,
            overall,
            potential, 
            age,
            height_cm,
            weight_kg,
            preferred_foot,
            body_type,
            nationality_name,
            club_name
        });
        response.status(200).json(newPlayer);
    } catch (error) {
        response.status(500).json({message:error.message});
    }  
});


module.exports = router;