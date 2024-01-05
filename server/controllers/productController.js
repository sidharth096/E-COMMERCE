import Category from "../models/categoryModel.js";
import Subcategory from "../models/subCategoryModel.js";


const addCategory = async (req,res)=>{
    try {

        const {categoryname} = req.body

        if(!categoryname){
            return res.status(400).json({error:"Please provide the category name"})
        }

        const existingCategory = await Category.findOne({categoryname})


        if(existingCategory){
            return res.status(409).json({error:"Categoryname alredy exist"})
        }

        const newCategory = new Category({categoryname})
        await newCategory.save()

        res.status(201).json({
            message:"Category added successfully",
            data:newCategory
        })

    } catch (error) {
        res.status(500).json({error:'Internal server errror'})
    }
}

const addSubCategory = async (req, res) => {
    try {
      const {subcategoryname,categoryId } = req.body;
  
      if (!subcategoryname || !categoryId) {
        return res.status(400).json({ error: 'Please provide subcategoryname and categoryId' });
      }
  
      const subcategory = new Subcategory({
        subcategoryname,
        categoryId,
      });
  
      await subcategory.save();
  
      res.status(201).json({ message: 'Subcategory created successfully', data: subcategory });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

export {addCategory,addSubCategory}