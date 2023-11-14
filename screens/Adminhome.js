import {
    Button,
    FormControl,
    Icon,
    Input,
    useToast,
    Stack,
    WarningOutlineIcon,
    Heading,
    HStack,
  } from "native-base";
  import React, { useState } from "react";
  import { View, Text } from "react-native";
  import axios from "axios";
  import { Ionicons } from "@expo/vector-icons";
  

const Adminhome = ({navigation}) => {
    return (
        <Stack space={4} w="75%" maxW="300px" mx="auto" mt={3}>
        <Heading>Admin Dashboard</Heading>
  
        
  

  
 
  
        <Button colorScheme="orange" size="sm" 
        
        onPress={() => navigation.navigate('Table List')}
      > Table List 
      </Button>
      <Button colorScheme="orange" size="sm" 
        
        onPress={() => navigation.navigate('AllBookings')}
      > All Bookings
      </Button>

      <Button colorScheme="orange" size="sm" 
        
        onPress={() => navigation.navigate('AllUserInquiry Screen')}
      > User Inquiries
      </Button>
      <Button colorScheme="orange" size="sm" 
        
        onPress={() => navigation.navigate('Admin Food List')}
      >  Food List
      </Button>

      <Button colorScheme="orange" size="sm" 
        
        onPress={() => navigation.navigate('All Food Orders')}
      >  All Food Orders
      </Button>
      <Button colorScheme="orange" size="sm" 
        
        onPress={() => navigation.navigate('login')}
      >  Logout
      </Button>
        
      </Stack>
    );
}


export default Adminhome;
