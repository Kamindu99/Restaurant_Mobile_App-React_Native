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
import AlertBox from "../../../components/AlertBox";

// import { Container } from './styles';

const AddTable = ({ navigation }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [users, setUsers] = useState("");
  const [image, setImage] = useState("");

  const [errorName, setErrorName] = useState(false);
  const [errorDescription, setErrorDescription] = useState(false);
  const [errorUsers, setErrorUsers] = useState(false);
  const [errorImage, setErrorImage] = useState(false);

  const toast = useToast();

  const handleNameChange = (value) => {
    console.log(value); // This will log the value that the user typed
    setErrorName(false);
    setName(value);
  };
  const handleDescriptionChange = (value) => {
    console.log(value); // This will log the value that the user typed
    setErrorDescription(false);
    setDescription(value);
  };
  const handleUsersChange = (value) => {
    console.log(value); // This will log the value that the user typed
    setErrorUsers(false);
    setUsers(value);
  };
  const handleImageChange = (value) => {
    console.log(value); // This will log the value that the user typed
    setErrorImage(false);
    setImage(value);
  };

  const addTable = async (props) => {
    try {
      let hasError = false;
      if (name === "") {
        setErrorName("Please Enter a Table Type Name");
         hasError = true;
      }
      if (description === "") {
        setErrorDescription("Please Enter a Table Description");
          hasError = true;
      }
      if (users === "") {
        setErrorUsers("Please Enter a Table User Amount");
          hasError = true;
      }
      if (image === "") {
        setErrorImage("Please Enter a Image URL");
          hasError = true;
      }
      
     
      if (!hasError) {
        const data = {
          name,
          description,
          users,
          image,
        };
        await axios
          // .post("http://192.168.8.113:5000/table/add", data)
          .post("table/add", data)
          .then((res) => {
            console.log(res.data);
          });
        console.log(data);
        await axios.get("table/");

        toast.show({
          placement: "top",
          render: () => {
            return (
              <AlertBox
                title="Table Added"
                description="A New Table Type has been added successfully"
                status="success"
              />
            );
          },
        });

        //   await axios.get('http://192.168.8.113:5000/inquiry/')

        navigation.navigate("Table List", { newItem: data });
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Stack space={4} w="75%" maxW="300px" mx="auto" mt={3}>
      <Heading>Add New Table Type</Heading>

      <View>

<Text style={{ fontSize: 15, fontWeight: "bold" }}>Table Type Name</Text>

<Input
  variant="outline"
  placeholder="Table Type Name"
  value={name}
  size="lg"
  mt={2}
  mb={1}
  onChangeText={handleNameChange}
  
/>
{errorName && (
  <View mt={2}>
    <HStack 
    >
  <Text style={{ color: "red" }}>
    Please Enter a Table Type {" "}
  </Text>
  <Icon
      style={{ color: "red" }}
      as={Ionicons}
      name="alert-circle-outline"
      size="sm"
    />
    </HStack>
</View>
)}
</View>



<View>

<Text style={{ fontSize: 15, fontWeight: "bold" }}>Detailed Description</Text>

<Input
  variant="outline"
  placeholder="Description"
  value={description}
  size="lg"
  mt={2}
  mb={1}
  onChangeText={handleDescriptionChange}
  
/>
{errorDescription && (
  <View mt={2}>
    <HStack 
    >
  <Text style={{ color: "red" }}>
    Please Enter a Description {" "}
  </Text>
  <Icon
      style={{ color: "red" }}
      as={Ionicons}
      name="alert-circle-outline"
      size="sm"
    />
    </HStack>
</View>
)}
</View>

      



<View>

<Text style={{ fontSize: 15, fontWeight: "bold" }}>User Limit at a Time</Text>

<Input
  variant="outline"
  placeholder="User Limit"
  value={users}
  size="lg"
  mt={2}
  mb={1}
  onChangeText={handleUsersChange}
  keyboardType="numeric"
  
/>
{errorUsers && (
  <View mt={2}>
    <HStack 
    >
  <Text style={{ color: "red" }}>
    Please Enter Users Limit {" "}
  </Text>
  <Icon
      style={{ color: "red" }}
      as={Ionicons}
      name="alert-circle-outline"
      size="sm"
    />
    </HStack>
</View>
)}
</View>



<View>

<Text style={{ fontSize: 15, fontWeight: "bold" }}>Image URL</Text>

<Input
  variant="outline"
  placeholder="Image URL"
  value={image}
  size="lg"
  mt={2}
  mb={1}
  onChangeText={handleImageChange}
  
/>
{errorImage && (
  <View mt={2}>
    <HStack 
    >
  <Text style={{ color: "red" }}>
    Please Enter an Image URL {" "}
  </Text>
  <Icon
      style={{ color: "red" }}
      as={Ionicons}
      name="alert-circle-outline"
      size="sm"
    />
    </HStack>
</View>
)}
</View>

      <Button colorScheme="orange" size="sm" onPress={() => addTable()}>
        Add Table
      </Button>
    </Stack>
  );
};

export default AddTable;
