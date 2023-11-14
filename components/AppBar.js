
import React from 'react';
import { VStack, HStack, Button, IconButton, Icon, Text, NativeBaseProvider, Center, StatusBar, Box } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";

// import { Container } from './styles';

const AppBar = (props) => {

   const {name} = props

  return <NativeBaseProvider>
 
    
      <StatusBar bg="#3700B3" barStyle="light-content" />
      <Box safeAreaTop bg="violet.600" />
      <HStack bg="violet.800" px="1" py="3" justifyContent="space-between" alignItems="center" w="100%">
        <HStack alignItems="center">
          <IconButton icon={<Icon size="sm" as={MaterialIcons} name="menu" color="white" />} />
          <Text color="white" fontSize="20" fontWeight="bold">
           {name}
          </Text>
        </HStack>
        <HStack>
          <IconButton icon={<Icon as={MaterialIcons} name="favorite" size="sm" color="white" />} />
          <IconButton icon={<Icon as={MaterialIcons} name="search" size="sm" color="white" />} />
          <IconButton icon={<Icon as={MaterialIcons} name="more-vert" size="sm" color="white" />} />
        </HStack>
      </HStack>
    

 

</NativeBaseProvider>
}

export default AppBar;