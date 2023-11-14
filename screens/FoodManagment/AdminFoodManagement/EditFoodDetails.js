import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import {
    useToast, Box, Heading, View, FormControl, AspectRatio, Image, Text, Center, HStack, Stack, NativeBaseProvider, Button, Icon, Input, WarningOutlineIcon, Divider, VStack, IconButton, CloseIcon, Spinner, PresenceTransition, Skeleton, Pressable, AlertDialog, Badge,
} from "native-base";
import React, { useEffect, useState } from "react";
import AlertBox from "../../../components/AlertBox";
import { TextInput } from 'react-native';

const FoodUpdateScreen = ({ navigation, route }) => {

    const { id } = route.params;

    const [foodName, setFoodName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [foodImage, setFoodImage] = useState("");

    const toast = useToast();

    const [errorPrice, setErrorPrice] = useState(false);
    const [errorDescription, setErrorDescription] = useState(false);
    const [errorFoodImage, setErrorFoodImage] = useState(false);
    const [errorFoodname, setErrorFoodName] = useState(false);

    //setform data
    useEffect(() => {
        axios.get(`food/${id}`).then((res) => {
            setFoodName(res.data.foodName);
            setDescription(res.data.description);
            setPrice(res.data.price);
            setFoodImage(res.data.foodImage);
        });
    }, []);

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
    const UpdateFood = async () => {

        try {
            if (price === "") {
                setErrorPrice("is a requeired field");
            } if (description === "") {
                setErrorDescription("is a requeired field");
            } if (foodImage === "") {
                setErrorFoodImage("is a requeired field");
            } if (foodName === "") {
                setErrorFoodName("is a requeired field");
            } if (price && description && foodName && foodImage) {
                const res = await axios.put(`food/${id}`, {
                    price,
                    foodName,
                    description,
                    foodImage,
                });
                console.log(res.data);

                toast.show({
                    placement: "top",

                    render: () => (
                        <AlertBox
                            status="success"
                            title="Food Details Update"
                            description="Food Details Update Successfull !!!"
                        />
                    ),
                });
                navigation.navigate("Admin Food List");
            }
        } catch (error) {
            console.log(error);
        }

    };

    return (
        <Stack space={4} w="95%" maxW="350px" mx="auto" minH={"90%"} mt={3}>
            <Heading>{'Update Food Item Details'}</Heading>
            <AspectRatio w="100%" ratio={16 / 9}>
                <Image
                    source={{
                        uri: 'https://media.istockphoto.com/id/1198111486/vector/software-update-loading-process-upgrade-concept-vector-illustration-in-flat-style-upgrade.jpg?s=612x612&w=0&k=20&c=mq3Se_ogFGTCF9Xhawp7rzdgjY9c0jHUpyFhfpOK7Zg=',
                    }}
                    alt="image"
                />
            </AspectRatio>


            <View>

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
                    placeholder="Dood Image"
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
                    onPress={() => UpdateFood()}
                >
                    Update Food Details
                </Button>
            </View>
        </Stack>
    );
};

export default FoodUpdateScreen;
