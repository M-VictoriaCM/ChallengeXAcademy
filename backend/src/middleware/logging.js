const loggingMdw=(request, response, next) =>{
    console.log(`Se hizo un request a la url: ${request.url}`);
    response.setHeader("Content-Type", "Application/json");
    next();
};

module.exports=loggingMdw;