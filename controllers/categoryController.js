import categoryModel from "../models/categoryModel.js";
import slugify from "slugify";

export const createCategoryController = async (req,res)=>{
        try{
            const {name} =req.body;
            if(!name){
                return res.status(401).send({message:"Name is required"});
            }
            const existingCategory = await categoryModel.findOne({name});
            if(existingCategory){
                    return res.status(200).send({
                        success:true,
                        message:"Category Already exists"
                    });

            }
            const category =await new categoryModel({
                name,
                slug:slugify(name),
            }).save();
            res.status(201).send({
                success:true,
                message:"new Category Created",
                category,
            })
        }catch(error){
            console.log(error)
            res.status(500).send({
                success:false,
                error,
                message:"Error in creating category"
            })
        }
};

export const updateCategoryController = async(req,res) =>{
    try{
        const {name} = req.body
        const {id} =req.params
        const category =await categoryModel.findByIdAndUpdate(id,{name,slug:slugify(name)},{new:true})
        res.status(200).send({
            success:true,
            message:"Category Updated Successfully",
            category,
        });
    }catch(error){
        console.log(error)
        res.send({
            success:false,
            error,
            message:'error while updating category'
        })
    }
}

//get all categories
export const CategoryController =async (req,res) =>{
    try{
        const category = await categoryModel.find({});
        res.status(200).send({
            success:true,
            message:"All Categories List",
            category,
        })
    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:"error while getting all categories"
        })
    }
}


export const singleCategoryController =async(req,res)=>{
    try{
        
        const category =await categoryModel.findOne({slug:req.params.slug})
        res.status(200).send({
            success:true,
            message:"Got single category successfully",
            category
        })
    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:"error while getting single categories"
        })
    }
}

//delete category
export const deleteCategoryController =async(req,res)=>{
    try{
        const {id} =req.params
        await categoryModel.findByIdAndDelete(id)
        res.status(200).send({
            success:true,
            messsage:"Category deleted SuccessFully!"
        })
        
    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:"error while deleting category ",
            error
        })
    }
} 