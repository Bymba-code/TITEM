const { insertData, checkExistData } = require("../../../services/controllerServices")

const ME_UPDATE_USER_LEVEL = async (req, res) => {
    try 
    {
        const { topicContent } = req.body;

        
    }
    catch(err)
    {

    }

  
      
    await insertData({
        model: "users_level",
        data: {
          
        },   
    }, res)
}

module.exports = ME_UPDATE_USER_LEVEL

