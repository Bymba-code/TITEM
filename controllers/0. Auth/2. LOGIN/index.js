const { returnCatchedError} = require("../../../services/controllerServices");
const prismaService = require("../../../services/prismaServices")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");

const LOGIN_STUDENT = async (req , res) => {
    try 
    {
        const { username, password} = req.body;

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

        const user = await prismaService.users.findFirst({
            where: {
                username:username
            }
        })

        if(!user)
        {
            return res.status(404).json({
                success:false,
                data:[],
                message: "Хэрэглэгчийн бүртгэл олдсонгүй."
            })
        }


        const isMatch = await bcrypt.compare(password, user.password);
        
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                data: [],
                message: "Нууц үг буруу байна.",
            });
        }

        const token = jwt.sign(
            {
                id: user.id,
                username: user.username
            },
            process.env.JWT_SECRET,
            { expiresIn: "12h" }
        );

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", 
            sameSite: "none",
            maxAge: 1000 * 60 * 60 * 24 * 7, 
        })

        return res.status(200).json({
            success:true,
            data:[],
            message: "Амжилттай."
        })
    }
    catch(err)
    {
        returnCatchedError(err, res)
    }
}

module.exports = LOGIN_STUDENT