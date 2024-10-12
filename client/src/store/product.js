import { create } from "zustand"
// import Cookies from "js-cookie";

export const useProductStore = create((set) => ({
    products: [],
    setProducts: (products) => set(({ products })),

    //  isAuthenticated: () => {
    //      const token = Cookies.get('token');
    //      return !!token; 
    //    },
    //Create product fetch
    createProduct: async (newProduct) => {
        //  const token = Cookies.get('token');
        //  console.log(token)
        if (!newProduct.name || !newProduct.image || !newProduct.price) {
            return { success: false, message: "Please fill in all fields." };
        }

        const res = await fetch("/api/product", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                // "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(newProduct)
        })

        const data = await res.json()
        console.log("data", data)
        //console.log(data.success)
        set((state) => ({ products: [...state.products, data.data] }))
        return { success: data.success, message: data.message }

    },

    getProduct: async () => {
        const res = await fetch("/api/product")
        //console.log("GetProducts res:",res)
        const data = await res.json()
        console.log("GetProducts Data:", data.data)

        set({ products: data.data })
    },

    //delete Products
    deleteProduct: async (pid) => {
        const res = await fetch(`/api/product/${pid}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })
        const data = await res.json()
        
        if (!data.success) {
            return { success: data.success, message: data.message }
        }
        set((state) => ({ products: state.products.filter((product) => product._id !== pid) }))
        return { success: true, message: "Product deleted successfully!" }

    },


    // update products
    updateProduct: async (pid, updatedProduct) => {
        const res = await fetch(`/api/product/${pid}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",

            },
            body: JSON.stringify(updatedProduct)
        })
        const data = await res.json()
        if(!data.success){
            return {success : false, message : data.message}
        }
        set((state) => ({products : state.products.map((product) => product._id === pid ? data.data : product)}))

        return { success: true, message: data.message };
    }
    
}))



