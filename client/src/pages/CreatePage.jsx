import { Container, VStack, Box,Button, useColorModeValue, Input, Heading, useToast } from '@chakra-ui/react'
import React from 'react'
import { useState } from 'react'
import {useProductStore} from "../store/product.js"

const CreatePage = () => {

    const [newProduct, setNewProduct] = useState({
        name : "",
        price : "",
        image : ""
    })
    const {createProduct} = useProductStore()
    const toast = useToast()

    const handleAddProduct = async() => {
        const {success, message} = await createProduct(newProduct)
        if(!success){
            toast({
                title : "Error",
                description : message,
                status : "error",
                duration : 3000,
                isClosable : true,
                position :"top-right"
            })
        }else{
            toast({
                title : "Success",
                description : message,
                status : "success",
                duration : 3000,
                isClosable : true,
                position :"top-right"
            })
        }
        setNewProduct({
            name : "", 
            price : "",
            image : ""

        })
        //console.log(newProduct)
       
        
    }

  return (
    <Container maxW={"container.sm"}>
        <VStack spacing={8}>
            <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
                Create New Product
            </Heading>
            <Box w={"full"} bg={useColorModeValue("green.400", "green.600")} p={6} rounded={"lg"} shadow={"md"}>
                <VStack spacing={4}>
                    <Input placeholder='Product Name' name='name' value={newProduct.name} onChange={e => (setNewProduct({...newProduct, name : e.target.value}))}  />
                    <Input placeholder='Price' name='price' value={newProduct.price} onChange={e => (setNewProduct({...newProduct, price : e.target.value}))}  />
                    <Input placeholder='Image Url' name='image' value={newProduct.image} onChange={e => (setNewProduct({...newProduct, image : e.target.value}))}  />
                    <Button w={"full"} colorScheme='green' onClick={handleAddProduct} >Create</Button>

                </VStack>
            </Box>
        </VStack>

    </Container>
  )
}

export default CreatePage