import React from 'react'
import { useProductStore } from "../store/product.js"
import { Heading, Container, VStack, Text, SimpleGrid, Box } from '@chakra-ui/react'
import { useEffect } from 'react'
import { Link } from "react-router-dom"
import ProductCard from "../components/ProductCard"

const HomePage = () => {

    const { getProduct, products } = useProductStore()

    useEffect(() => {
        getProduct()
        
    }, [getProduct])
    

    //console.log("Products", products)

    return (
        <Container maxW={"container.xl"} py={12}>
            <VStack spacing={8}>
                <Text
                    fontSize={"30"}
                    fontWeight={"bold"}
                    bgGradient={"linear(to-r, green.400, green.600)"}
                    bgClip={"text"}
                    textAlign={"center"}
                >
                    Current Products 🔥
                </Text>

                

                <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10} w={"full"}>

                    {products.map((product) => (
                        <ProductCard key={product._id} product={product}/>
                    )) }
                </SimpleGrid>

                 {products.length === 0 && (
                    <Text fontSize={"xl"} textAlign={"center"} fontWeight={"bold"} color={"gray.500"}>
                        No found Product 🥲
                        <Link to={"/create"}>
                            <Text as={"span"} color={"green.500"} _hover={{ textDecoration: "underline" }}>Create a Product</Text>
                        </Link>
                    </Text>
                )} 

            </VStack>
        </Container>
    )

}

export default HomePage