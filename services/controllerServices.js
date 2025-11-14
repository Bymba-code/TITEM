const prismaService = require("./prismaServices")

const checkValidParam = (param, res) => {
    if (
        param === null ||
        param === undefined ||
        (typeof param === "number" && isNaN(param))
    ) {
        res.status(400).json({
            success: false,
            data: [],
            message: "Мэдээлэл буруу эсвэл дутуу байна.",
        });
        return false; 
    }

    return true;
};

const storeData = async (param, string, res, include = {}) => {

    if (!checkValidParam(param = param, res)) return;
    
    const data = await prismaService[string].findUnique({
        where: {
            id: parseInt(param)
        },
        include
    })

    if(!data)
    {
        return res.status(404).json({
            success:false,
            data:[],
            message: "Мэдээлэл байхгүй эсвэл устсан байна."
        })
    }

    return res.status(200).json({
        success:true,
        data:data,
        message: "Амжилттай."
    })
}

const returnCatchedError = (error, res) => {
    console.log("Баригдсан алдаа:" + " " +  error)

    const message = typeof error === "string" ? error : error.message || "Серверийн алдаа гарлаа.";

    return res.status(500).json({
        success:false,
        data:[],
        message: message
    })
}

const insertData = async (params = {}, res) => {
    try {
        const { model, data, include = {} } = params;

        // 1. Модель шалгах
        if (!model || typeof model !== "string") {
            return res.status(400).json({
                success: false,
                message: "Орлуулах моделийн нэр буруу байна.",
            });
        }

        // 2. Өгөгдөл шалгах
        if (!data || typeof data !== "object" || Object.keys(data).length === 0) {
            return res.status(400).json({
                success: false,
                message: "Өгөгдөл дутуу эсвэл буруу байна.",
            });
        }

        // 3. Модел байгаа эсэхийг шалгах
        if (!prismaService[model]) {
            return res.status(400).json({
                success: false,
                message: `Модел олдохгүй эсвэл устсан байна.`,
            });
        }

        // 4. Өгөгдөл нэмэх
        const result = await prismaService[model].create({
            data,
            include,
        });

        return res.status(200).json({
            success: true,
            data: result,
            message: "Амжилттай нэмэгдлээ.",
        });
    } catch (err) {
        
        return returnCatchedError(err, res);
    }
};


const storeDataVersionTwo = async (
    res,
    string,
    whereClause = {},
    order = { id: "desc" },
    page = null,
    limit = null,
    include = {}
) => {
    try {
        // Модел шалгах
        if (!prismaService[string]) {
            return res.status(400).json({
                success: false,
                message: `Тухайн модел устсан эсвэл байхгүй байна.`,
            });
        }

        // QueryOption Динамикаар үүсгэх
        const queryOptions = {
            where: whereClause,
            orderBy: order,
            include,
        };

        // Хэрвээ page, limit байгаа бол pagination тохируулах
        let pagination = null;

        if (page && limit) {
            const skip = (page - 1) * limit;
            queryOptions.skip = skip;
            queryOptions.take = limit;

            const total = await prismaService[string].count({ where: whereClause });
            pagination = {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            };
        }

        const data = await prismaService[string].findMany(queryOptions);

        if (!data || data.length === 0) {
            return res.status(404).json({
                success: false,
                data: [],
                message: "Мэдээлэл устсан эсвэл олдсонгүй.",
            });
        }

        return res.status(200).json({
            success: true,
            data,
            ...(pagination && { pagination }), 
            message: "Амжилттай.",
        });
    } catch (err) {
        return returnCatchedError(err, res);
    }
};


const checkExistData = async (model, whereClause = {}, message, res) => {
    try {
        if (!prismaService[model]) {
            return res.status(400).json({
                success: false,
                data: [],
                message: `Тухайн модел устсан эсвэл байхгүй байна.`,
            });
        }

        const data = await prismaService[model].findMany({
            where: whereClause,
        });

        if(data.length > 0)
        {
            res.status(403).json({
                success:false,
                data:[],
                message: message
            })
            return false
        }
        
        return true;

    } catch (err) {
        return returnCatchedError(err, res);
    }
};

const updateData = async (model, whereClause = {}, data = {}, res, include = {}) => {
    try {
        if (!prismaService[model]) {
            return res.status(400).json({
                success: false,
                data: [],
                message: `Тухайн модел устсан эсвэл байхгүй байна.`,
            });
        }

        
        if (!data || Object.keys(data).length === 0) {
            return res.status(400).json({
                success: false,
                data: [],
                message: "Шинэчлэлт хийх мэдээлэл байхгүй байна.",
            });
        }

        const updatedData = await prismaService[model].update({
            where: whereClause,
            data
        });

        return res.status(200).json({
            success: true,
            data: updatedData,
            message: "Амжилттай.",
        });
    } catch (err) {
        return returnCatchedError(err, res);
    }
};

const deleteData = async (model, whereClause = {}, res, include = {}) => {
    try {
        // Model шалгах
        if (!prismaService[model]) {
            return res.status(400).json({
                success: false,
                data: [],
                message: `Тухайн модел устсан эсвэл байхгүй байна.`,
            });
        }
        
        const data = await prismaService[model].findFirst({
            where:whereClause,
        })

        if(!data)
        {
            return res.status(404).json({
                success:false,
                data:[],
                message: "Мэдээлэл устсан эсвэл байхгүй байна."
            })
        }

        // Delete хийх
        const deletedData = await prismaService[model].delete({
            where: whereClause,
            include,
        });

        return res.status(200).json({
            success: true,
            data: deletedData,
            message: "Амжилттай устгалаа.",
        });
    } catch (err) {
        return returnCatchedError(err, res);
    }
};



module.exports = { storeData, checkValidParam, returnCatchedError, insertData, checkExistData, storeDataVersionTwo, updateData, deleteData}