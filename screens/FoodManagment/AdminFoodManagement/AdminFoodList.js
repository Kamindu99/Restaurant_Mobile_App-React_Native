import React, { useEffect, useState } from "react";
import { Alert, ScrollView, StyleSheet, RefreshControl } from "react-native";
import {
    Box, Heading, View, FormControl, AspectRatio, Image, Text, Center, HStack, Stack, NativeBaseProvider, Button, Icon, Input,
    WarningOutlineIcon, Fab, Divider, VStack, IconButton, useToast, CloseIcon, Spinner, PresenceTransition, Skeleton, Pressable, AlertDialog, Badge
} from "native-base";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import SkeletonLoader from "../../../components/SleletonLoader";
import { useIsFocused } from "@react-navigation/native";
import AlertBox from "../../../components/AlertBox";
import { AntDesign } from "@expo/vector-icons";

const FoodData = (props) => {
    const { food, navigation, setFoods } = props;
    const [isOpen, setIsOpen] = React.useState(false);
    const onClose = () => setIsOpen(false);
    const cancelRef = React.useRef(null);
    const [isDeletOpen, setIsDeletOpen] = React.useState(false);
    const onDeleteClose = () => setIsDeletOpen(false);
    const toast = useToast();

    //delete method
    const DeleteFoodItemById = async (id) => {
        try {
            const res = await axios.delete(`food/${id}`)
            console.log(res.data);

            toast.show({
                placement: "top",

                render: () => (
                    <AlertBox
                        status="success"
                        title="Delete Success"
                        description="Delete Successfully !!!"
                    />
                ),
            });

            await axios.get("food/").then((res) => {
                setFoods(res.data);
            });

        } catch (error) {
            console.log(error);
        }
    };


    return (
        <Box alignItems="center" style={styles.aaaaa}>
            <Box style={{ marginRight: "5%", marginLeft: "5%", marginBottom: "5%", backgroundColor: "#e3e3e3" }} rounded="lg"
                overflow="hidden" borderColor="coolGray.200" borderWidth="1" _dark={{
                    borderColor: "coolGray.600",
                    backgroundColor: "gray.700",
                }} _web={{ shadow: 2, borderWidth: 0, }} _light={{ backgroundColor: "gray.50", }}>
                <Box>
                    <AspectRatio w="100%" ratio={16 / 9}>
                        <Image
                            source={{
                                uri: food.foodImage,
                            }}
                            alt="image"
                        />
                    </AspectRatio>

                    <Center bg="violet.500" _dark={{ bg: "violet.400", }} _text={{
                        color: "warmGray.50", fontWeight: "700",
                        fontSize: "md",
                    }} position="absolute" bottom="0" right='0' px="3" py="1.5" roundedTopLeft="lg" >
                        {"Rs." + food.price}
                    </Center>

                </Box>
                <Stack p="4" space={3}>
                    <Stack space={2}>
                        <Heading size="md" ml="-1">
                            {food.foodName}
                        </Heading>
                        <Text fontSize="lg" _light={{ color: "violet.500", }} _dark={{ color: "violet.400", }}
                            fontWeight="500" ml="-0.5" mt="-1" >
                            Rs.{food.price}
                        </Text>
                    </Stack>
                    <Text fontWeight="400">{food.description}</Text>
                    <Center>
                        <Button.Group space={2}>
                            <Button
                                variant="solid"
                                colorScheme="blue"
                                onPress={() => setIsOpen(!isOpen)}
                                startIcon={
                                    <Icon as={Ionicons} name="cart-sharp" size="sm" />
                                }
                            >
                                View
                            </Button>

                            <AlertDialog
                                leastDestructiveRef={cancelRef}
                                isOpen={isOpen}
                                onClose={onClose}
                            >
                                <AlertDialog.Content>
                                    <AlertDialog.CloseButton />
                                    <AlertDialog.Header>
                                        <Heading size="md">{`${food.foodName}`}</Heading>
                                        {/* {`${table.name} Table`} */}
                                    </AlertDialog.Header>
                                    <AlertDialog.Body>
                                        <AspectRatio
                                            w="100%"
                                            ratio={16 / 9}
                                            rounded="lg"
                                            overflow="hidden"
                                        >
                                            <Image
                                                source={{
                                                    uri: food.foodImage,
                                                }}
                                                alt="image"
                                            />
                                        </AspectRatio>
                                        <Text
                                            fontWeight="400"
                                            mt={2}
                                            mb={2}
                                            fontSize="sm"
                                            color="coolGray.800"
                                        >
                                            {food.description}
                                        </Text>

                                    </AlertDialog.Body>
                                    <AlertDialog.Footer>
                                        <Button.Group space={2}>

                                            <Button
                                                variant="solid"
                                                colorScheme="red"
                                                onPress={onClose}
                                                ref={cancelRef}

                                            >
                                                Back
                                            </Button>
                                        </Button.Group>
                                    </AlertDialog.Footer>
                                </AlertDialog.Content>
                            </AlertDialog>


                            <Button
                                variant="solid"
                                colorScheme="yellow"
                                onPress={() =>
                                    navigation.navigate("Food Details Update", {
                                        id: food._id
                                    })
                                }
                                startIcon={
                                    <Icon as={Ionicons} name="cart-sharp" size="sm" />
                                }
                            >
                                Update
                            </Button>
                            <Button
                                variant="solid"
                                colorScheme="red"
                                onPress={() => setIsDeletOpen(!isOpen)}
                                startIcon={
                                    <Icon as={Ionicons} name="cart-sharp" size="sm" />
                                }
                            >
                                Delete
                            </Button>
                        </Button.Group>

                        {isDeletOpen && (
                            <AlertDialog
                                leastDestructiveRef={cancelRef}
                                isOpen={isDeletOpen}
                                onClose={onDeleteClose}
                            >
                                <AlertDialog.Content>
                                    <AlertDialog.CloseButton />
                                    <AlertDialog.Header>
                                        <Heading size="md">{`Delete Food?`}</Heading>
                                    </AlertDialog.Header>
                                    <AlertDialog.Body>
                                        <Text
                                            fontWeight="400"
                                            mt={2}
                                            mb={2}
                                            fontSize="sm"
                                            color="coolGray.800"
                                        >
                                            Are you sure you want to Delete Food?
                                        </Text>
                                    </AlertDialog.Body>
                                    <AlertDialog.Footer>
                                        <Button.Group space={2}>
                                            <Button
                                                variant="solid"
                                                colorScheme="coolGray"
                                                onPress={onDeleteClose}
                                                ref={cancelRef}
                                            >
                                                No
                                            </Button>
                                            <Button
                                                variant="solid"
                                                colorScheme="red"
                                                startIcon={
                                                    <Icon
                                                        as={Ionicons}
                                                        name="trash-outline"
                                                        size="sm"
                                                    />
                                                }
                                                onPress={() => DeleteFoodItemById(food._id)}
                                            >
                                                Delete
                                            </Button>
                                        </Button.Group>
                                    </AlertDialog.Footer>
                                </AlertDialog.Content>
                            </AlertDialog>
                        )}

                    </Center>

                </Stack>
            </Box>
        </Box>
    );
};

const AdminFoodList = ({ navigation }) => {
    const [foods, setFoods] = useState();
    const [searchkey, setsearchkey] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [notab, setNotab] = useState(false);
    const [refreshing, setRefreshing] = React.useState(false);
    const [filterLoaded, setFilterLoaded] = useState(false);
    const isFocused = useIsFocused();

    useEffect(() => {
        if (isFocused) {
            onRefresh();
        }
    }, [isFocused]);

    const onRefresh = React.useCallback(() => {

        if (filterLoaded) {
            setFilterLoaded(false);
        }
        setsearchkey("");

        setIsLoading(true);
        try {
            axios.get("food/").then((res) => {
                setFoods(res.data);
                setNotab(false);
                setIsLoading(false);
            });
        } catch (error) {
            console.log(error);
        }
    }, []);

    useEffect(() => {
        setIsLoading(true);
        try {
            axios.get("food/").then((res) => {
                setFoods(res.data);
                setNotab(false);
                setIsLoading(false);
            });
        } catch (error) {
            console.log(error);
        }
    }, [notab]);

    const filterPackages = (searchkey) => {
        try {
            setIsLoading(true);
            console.log(searchkey);

            axios.get("food/").then((response) => {

                const filteredPackages = response.data.filter((foods) =>
                    foods.foodName.toLowerCase().includes(searchkey.toLowerCase())
                );

                if (filteredPackages.length > 0) {
                    setFilterLoaded(true);
                    setFoods(filteredPackages);
                    setIsLoading(false);
                } else {
                    setIsLoading(true);
                    setTimeout(() => {
                        setIsLoading(false);
                    }, 300);
                    setsearchkey("");
                    setNotab(true);

                    setTimeout(() => {
                        setNotab(false);
                    }, 3000);
                }
            });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <NativeBaseProvider>
            <View flexDirection="row" alignItems="center" margin={2}>
                <Input
                    placeholder="Search Foods"
                    // value={searchText}
                    // onChangeText={setSearchText}
                    value={searchkey}
                    onChangeText={(newText) => setsearchkey(newText)}
                    flex={1}
                    margin={2}
                    rounded="full"
                />

                {filterLoaded ? (
                    <Button
                        variant="solid"
                        colorScheme="red"
                        size={"lg"}
                        rounded="full"
                        startIcon={<Icon as={Ionicons} name="close" size="sm" />}
                        onPress={() => onRefresh()}
                    ></Button>
                ) : (
                    <Button
                        variant="solid"
                        colorScheme="red"
                        size={"lg"}
                        rounded="full"
                        startIcon={<Icon as={Ionicons} name="search-outline" size="sm" />}
                        onPress={() => filterPackages(searchkey)}
                    ></Button>
                )}
            </View>

            {isLoading ? (
                ""
            ) : (
                <Box>
                    {notab && (
                        <PresenceTransition visible={notab} initial={{ opacity: 0, }}
                            animate={{ opacity: 1, transition: { duration: 500, }, }}
                            exit={{ opacity: 0, transition: { duration: 550 }, }} >

                            <Box alignSelf="center" px="3" py="2" width={500} _text={{
                                alignSelf: "center", fontSize: "md", fontWeight: "medium",
                                color: "warmGray.50", letterSpacing: "lg"
                            }} bg={["red.400", "blue.400"]} >
                                Search Not Found
                            </Box>
                        </PresenceTransition>
                    )}{" "}
                </Box>
            )}

            {isLoading ? (

                <ScrollView
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }
                >
                    <SkeletonLoader />
                </ScrollView>
            ) : (
                <ScrollView
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }
                >
                    <PresenceTransition
                        visible={!isLoading}
                        initial={{
                            opacity: 0,
                        }}
                        animate={{
                            opacity: 1,
                            transition: {
                                duration: 500,
                            }
                        }}
                    >

                        {foods &&
                            foods.map((food, index) => (
                                <FoodData
                                    food={food}
                                    setFoods={setFoods}
                                    key={index}
                                    navigation={navigation}
                                />
                            ))}

                    </PresenceTransition>
                    <Pressable>
                <Box position="relative" h={100} w="100%">
                    <Fab
                        position="absolute"
                        size="lg"
                        icon={
                            <Icon
                                color="white"
                                as={<AntDesign name="plus" />}
                                size="lg"
                            />
                        }
                        onPress={() => navigation.navigate("Add New Food")}
                    />
                </Box>
            </Pressable>
                </ScrollView>
            )}
        </NativeBaseProvider>
    );
};

export default AdminFoodList;

const styles = StyleSheet.create({
    aaaaa: {
        boxShadow: "1px 1px 1px 1px #ccc",
        border: "1px solid red",
        marginTop: 5,
        marginBottom: 5,
    },
});
