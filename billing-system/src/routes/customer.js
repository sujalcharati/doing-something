import express from "express";
import { createCustomer , listallCustomers, getCustomer, updateUser,deleteUser } from "../controllers/customer";
const router = express.Router();

router.post('/create',createCustomer);
router.get('/list',listallCustomers);
router.get('/getOne/:id', getCustomer);
router.patch('/update/:id',updateUser);
router.delete('delete/:id',deleteUser);