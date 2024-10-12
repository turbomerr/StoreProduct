import React from 'react'
import {
  Box,
  Button,
  Heading,
  HStack,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useColorModeValue,
  useDisclosure,
  useToast,
  VStack,
} from '@chakra-ui/react'
import { useProductStore } from "../store/product.js"
import { useState } from 'react'
import { MdDelete } from "react-icons/md";
import { IoPencil } from "react-icons/io5";

const ProductCard = ({ product }) => {

  const textColor = useColorModeValue("gray.600", "gray.200");
  const bg = useColorModeValue("white", "gray.800");

  const [updatedProduct, setUpdatedProduct] = useState(product)
  const { deleteProduct, updateProduct } = useProductStore()

  const { isOpen, onOpen, onClose } = useDisclosure();

  const toast = useToast(); // for notification 


  const handleDeleteProduct = async (pid) => {
    const { success, message } = await deleteProduct(pid)

    if (!success) {
      toast({
        title: "Error",
        description: message,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right"
      })
    } else {
      toast({
        title: "Success",
        description: message,
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top-right"
      })
    }
  }

  const handleUpdateProduct = async(pid, updatedProduct) => {
    const {success, message} = await updateProduct(pid, updatedProduct)
    onClose();

    if (!success) {
      toast({
        title: "Error",
        description: message,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right"
      })
    } else {
      toast({
        title: "Success",
        description: message,
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top-right"
      })
    }
  }

  return (
    <Box shadow={"xl"} rounded={"lg"} overflow={"hidden"} transition={"all 0.3s"} _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
      bg={bg}>
      <Image src={product.image} alt={product.name} h={64} w='full' objectFit='cover' />
      <Box p={6}>
        <Heading as='h3' size='md' mb={2}>{product.name}</Heading>
        <Text fontWeight='bold' fontSize='xl' color={textColor} mb={4}>
          {product.price}$
        </Text>

        <HStack spacing={3}>
          <Box bg={"blue.400"} p={3} borderRadius={10}>
            <IoPencil color='white' onClick={onOpen} />
          </Box>
          <Box bg={"red.400"} p={3} borderRadius={10}>
            <MdDelete color='white' onClick={() => handleDeleteProduct(product._id)} />
          </Box>
        </HStack>

      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={2}>
              <Input placeholder='Name'  name='name' onChange={(e) => (setUpdatedProduct({ ...updatedProduct, name: e.target.value }))} />
              <Input placeholder='Price'  name='price' type='number' onChange={(e) => (setUpdatedProduct({ ...updatedProduct, price: e.target.value }))} />
              <Input placeholder='Image'  name='image' onChange={(e) => (setUpdatedProduct({ ...updatedProduct, image: e.target.value }))} />
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="gray" mr={3} onClick={() => (handleUpdateProduct(product._id, updatedProduct))}>
              Update
            </Button>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>

      </Modal>
    </Box>
  )
}

export default ProductCard