import { Router } from "express";
import { login,signUp } from "./controllers/userConroller.js";
import {addCategory,addSubCategory,getAllCategories,getAllSubcategories,addProduct,getAllProducts,findProductById,searchProducts,updateProduct} from "./controllers/productController.js"
import { upload,handleUploadErrors } from "./midddleware/multerCloudinary.js";

const router = Router()

router.post("/signup",signUp)
router.post("/login",login)

router.post("/addcategory",addCategory)
router.post("/addsubcategory",addSubCategory)
router.post('/addproduct', upload.array('images'), handleUploadErrors, addProduct);



router.get('/getcategories',getAllCategories)
router.get('/getsubcategories',getAllSubcategories)
router.get('/getproducts',getAllProducts)

router.get('/getproductbyId/:id',findProductById)
router.get('/searchproduct/:query',searchProducts )

router.post('/editproduct/:id', upload.array('images'), updateProduct)


export default router