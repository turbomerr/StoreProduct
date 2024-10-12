import React from 'react'
import { Container, Flex, Text, HStack, Button, useColorMode, } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { FiPlusSquare } from "react-icons/fi";

const Navbar = () => {

    const { colorMode, toggleColorMode } = useColorMode()

    return (
        <Container maxW={"1140px"} px={"4"} >
            <Flex h={"16"} alignItems={"center"} justifyContent={"space-between"} flexDir={{ base: "column", sm: "row" }}>
                <Text fontSize={{ base: "22", sm: "28" }}
                    fontWeight={"bold"}
                    textTransform={'uppercase'}
                    textAlign={"center"}
                    bgGradient={"linear(to-r, green.700, green.300)"}
                    bgClip={"text"}>
                    <Link to={"/"}>Product Store 🛒</Link>
                </Text>
                <HStack spacing={"2"} alignItems={"center"}>
                    <Link to={"/create"}>
                        <Button>{<FiPlusSquare fontSize={"20"} />}</Button>
                    </Link>

                    <Button onClick={toggleColorMode}>{colorMode === "light" ? "🌙" : "☀️"}</Button>

                </HStack>

            </Flex>
        </Container>
    )
}

export default Navbar