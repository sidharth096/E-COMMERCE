import { Router } from "express";
import { login,signUp } from "./controllers/userConroller.js";
import {addCategory,addSubCategory} from "./controllers/productController.js"

const router = Router()

router.post("/signup",signUp)
router.post("/login",login)

router.post("/addcategory",addCategory)
router.post("/addsubcategory",addSubCategory)

export default router