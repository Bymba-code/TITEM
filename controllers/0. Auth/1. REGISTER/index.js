const { checkExistData, returnCatchedError } = require("../../../services/controllerServices");
const prismaService = require("../../../services/prismaServices")
const bcrypt = require("bcrypt")

const REGISTER_STUDENT = async (req , res) => {
    try 
    {
        const { firstname, lastname, username, password, confirmPassword } = req.body;

        if(!firstname)
        {
            return res.status(403).json({
                success:false,
                data:[],
                message: "Овог нэр оруулна уу."
            })
        }
        if(!lastname)
        {
            return res.status(403).json({
                success:false,
                data:[],
                message: "Өөрийн нэрийг оруулна уу."
            })
        }
        if(!username)
        {
            return res.status(403).json({
                success:false,
                data:[],
                message: "Нэвтрэх нэрийг оруулна уу."
            })
        }
        if(!password)
        {
            return res.status(403).json({
                success:false,
                data:[],
                message: "Нууц үг оруулна уу."
            })
        }
        if(!confirmPassword)
        {
            return res.status(403).json({
                success:false,
                data:[],
                message: "Нууц үг давтан оруулна уу."
            })
        }
        if(password !== confirmPassword)
        {
            return res.status(403).json({
                success:false,
                data:[],
                message: "Нууц үг хоорондоо таарахгүй байна."
            })
        }

        const isUsername = await checkExistData("users", { username: username }, "Нэвтрэх нэр бүртгэгдсэн байна.", res)
        
        if(!isUsername)
        {
            return;
        }

        const salt = await bcrypt.genSalt(10)
        const hashed = await bcrypt.hash(password, salt)

        const result = await prismaService.users.create({
            data: {
                firstname,
                lastname,
                username,
                password: hashed,
                date: new Date()
            }
        })

        return res.status(200).json({
            success:true,
            data:result,
            message: "Амжилттай."
        })
    }
    catch(err)
    {
        returnCatchedError(err, res)
    }
}

module.exports = REGISTER_STUDENT