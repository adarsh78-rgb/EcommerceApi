import { Product } from "../model/Product.js";



//add product
export const addProduct = async(req,res) =>{
    try {
        let product = await Product.create(req.body);
        res.json({message:"Product created . . . !",success:true,product});
    } catch (error) {
        res.status(500).json({message:error,success:false});
    }
};

//get all product
export const getAllProduct = async(req,res)=> {
    try {
        let products = await Product.find();
        res.json({message:"Product found . . . !",success:true,products});
    } catch (error) {
        res.status(500).json({message:error,success:false});
    }
}

//get  product by id
export const getProductById = async(req,res)=> {
    try {
        let product = await Product.findById(req.params.id);
        if(!product) return res.json({message:"Not Found . . . !",success:false});

        res.json({message:"Product found . . . !",success:true,product});
    } catch (error) {
        res.status(500).json({message:error,success:false});
    }
}

//update by Id
export const updateProductById = async(req,res) =>{
    const id = req.params.id;
    try {
        let product = await Product.findByIdAndUpdate(id,req.body,{new:true});
        if(!product) return res.json({message:"Not Found . . . !",success:false});

        res.json({message:"Product Updated Successfully . . . !",success:true,product});

    } catch (error) {
        res.status(500).json({message:error,success:false});
    }
}

//delete by id
export const deleteProductById = async(req,res) =>{
    const id = req.params.id;
    try {
        let product = await Product.findByIdAndDelete(id,req.body,{new:true});
        if(!product) return res.json({message:"Not Found . . . !",success:false});

        res.json({message:"Product Deleted Successfully . . . !",success:true});
        
    } catch (error) {
        res.status(500).json({message:error,success:false});
    }
}