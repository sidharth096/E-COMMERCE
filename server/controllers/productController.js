import Category from "../models/categoryModel.js";
import Subcategory from "../models/subCategoryModel.js";
import Product from "../models/productModel.js";


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

  const getAllCategories = async (req, res) => {
    try {
      const categories = await Category.find();
      res.status(200).json(categories);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  const getAllSubcategories = async (req, res) => {
    try {
      const subcategories = await Subcategory.find();
      res.status(200).json(subcategories);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  
const addProduct = async (req, res) => {
  try {
    const { title, subcategory, description, variants } = req.body;
    console.log("hai",req.body);
    console.log("filedddd",req.files);
    
    if (!title || !subcategory || !description || !variants) {
      return res.status(400).json({ error: 'Please provide all required fields' });
    }
    const parsedVariants = JSON.parse(variants);

    if (!Array.isArray(parsedVariants) || parsedVariants.some(v => typeof v !== 'object' || !v.ram || !v.price || !v.quantity)) {
      return res.status(400).json({ error: 'Invalid format for variants' });
    }
    const images = req.files.map(file => file?.path); 

  
    if (!Array.isArray(images) || images.some(img => typeof img !== 'string')) {
      return res.status(400).json({ error: 'Invalid format for images' });
    }

    const newProduct = new Product({
      title,
      subcategory,
      description,
      variants:parsedVariants,
      images,
    });


    await newProduct.save();

    res.status(201).json({ message: 'Product added successfully', data: newProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getAllProducts = async (req, res) => {
  try {
   
    const products = await Product.find();

    res.status(200).json( products );
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const findProductById = async (req, res) => {
  try {
    const productId = req.params.id;
    console.log("111",productId);

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.status(200).json({ data: product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const searchProducts = async (req, res) => {
  try {

    const query = req.params.query 

    const products = await Product.find({ title: { $regex: new RegExp(`^${query}`, 'i') } });

  
    console.log(products);
    res.status(200).json( products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


export {addCategory,addSubCategory,getAllCategories,getAllSubcategories,addProduct,getAllProducts,findProductById,searchProducts}