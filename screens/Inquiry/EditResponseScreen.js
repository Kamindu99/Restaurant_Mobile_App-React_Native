import axios from "axios";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import {
  View,
  HStack,
  VStack,
  Input,
  Button,
  Icon,
  NativeBaseProvider,
  useToast,
} from "native-base";

import AlertBox from "../../components/AlertBox";

const EditResponseScreen = ({ navigation, route }) => {
  const id = route.params.id;

  const [adreply, setAdreply] = useState("");
  
  const toast = useToast();

  useEffect(() => {
    axios.get(`inquiry/${id}`).then((res) => {
      console.log(res.data);
      setAdreply(res.data.adreply);
    });
  }, []);

  const editResponse = async (id) => {
    try {
      const updatedResponse = {
        adreply: adreply,
      };
      await axios.put(`inquiry/${id}`, updatedResponse).then((res) => {
        console.log(res.updatedResponse);
      });
      console.log(updatedResponse);
      toast.show({
        placement: "top",
        render: () => (
          <AlertBox
            title="Response Updated Successfully"
            description="Your response has been updated successfully"
            status="success"
          />
        ),
      });

      await axios.get("inquiry/");

      navigation.navigate("AllUserInquiry Screen");
    } catch (error) {
      console.log(error);
    }
  };

  const reset = () => {
    setAdreply("");
  };

  return (
    <NativeBaseProvider>
      <VStack space={4} w="75%" maxW="300px" mx="auto" mt={10}>
        <Input
          fontSize={15}
          variant="outline"
          placeholder="outline"
          onChangeText={(e) => setAdreply(e)}
          value={adreply}
        />

        <HStack space={7} mt={3}>
          <Button
            w={135}
            variant="solid"
            colorScheme="green"
            startIcon={<Icon as={Ionicons} name="pencil-outline" size="sm" />}
            onPress={() => editResponse(id)}
          >
            Edit Response
          </Button>
          <Button
            w={135}
            variant="solid"
            colorScheme="red"
            startIcon={<Icon as={Ionicons} name="close-outline" size="sm" />}
            onPress={reset}
          >
            Reset Response
          </Button>
        </HStack>
      </VStack>
    </NativeBaseProvider>
  );
};

export default EditResponseScreen;
