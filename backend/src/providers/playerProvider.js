const  { Player } = require('../models');
const {Op} =require('sequelize');

//Muestra el jugador por ID
const getPlayer = async (id) => {
    try {
        const player = await Player.findByPk(parseInt(id));
        if(player){
            return player;
        }else{
            throw new Error('No se encontraron resultados');
        }
    } catch (error) {
        throw error;
    }
}
//Filtro para poner buscar dependiendo el atributo
const getPlayers = async (request)=>{
    //primero traigo los atributos por lo cuales quiero que pueda buscar
    const {
        short_name, 
        long_name,
        player_positions,
        club_name,
        nationality_name,
        potential,
        age, 
        height_cm,
        preferred_foot,
        skill_moves,
        international_reputation,
        work_rate}=request.query;

        try {
            
            //utilizo el tolowerCase() para no tener problemas con las mayusculas
            let query = {};
            if(short_name){
                query.short_name ={[Op.like]: `%${short_name.toLowerCase()}%`};
            }
            if(long_name){
                query.short_name ={[Op.like]: `%${long_name.toLowerCase()}%`};
            }
            if(player_positions){
                query.player_positions = {[Op.like]:  `%${player_positions.toLowerCase()}%`};
            }
            if(club_name){
                query.club_name={[Op.like]:  `%${club_name.toLowerCase()}%`};
            }
            if(nationality_name){
                query.nationality_name = {[Op.like]: `%${nationality_name.toLowerCase()}%`};
            }
            if(potential){
                query.potential=potential;
            }
            if(age){
                query.age =age;
            }
            if(height_cm){
                query.height_cm = height_cm;
            }
            if(preferred_foot){
                query.preferred_foot ={[Op.like]:  `%${preferred_foot.toLowerCase()}%`};
            }
            if(skill_moves){
                query.skill_moves =skill_moves;
            }
            if(international_reputation){
                query.international_reputation = international_reputation;
            }
            if(work_rate){
                query.work_rate ={[Op.like]:   `%${work_rate}%`};
            }
            const { page=1, limit = 3} = request.query;
            const offset =(page - 1)* limit;
            //Guardo todas las queries en una variable
            const { count, rows: players } = await Player.findAndCountAll({
                where: query,
                limit: parseInt(limit, 10),
                offset: parseInt(offset, 10)
            });
            if (players.length > 0) {
                const totalPages = Math.ceil(count / limit);
                return {
                    players,
                    pagination: {
                        totalItems: count,
                        totalPages,
                        currentPage: parseInt(page, 10),
                        itemsPerPage: parseInt(limit, 10)
                    }
                };
            } else {
                throw new Error('No se encontraron resultados');
            }
        } catch (error) {
            throw error;
        }
    
};

// Creación del jugador
const createPlayer = async (playerOptions) => {
    if (!playerOptions.fifa_update) {
        playerOptions.fifa_update = '2';
    }
    try {
        const newPlayer = await Player.create(playerOptions);
        return newPlayer;
    } catch (error) {
        throw error;
    }
};
//Modificacion del jugador
const updatePlayer =async(playerId, playerOptions) =>{
    try {
        await getPlayer(playerId);
        const [numRowsUpdated] =await Player.update(playerOptions, {
            where:{id:playerId},
            returning:true,
        });
        console.log( `Se actualizaron ${numRowsUpdated} filas de la DB`);
        return Player.findByPk(playerId);
    } catch (error) {
        throw error;        
    }
};
module.exports={
    getPlayer,
    getPlayers,
    createPlayer,
    updatePlayer
};