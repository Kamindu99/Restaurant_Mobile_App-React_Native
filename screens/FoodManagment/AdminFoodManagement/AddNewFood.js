import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import {
    useToast, Box, Heading, View, FormControl, AspectRatio, Image, Text, Center, HStack, Stack, NativeBaseProvider, Button, Icon, Input, WarningOutlineIcon, Divider, VStack, IconButton, CloseIcon, Spinner, PresenceTransition, Skeleton, Pressable, AlertDialog, Badge,
} from "native-base";
import React, { useEffect, useState } from "react";
import AlertBox from "../../../components/AlertBox";
import { TextInput } from 'react-native';

const FoodAddScreen = ({ navigation, route }) => {

    const [foodName, setFoodName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [foodImage, setFoodImage] = useState("");

    const toast = useToast();

    const [errorPrice, setErrorPrice] = useState(false);
    const [errorDescription, setErrorDescription] = useState(false);
    const [errorFoodImage, setErrorFoodImage] = useState(false);
    const [errorFoodname, setErrorFoodName] = useState(false);

    //Handle Inputs
    const handlePriceChange = (value) => {
        setErrorPrice(false);
        setPrice(value);
    };
    const handleDescrptionChange = (value) => {
        setErrorDescription(false);
        setDescription(value);
    };
    const handleFoodImageChange = (value) => {
        setErrorFoodImage(false);
        setFoodImage(value);
    };
    const handleFoodNameChange = (value) => {
        setErrorFoodName(false);
        setFoodName(value);
    };

    //On Submit
    const AddFood = () => {

        if (price === "") {
            setErrorPrice("is a requeired field");
        } if (description === "") {
            setErrorDescription("is a requeired field");
        } if (foodImage === "") {
            setErrorFoodImage("is a requeired field");
        } if (foodName === "") {
            setErrorFoodName("is a requeired field");
        } else {
            const data = {
                price,
                foodName,
                description,
                foodImage,
            };
            console.log(data);
            axios.post("food/add", data).then((res) => {
                console.log(res.data);
            });
            toast.show({
                placement: "top",

                render: () => (
                    <AlertBox
                        status="success"
                        title="Food Add Success"
                        description="New Food Add Success !!!"
                    />
                ),
            });
            navigation.navigate("Admin Food List");
        }

    };

    return (
        <Stack space={4} w="95%" maxW="350px" mx="auto" minH={"90%"} mt={3}>
            <Heading>{'Add New Food Item'}</Heading>
            <AspectRatio w="100%" ratio={16 / 9}>
                <Image
                    source={{
                        uri: 'https://www.eatthis.com/wp-content/uploads/sites/4/2022/06/fast-food-assortment-soda.jpg?quality=82&strip=1',
                    }}
                    alt="image"
                />
            </AspectRatio>


            <View style={{ marginTop: '2%' }}>

                <Text style={{ fontSize: 15, fontWeight: "bold" }}>Food Name</Text>

                <Input
                    variant="outline"
                    placeholder="Fiid Name"
                    value={foodName}
                    size="lg"
                    mt={2}
                    onChangeText={handleFoodNameChange}
                    keyboardType="default"
                />
                {errorFoodname && (
                    <View mt={2}>
                        <HStack
                        >
                            <Text style={{ color: "red" }}>
                                is a requeired field{" "}
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

                <Text style={{ fontSize: 15, fontWeight: "bold" }}>Price</Text>

                <Input
                    variant="outline"
                    placeholder="Price"
                    value={price}
                    isRequired={true}
                    size="lg"
                    mt={2}
                    onChangeText={handlePriceChange}
                    keyboardType="default"
                />
                {errorPrice && (
                    <View mt={2}>
                        <HStack
                        >
                            <Text style={{ color: "red" }}>
                                is a requeired field{" "}
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

                <Text style={{ fontSize: 15, fontWeight: "bold" }}>Description</Text>

                <Input
                    variant="outline"
                    placeholder="Description"
                    value={description}
                    size="lg"
                    mt={2}
                    onChangeText={handleDescrptionChange}
                    keyboardType="default"
                />
                {errorDescription && (
                    <View mt={2}>
                        <HStack
                        >
                            <Text style={{ color: "red" }}>
                                is a requeired field{" "}
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

                <Text style={{ fontSize: 15, fontWeight: "bold" }}>Food Image</Text>

                <Input
                    variant="outline"
                    placeholder="Food Image"
                    value={foodImage}
                    size="lg"
                    mt={2}
                    onChangeText={handleFoodImageChange}
                    keyboardType="default"
                />
                {errorFoodImage && (
                    <View mt={2}>
                        <HStack
                        >
                            <Text style={{ color: "red" }}>
                                is a requeired field{" "}
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

            <View position="absolute"
                bottom="0"
                right='0'
                left='0'>
                <Button
                    colorScheme="orange"
                    size="lg"
                    onPress={() => AddFood()}
                >
                    Add Food
                </Button>
            </View>
        </Stack>
    );
};

export default FoodAddScreen;
