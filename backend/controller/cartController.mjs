export const getCart=(req,res)=>{
    res.status(200).json({
        message: "cart data fetched successfully",
        success:true
    })
 }