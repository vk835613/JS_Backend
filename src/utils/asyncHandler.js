const asyncHandler = (requestHandler)=>{

    return(req, res, next) =>{
        Promise.resolve(requestHandler(req, res, next)).catch((error) => next(error))
    }

}


export {asyncHandler}


// SUPER FUNCTION - Super function is the in which unother function is pass as parameter or return value as function.... IN OTHER WORD the function which pass a function as a paramenter is called a Super Function..
// const asyncHandler = (fun) => async (req, res, next) => {

//     try {
//         await fun(req, res, next)
//     } catch (error) {
//         res.status(error.code || 500).json({
//             success: false,
//             message: error.message
//         })
//     }
// }