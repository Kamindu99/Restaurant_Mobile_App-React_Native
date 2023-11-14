import { Alert, HStack, Text, VStack } from 'native-base';
import React from 'react';
import { View } from 'react-native';

// import { Container } from './styles';

const AlertBox = ({status,title, description}) => {
    // const {status,title, description} = props 

  return (
   
    <Alert  maxWidth="95%" status={status} alignSelf="center" flexDirection="row" variant='left-accent'>
    <VStack space={1} flexShrink={1} w="100%">
      <HStack flexShrink={1} alignItems="center" justifyContent="space-between">
        <HStack space={2} flexShrink={1} alignItems="center">
          <Alert.Icon />
          <Text fontSize="lg" fontWeight="bold" flexShrink={1}>
           {/* { 'Table Reservation Successfull'} */}
           {title}
          </Text>
        </HStack>
      
      </HStack>
      <Text px="6" >
        {/* {'You have successfully completed the reservation & See you at the restaurant !'} */}
        {description}
      </Text>
    </VStack>
  </Alert>
   
  )

}

export default AlertBox;