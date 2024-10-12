import mongoose from "mongoose"
import Product from "../models/product.model.js"

export const getAllProducts = async (req, res) => {

    try {
        const products = await Product.find({})
        if (!products) {
            return res.status(400).json({ success: false, message: "No products found" })
        }
        return res.status(201).json({ success: true, data: products})
    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: "Server Error fetching products" })
    }
}
export const createProduct = async (req, res) => {
    try {
        const product = req.body; //give a object exp : product.name

        if (!product.name || !product.price || !product.image) {
            return res.status(400).json({ success: false, message: "Please fill all fields!" })
        }
        const newProduct = new Product(product)
        await newProduct.save()
        return res.status(201).json({ success: true, data: newProduct, message: "Product created successfully!" })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: "Server Error Creating Products" })
    }

}
export const putProduct = async (req, res) => {

    try {
        const { id } = req.params;
        const product = req.body; // product is here an object

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, message: "Missing parameter" })
        }
        const existingProduct = await Product.findById(id)
        if (!existingProduct) {
            return res.status(404).json({ success: false, message: "Product not found." });
        }
        const updatedProductData = {
            name: product.name || existingProduct.name,
            price: product.price || existingProduct.price,
            image: product.image || existingProduct.image
        }
        const updatedProduct = await Product.findByIdAndUpdate(id, updatedProductData, { new: true })
        return res.status(201).json({ success: true, data: updatedProduct, message: "Product updated successfully!" })


    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: "Server Error Updating Products" })
    }



}
export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, message: "Missing parameter" })
        }
        await Product.findByIdAndDelete(id)
        return res.status(201).json({success : true, message : "Product deleted successfully!"})

    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: "Server Error Deleting Products" })
    }

}