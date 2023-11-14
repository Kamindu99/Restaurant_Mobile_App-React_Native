import React, { useEffect, useState } from "react";
import { Alert, RefreshControl, ScrollView, StyleSheet } from "react-native";
import {
  Box,
  Fab,
  Heading,
  Body,
  View,
  FormControl,
  AspectRatio,
  Image,
  Text,
  Center,
  HStack,
  Stack,
  NativeBaseProvider,
  Button,
  Icon,
  Input,
  WarningOutlineIcon,
  Divider,
  VStack,
  IconButton,
  CloseIcon,
  Spinner,
  PresenceTransition,
  Skeleton,
  Card,
  Pressable,
  AlertDialog,
} from "native-base";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { TouchableOpacity } from "react-native-gesture-handler";
// import AppBar from '../components/AppBar';
import { AntDesign } from "@expo/vector-icons";
import LandscapeLoader from "../../../components/LandscapeLoader";
import { useIsFocused } from "@react-navigation/native";

const GG = (props) => {
  const { table, setTables, navigation } = props;
  const [isOpen, setIsOpen] = React.useState(false);
  const [isDeletOpen, setIsDeletOpen] = React.useState(false);

  const onClose = () => setIsOpen(false);
  const onDeleteClose = () => setIsDeletOpen(false);

  const cancelRef = React.useRef(null);
  const deleteRef = React.useRef(null);

  const deleteTeam = async (id) => {
    try {
      await axios.delete(`table/${id}`).then((res) => {
        // setTeams(res.data)
        console.log(res.data);
      });

      await axios.get("table/").then((res) => {
        // setTeams(res.data)
        setTables(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box alignItems="center" style={styles.aaaaa}>
      <Box
        w={350}
        rounded="lg"
        overflow="hidden"
        borderColor="coolGray.200"
        px={3}
        shadow={0.3}
        borderWidth="1"
        _dark={{
          borderColor: "coolGray.600",
          backgroundColor: "gray.700",
        }}
        _web={{
          shadow: 2,
          borderWidth: 0,
        }}
        _light={{
          backgroundColor: "gray.50",
        }}
      >
        <Stack direction="row" mb="3" mt="3" space={5}>
          <AspectRatio w={"40%"} ratio={4 / 3} rounded="lg" overflow="hidden">
            <Image
              source={{
                uri: table.image,
              }}
              alt="image"
            />
          </AspectRatio>

          <VStack space={5} overflow="hidden">
            {/* <Center w="64" h="5" bg="indigo.300" rounded="md" shadow={3} /> */}
            <Heading size="lg">{table.name}</Heading>

            <HStack space={3} mt={1}>
              <Pressable onPress={() => setIsOpen(!isOpen)}>
                <Center h="12" w="12" bg="green.500" rounded="md">
                  <Icon
                    as={<Ionicons name="eye-outline" />}
                    size="sm"
                    color="white"
                  />
                </Center>
              </Pressable>

              {isOpen && (
                <AlertDialog
                  leastDestructiveRef={cancelRef}
                  isOpen={isOpen}
                  onClose={onClose}
                >
                  <AlertDialog.Content>
                    <AlertDialog.CloseButton />
                    <AlertDialog.Header>
                      <Heading size="md">{`${table.name} Table`}</Heading>
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
                            uri: table.image,
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
                        {table.description}
                      </Text>
                    </AlertDialog.Body>
                    <AlertDialog.Footer>
                      <Button.Group space={2}>
                        <Button
                          onPress={onClose}
                          ref={cancelRef}
                          variant="solid"
                          colorScheme="red"
                        >
                          Close
                        </Button>
                      </Button.Group>
                    </AlertDialog.Footer>
                  </AlertDialog.Content>
                </AlertDialog>
              )}

              <Pressable
                onPress={() =>
                  navigation.navigate("Update Table", {
                    id: table._id,
                  })
                }
              >
                <Center h="12" w="12" bg="yellow.500" rounded="md">
                  <Icon
                    as={<Ionicons name="pencil-outline" />}
                    size="sm"
                    color="white"
                  />
                </Center>
              </Pressable>

              <Pressable onPress={() => setIsDeletOpen(!isOpen)}>
                <Center h="12" w="12" bg="red.500" rounded="md">
                  <Icon
                    as={<Ionicons name="trash-outline" />}
                    size="sm"
                    color="white"
                  />
                </Center>
              </Pressable>

              {isDeletOpen && (
                <AlertDialog
                  leastDestructiveRef={cancelRef}
                  isOpen={isDeletOpen}
                  onClose={onDeleteClose}
                >
                  <AlertDialog.Content>
                    <AlertDialog.CloseButton />
                    <AlertDialog.Header>
                      <Heading size="md">
                        {`Delete ${table.name} Table?`}
                      </Heading>
                    </AlertDialog.Header>
                    <AlertDialog.Body>
                      <Text
                        fontWeight="400"
                        mt={2}
                        mb={2}
                        fontSize="sm"
                        color="coolGray.800"
                      >
                        Are you sure you want to delete this table ?
                      </Text>
                    </AlertDialog.Body>
                    <AlertDialog.Footer>
                      <Button.Group space={2}>
                        <Button
                          variant="unstyled"
                          colorScheme="coolGray"
                          onPress={onDeleteClose}
                          ref={cancelRef}
                        >
                          Cancel
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
                          onPress={() => deleteTeam(table._id)}
                        >
                          Delete Table
                        </Button>
                      </Button.Group>
                    </AlertDialog.Footer>
                  </AlertDialog.Content>
                </AlertDialog>
              )}
            </HStack>
          </VStack>

          {/* <HStack  space={4} justifyContent="space-between">
              <HStack>
                <Text color="coolGray.600" _dark={{
                color: "warmGray.200"
              }} fontWeight="400">
                  6 mins ago ssss
                </Text></HStack>

                <HStack>
               <Button colorScheme="orange" size="sm" onPress={() => alert('Hello, world!')}>
                Book Table
                </Button>
</HStack>
              
            
            </HStack>

          <Center bg="primary.500" size="20" rounded="sm" _text={{
          color: "warmGray.50",
          fontWeight: "medium"
        }} shadow={"3"}>
            Box 2
          </Center>
          <Center size="20" bg="primary.700" rounded="sm" _text={{
          color: "warmGray.50",
          fontWeight: "medium"
        }} shadow={"3"}>
            Box 3
          </Center> */}
        </Stack>
      </Box>
    </Box>
  );
};

const TableList = ({ navigation, route }) => {
  const [tables, setTables] = useState();
  const [searchkey, setsearchkey] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const [notab, setNotab] = useState(false);

  const [refreshing, setRefreshing] = React.useState(false);

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      onRefresh();
    }
  }, [isFocused]);

  const onRefresh = React.useCallback(() => {
    // setRefreshing(true);
    // setTimeout(() => {
    //   setRefreshing(false);
    // }, 2000);

    setIsLoading(true);
    try {
      //  fetch('http://192.168.8.113:5000/table/')
      //  .then(response => response.json())
      //  .then(data => setTables(data))
      //  .catch(error => console.error(error))
      axios.get("table/").then((res) => {
        setTables(res.data);
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
      //  fetch('http://192.168.8.113:5000/table/')
      //  .then(response => response.json())
      //  .then(data => setTables(data))
      //  .catch(error => console.error(error))
      axios.get("table/").then((res) => {
        setTables(res.data);
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

      axios.get("table/").then((response) => {
        // console.log(response.data);

        //         const filteredData = DATA.filter((item) =>
        //   item.name.toLowerCase().includes(search.toLowerCase())
        // );

        const filteredPackages = response.data.filter((tables) =>
          tables.name.toLowerCase().includes(searchkey.toLowerCase())
        );

        if (filteredPackages.length > 0) {
          setTables(filteredPackages);
          setIsLoading(false);
        } else {
          setIsLoading(true);
          setTimeout(() => {
            setIsLoading(false);
          }, 300);

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
          placeholder="Search Table"
          // value={searchText}
          // onChangeText={setSearchText}
          value={searchkey}
          onChangeText={(newText) => setsearchkey(newText)}
          flex={1}
          margin={2}
          rounded="full"
        />

        <Button
          variant="solid"
          colorScheme="red"
          size={"lg"}
          rounded="full"
          startIcon={<Icon as={Ionicons} name="search-outline" size="sm" />}
          onPress={() => filterPackages(searchkey)}
        ></Button>
      </View>

      {isLoading ? (
        ""
      ) : (
        <Box>
          {notab && (
            <PresenceTransition
              visible={notab}
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
                transition: {
                  duration: 500,
                },
              }}
              exit={{
                opacity: 0,
                transition: {
                  duration: 550,
                },
              }}
            >
              <Box
                alignSelf="center"
                px="3"
                py="2"
                width={500}
                // bg="primary.500"
                _text={{
                  alignSelf: "center",
                  fontSize: "md",
                  fontWeight: "medium",
                  color: "warmGray.50",
                  letterSpacing: "lg",
                }}
                bg={["red.400", "blue.400"]}
              >
                Search Not Found
              </Box>
            </PresenceTransition>
          )}{" "}
        </Box>
      )}

      {isLoading ? (
        //   <View
        //   style={{
        //     flex: 1,
        //     alignItems: 'center',
        //     justifyContent: 'center',
        //     position: 'absolute',
        //     top: 0,
        //     bottom: 0,
        //     left: 0,
        //     right: 0,
        //   }}
        // >
        // <HStack space={2} justifyContent="center"  >
        //       <Spinner accessibilityLabel="Loading posts" color="warning.500" size="lg"/>
        //       <Heading color="warning.500" fontSize="2xl" marginTop={1.5}>
        //         Loading
        //       </Heading>
        //     </HStack>

        <ScrollView>
          <LandscapeLoader />
        </ScrollView>
      ) : (
        // </View>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {/* <Svgs/>  */}
          <PresenceTransition
            visible={!isLoading}
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
              transition: {
                duration: 500,
              },
            }}
          >
            <Center flex={1} px="3">
              {/* {tables && tables.map((table , index) => (
                <Example table={table} key={index} />
                ))}  */}

              {tables &&
                tables.map((table, index) => (
                  <GG
                    table={table}
                    key={index}
                    setTables={setTables}
                    navigation={navigation}
                  />
                ))}
            </Center>
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
                onPress={() => navigation.navigate("Add Table")}
              />
            </Box>
          </Pressable>
        </ScrollView>
      )}
    </NativeBaseProvider>
  );
};

export default TableList;

const styles = StyleSheet.create({
  aaaaa: {
    boxShadow: "1px 1px 1px 1px #ccc",
    border: "1px solid red",

    marginTop: 5,
    marginBottom: 5,
  },
  container: {
    flex: 1,
  },
  rect: {
    width: 331,
    height: 122,
    backgroundColor: "#E6E6E6",
    borderRadius: 11,
    marginTop: 175,
    marginLeft: 25,
  },
  rect2: {
    width: 102,
    height: 101,
    backgroundColor: "rgba(229,0,0,1)",
    borderRadius: 9,
  },
  loremIpsum: {
    // fontFamily: "roboto-regular",
    color: "#121212",
    fontSize: 34,
  },
  button3: {
    width: 54,
    height: 50,
    backgroundColor: "rgba(139,87,42,1)",
    borderRadius: 6,
  },
  button2: {
    width: 54,
    height: 50,
    backgroundColor: "rgba(139,87,42,1)",
    borderRadius: 6,
    marginLeft: 6,
  },
  button: {
    width: 54,
    height: 50,
    backgroundColor: "rgba(139,87,42,1)",
    borderRadius: 6,
    marginLeft: 7,
  },
  button3Row: {
    height: 50,
    flexDirection: "row",
    marginTop: 6,
    marginLeft: 13,
    marginRight: 12,
  },
  loremIpsumColumn: {
    width: 200,
    marginLeft: 9,
    marginTop: 2,
    marginBottom: 2,
  },
  rect2Row: {
    height: 101,
    flexDirection: "row",
    marginTop: 12,
    marginLeft: 11,
    marginRight: 9,
  },
});
