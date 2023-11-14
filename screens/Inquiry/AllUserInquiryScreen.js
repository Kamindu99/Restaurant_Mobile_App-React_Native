import React, { useState, useEffect, useRef } from "react";
import { ScrollView, StyleSheet, RefreshControl } from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { Ionicons } from "@expo/vector-icons";
import {
  VStack,
  Icon,
  NativeBaseProvider,
  Button,
  Text,
  HStack,
  View,
  Badge,
  Spacer,
  AlertDialog,
} from "native-base";
import axios from "axios";

import { useIsFocused } from "@react-navigation/native";

//Skeleton Loader
import DetailsLoader from "../../components/DetailsLoader";

import { useNavigation } from "@react-navigation/native";

const Inquiry = (props) => {
  const { inquiry, index } = props;

  //popup box
  const [isOpen, setIsOpen] = React.useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = React.useRef(null);

  const nav = useNavigation();

  return (
    <View key={index} style={styles.container}>
      {/* popup box */}
      <AlertDialog
        leastDestructiveRef={cancelRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <AlertDialog.Content>
          <AlertDialog.CloseButton />
          <AlertDialog.Header>Inquiry Details</AlertDialog.Header>
          {inquiry.adreply === "Our team will response to your inquiry soon" ? (
            <AlertDialog.Body>
              <View style={styles.detailContainer}>
                <Text style={styles.label}>Name :</Text>
                <Text style={styles.detail}>{inquiry.name}</Text>
              </View>
              <View style={styles.detailContainer}>
                <Text style={styles.label}>Phone :</Text>
                <Text style={styles.detail}>{inquiry.phone}</Text>
              </View>
              <View style={styles.detailContainer}>
                <Text style={styles.label}>Email :</Text>
                <Text style={styles.detail}>{inquiry.email}</Text>
              </View>
            </AlertDialog.Body>
          ) : (
            <AlertDialog.Body>
              <View style={styles.detailContainer}>
                <Text style={styles.label}>Name :</Text>
                <Text style={styles.detail}>{inquiry.name}</Text>
              </View>
              <View style={styles.detailContainer}>
                <Text style={styles.label}>Phone :</Text>
                <Text style={styles.detail}>{inquiry.phone}</Text>
              </View>
              <View style={styles.detailContainer}>
                <Text style={styles.label}>Email :</Text>
                <Text style={styles.detail}>{inquiry.email}</Text>
              </View>
              <View style={styles.detailContainer}>
                <Text style={styles.label}>Response :</Text>
                <Text style={styles.detail}>{inquiry.adreply}</Text>
              </View>
            </AlertDialog.Body>
          )}
          <AlertDialog.Footer>
            <Button.Group space={2}>
              <Button
                variant="unstyled"
                colorScheme="coolGray"
                onPress={onClose}
                ref={cancelRef}
              >
                Cancel
              </Button>

              {inquiry.adreply ===
              "Our team will response to your inquiry soon" ? (
                <Button
                  mr="18.5"
                  onPress={() =>
                    nav.navigate("EditResponse Screen", {
                      id: inquiry._id,
                    })
                  }
                  variant="solid"
                  colorScheme="green"
                  startIcon={
                    <Icon as={Ionicons} name="add-outline" size="sm" />
                  }
                >
                  Add Response
                </Button>
              ) : (
                <Button
                  mr="18.5"
                  onPress={() =>
                    nav.navigate("EditResponse Screen", {
                      id: inquiry._id,
                    })
                  }
                  variant="solid"
                  colorScheme="yellow"
                  startIcon={
                    <Icon as={Ionicons} name="pencil-outline" size="sm" />
                  }
                >
                  Edit Response
                </Button>
              )}
            </Button.Group>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>

      <VStack>
        <View style={styles.detailContainer}>
          <Text style={styles.label}>Inquiry :</Text>
          <Text style={styles.detail}>{inquiry.inq}</Text>
        </View>

        <HStack mb="2.5" mt="1" flexDirection={"row"}>
          <View style={styles.detailContainer}>
            <Text style={styles.label}>Status :</Text>
          </View>
          {inquiry.adreply === "Our team will response to your inquiry soon" ? (
            <Badge
              variant="outline"
              colorScheme="red"
              startIcon={<Icon as={Ionicons} name="close-outline" size="sm" />}
            >
              Haven't Responded
            </Badge>
          ) : (
            <Badge
              variant="outline"
              colorScheme="green"
              startIcon={<Icon as={Ionicons} name="open-outline" size="sm" />}
            >
              Response Added
            </Badge>
          )}
        </HStack>

        <View style={[styles.detailContainer, styles.horizontalLine]}>
          <View style={styles.line} />
        </View>

        {inquiry.adreply !== "Our team will response to your inquiry soon" ? (
          <View mt={2} style={styles.detailContainer}>
            <Text style={styles.label}>Response : </Text>
            <Text style={styles.detail}>{inquiry.adreply}</Text>
          </View>
        ) : null}
        <HStack mt={2}  justifyContent='space-between'>
          {inquiry.adreply === "Our team will response to your inquiry soon" ? (
            <HStack>
              <Button
               
                onPress={() =>
                  nav.navigate("EditResponse Screen", {
                    id: inquiry._id,
                  })
                }
                variant="solid"
                colorScheme="green"
                startIcon={<Icon as={Ionicons} name="add-outline" size="sm" />}
              >
                Add Response
              </Button>
            </HStack>
          ) : (
            <HStack>
              <Button
              
                onPress={() =>
                  nav.navigate("EditResponse Screen", {
                    id: inquiry._id,
                  })
                }
                variant="solid"
                colorScheme="yellow"
                startIcon={
                  <Icon as={Ionicons} name="pencil-outline" size="sm" />
                }
              >
                Edit Response
              </Button>
            </HStack>
          )}

          {/* <Spacer height={6} /> */}
          {inquiry.adreply === "Our team will response to your inquiry soon" ? (
            <Button
              onPress={() => {
                setIsOpen(!isOpen);
                console.log("aaaaa");
              }}
              variant="solid"
              colorScheme="violet"
              startIcon={<Icon as={Ionicons} name="eye-outline" size="sm" />}
            >
              User Details
            </Button>
          ) : (
            <Button
              onPress={() => {
                setIsOpen(!isOpen);
                console.log("aaaaa");
              }}
              variant="solid"
              colorScheme="violet"
              startIcon={<Icon as={Ionicons} name="eye-outline" size="sm" />}
            >
              View Response
            </Button>
          )}
        </HStack>
      </VStack>
    </View>
  );
};

const FirstRoute = ({ index, navigation }) => {
  const [inquiries, setInquiries] = useState();
  const [ids, setId] = useState("");

  //Skeleton Loader
  const [isLoading, setIsLoading] = useState(false);

  //Refresh
  const [refreshing, setRefreshing] = React.useState(false);

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      onRefresh();
    }
  }, [isFocused]);

  const onRefresh = React.useCallback(() => {
    setIsLoading(true);
    try {
      axios.get("inquiry/").then((res) => {
        setInquiries(res.data);
        const inquiryIds = res.data.map((inquiry) => inquiry.inquiryId);
        setId(inquiryIds);

        console.log(res.data);
        setIsLoading(false);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get("inquiry/")
      .then((res) => {
        setInquiries(res.data);
        const inquiryIds = res.data.map((inquiry) => inquiry.inquiryId);
        setId(inquiryIds);
        setIsLoading(false);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      {isLoading ? (
        <ScrollView>
          <DetailsLoader />
        </ScrollView>
      ) : (
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {inquiries &&
            inquiries.map((inquiry, index) => (
              <>
                {inquiry.adreply ===
                "Our team will response to your inquiry soon" ? null : (
                  <Inquiry
                    inquiry={inquiry}
                    key={index}
                    setInquiries={setInquiries}
                    navigation={navigation}
                    ids={ids}
                  />
                )}
              </>
            ))}
        </ScrollView>
      )}
    </>
  );
};

const SecondRoute = ({ index, navigation }) => {
  const [inquiries, setInquiries] = useState();
  const [ids, setId] = useState("");

  //Skeleton Loader
  const [isLoading, setIsLoading] = useState(false);

  //Refresh
  const [refreshing, setRefreshing] = React.useState(false);

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      onRefresh();
    }
  }, [isFocused]);

  const onRefresh = React.useCallback(() => {
    setIsLoading(true);
    try {
      axios.get("inquiry/").then((res) => {
        setInquiries(res.data);
        const inquiryIds = res.data.map((inquiry) => inquiry.inquiryId);
        setId(inquiryIds);

        console.log(res.data);
        setIsLoading(false);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get("inquiry/")
      .then((res) => {
        setInquiries(res.data);
        const inquiryIds = res.data.map((inquiry) => inquiry.inquiryId);
        setId(inquiryIds);
        setIsLoading(false);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <NativeBaseProvider>
      {isLoading ? (
        <ScrollView>
          <DetailsLoader />
        </ScrollView>
      ) : (
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {inquiries &&
            inquiries.map((inquiry, index) => (
              <>
                {inquiry.adreply ===
                "Our team will response to your inquiry soon" ? (
                  <Inquiry
                    inquiry={inquiry}
                    key={index}
                    setInquiries={setInquiries}
                    navigation={navigation}
                    ids={ids}
                  />
                ) : null}
              </>
            ))}
        </ScrollView>
      )}
    </NativeBaseProvider>
  );
};

const initialRoutes = [
  { key: "first", title: "Resolved Inquiries" },
  { key: "second", title: "Pending Inquiries" },
];
const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
});
const renderTabBar = (props) => {
  const { itemLength } = props;
  return (
  <TabBar
    {...props}
    style={{ backgroundColor: "#f4511e" }}
    activeColor={"white"}
    inactiveColor={"gray"}
    fontWeight={"bold"}

    renderLabel={({ route, focused }) => (
      <View style={{ flexDirection: "row" }}>
      
        <Text fontSize="md" style={{ color:"white" , opacity: focused ? 1 : 0.8
       }}>
          {route.title}{' '}
        </Text>
        {route.key === "second" && (
          <Badge // bg="red.400"
          variant="subtle"
          style={{ color:"white" , opacity: focused ? 1 : 0.8}}
           rounded="full"  zIndex={1} alignSelf="flex-end">
            <Text fontSize="xs" fontWeight="bold"  style={{ color: 'tomato'  }}>

            {itemLength}
            </Text>

            </Badge>
        )}
      </View>
    )}
   
  />
  )
};

const AllUserInquiryScreen = ({ navigation }) => {
  const [index, setIndex] = useState(0);

  const [itemLength, setItemLength] = useState("");

  const newff = () => {
    console.log("neww");
  };

  const handleIndexChange = (index) => {
    setIndex(index);
    if (index === 0) {
      console.log("First");
      newff();
    }
    if (index === 1) {
      console.log("Second");
    }
    if (index === 2) {
      console.log("Third");
    }
  };

  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      console.log("useEffect");
      axios.get("inquiry/").then((res) => {
        // console.log(res.data, "res");
        const pendingItems = res.data.filter(item => item.adreply === "Our team will response to your inquiry soon");
        console.log(pendingItems, 'cannn');
        setItemLength(pendingItems.length);
        console.log(itemLength, 'itemLength');
      });
    }
  }, [isFocused, index]);

  return (
    <TabView
      index={index}
      //key={index}
      navigationState={{ index, routes: initialRoutes }}
      renderScene={renderScene}
      onIndexChange={handleIndexChange}
      renderTabBar={(props) => renderTabBar({...props, itemLength})}
    />
  );
};

export default AllUserInquiryScreen;

const styles = StyleSheet.create({
  container: {
    width: "90%",
    backgroundColor: "white",
    marginTop: 20,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    alignSelf: "center",
    padding: 20,
    marginBottom: 20,
  },
  detailContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 10,
    color: "#333",
  },
  detail: {
    fontSize: 16,
    color: "#555",
  },
  horizontalLine: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  line: {
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    width: "99%",
  },
});
