function paginatedResults(model) {
    return async (req, res, next) => {
        const page = parseInt(req.query.page)
        const limit = parseInt(req.query.limit)

        const startIndex = (page - 1) * limit
        const endIndex = page * limit

        const result = {}

        if (endIndex < await model.countDocuments().exec()) {
            result.next = {
                page: page + 1,
                limit: limit
            }  
        }   

        if (startIndex > 0) {
            result.prev = {
                page: page - 1,
                limit: limit
            }
        }
        
        //the most important block of code in this commit
        try {
            result.results = await model.find().limit(limit).skip(startIndex).exec()
            res.paginatedResults = result
            next()
        } catch (error) {
            res.status(500).json({message: error.message})
            next()
        } 

        next()
      
}
}

module.exports = paginatedResults