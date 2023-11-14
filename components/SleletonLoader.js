import { Center, Skeleton, VStack } from 'native-base';
import React from 'react';
import { View } from 'react-native';

// import { Container } from './styles';

const SkeletonLoader = () => {
  return (
    <>
    <Center w="100%" mt='5'>
      <VStack w="80%" maxW="400" h='320' borderWidth="1" space={5} overflow="hidden" rounded="lg" _dark={{
      borderColor: "coolGray.500"
    }} _light={{
      borderColor: "coolGray.200"
    }}>
        <Skeleton h="40" />
        <Skeleton.Text px="6" />
        <Skeleton px="4" rounded="lg" startColor="red.200" 
        
        />
      </VStack>
    </Center>
    <Center w="100%" mt='5'>
      <VStack w="80%" maxW="400" h='320' borderWidth="1" space={5} overflow="hidden" rounded="lg" _dark={{
      borderColor: "coolGray.500"
    }} _light={{
      borderColor: "coolGray.200"
    }}>
        <Skeleton h="40" />
        <Skeleton.Text px="6" />
        <Skeleton px="4" rounded="lg" startColor="red.200" 
        
        />
      </VStack>
    </Center>
    <Center w="100%" mt='5'>
      <VStack w="80%" maxW="400" h='320' borderWidth="1" space={5} overflow="hidden" rounded="lg" _dark={{
      borderColor: "coolGray.500"
    }} _light={{
      borderColor: "coolGray.200"
    }}>
        <Skeleton h="40" />
        <Skeleton.Text px="6" />
        <Skeleton px="4" rounded="lg" startColor="red.200" 
        
        />
      </VStack>
    </Center>
    <Center w="100%" mt='5'>
      <VStack w="80%" maxW="400" h='320' borderWidth="1" space={5} overflow="hidden" rounded="lg" _dark={{
      borderColor: "coolGray.500"
    }} _light={{
      borderColor: "coolGray.200"
    }}>
        <Skeleton h="40" />
        <Skeleton.Text px="6" />
        <Skeleton px="4" rounded="lg" startColor="red.200" 
        
        />
      </VStack>
    </Center>
    </>

  )
}

export default SkeletonLoader;