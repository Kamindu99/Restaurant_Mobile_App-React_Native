import React, { useState, useEffect, useRef } from "react";
import { ScrollView, StyleSheet, RefreshControl } from "react-native";
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
  AlertDialog,
  useToast,
} from "native-base";
import axios from "axios";

import { useIsFocused, useRoute } from "@react-navigation/native";

import AlertBox from "../../components/AlertBox";

import DetailsLoader from "../../components/DetailsLoader";
import NoData from "../../components/NoData";

const MyInquiry = (props) => {
  const { inquiry, setInquiries, navigation, index, onRefresh } = props;

  const [isLoading, setIsLoading] = useState(true);

  const toast = useToast();

  const [isOpen, setIsOpen] = React.useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = React.useRef(null);

  const deleteInquiry = async (id) => {
    try {
      await axios.delete(`inquiry/${id}`);
      console.log("Inquiry Deleted");
      onRefresh();
      toast.show({
        placement: "top",
        render: () => (
          <AlertBox
            status="success"
            title="Inquiry Deleted Successfully"
            description="Your Inquiry has been deleted successfully"
          />
        ),
      });
      onClose();

      navigation.navigate("Home");

      setIsLoading(true);
      await axios.get("inquiry/").then((res) => {
        setInquiries(res.data);
        setIsLoading(false);
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View key={index} style={styles.container}>
      <AlertDialog
        leastDestructiveRef={cancelRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <AlertDialog.Content>
          <AlertDialog.CloseButton />
          <AlertDialog.Header>Delete Inquiry ?</AlertDialog.Header>
          <AlertDialog.Body>
            <Text
              fontWeight="400"
              mt={2}
              mb={2}
              fontSize="sm"
              color="coolGray.800"
            >
              Are you sure you want to delete this inquiry ?
            </Text>
          </AlertDialog.Body>
          <AlertDialog.Footer>
            <Button.Group space={2}>
              <Button
                variant="unstyled"
                colorScheme="coolGray"
                onPress={onClose}
                ref={cancelRef}
              >
                No
              </Button>
              <Button
                variant="solid"
                colorScheme="red"
                startIcon={
                  <Icon as={Ionicons} name="trash-outline" size="sm" />
                }
                onPress={() => deleteInquiry(inquiry._id)}
              >
                Delete
              </Button>
            </Button.Group>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>

      <VStack mb="2.5" mt="1.5">
        <HStack mb="2.5" mt="1.5">
          <VStack>
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
              <Text style={styles.label}>Inquiry :</Text>
              <Text style={styles.detail}>{inquiry.inq}</Text>
            </View>
          </VStack>
          <VStack space={5} p={3} mt={-3}>
            <Button
              onPress={() =>
                navigation.navigate("EditInquiry Screen", {
                  id: inquiry._id,
                })
              }
              variant="solid"
              colorScheme="green"
              startIcon={<Icon as={Ionicons} name="pencil-outline" size="sm" />}
            >
              Edit
            </Button>

            <Button
              variant="solid"
              colorScheme="red"
              onPress={() => {
                setIsOpen(!isOpen);
                console.log("aaaaa");
              }}
              startIcon={<Icon as={Ionicons} name="trash-outline" size="sm" />}
            >
              Delete
            </Button>
          </VStack>
        </HStack>
        <View style={[styles.detailContainer, styles.horizontalLine]}>
          <View style={styles.line} />
        </View>

        <VStack mb="2.5" mt="1.5" marginTop={3} flexDirection={"row"}>
          <View style={styles.detailContainer}>
            <Text style={styles.label}>Response Status :</Text>
          </View>
          {inquiry.adreply === "Our team will response to your inquiry soon" ? (
            <VStack style={{ width: 130 }}>
              <Badge
                variant="outline"
                colorScheme="red"
                startIcon={
                  <Icon as={Ionicons} name="close-outline" size="sm" />
                }
              >
                Haven't Responded
              </Badge>
            </VStack>
          ) : (
            <VStack style={{ width: 130 }}>
              <Badge
                variant="outline"
                colorScheme="green"
                startIcon={<Icon as={Ionicons} name="open-outline" size="sm" />}
              >
                Response Added
              </Badge>
            </VStack>
          )}
        </VStack>
        {/* <View style={styles.detailContainer}>
          <Text style={styles.label}>Response :</Text>
          <Text style={styles.detail}>{inquiry.adreply}</Text>
        </View> */}
      </VStack>
    </View>
  );
};

const MyInquiryScreen = ({ navigation }) => {
  const route= useRoute();
  const {userid,name} = route.params;


  const [inquiries, setInquiries] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const [refreshing, setRefreshing] = React.useState(false);

  const isFocused = useIsFocused();



  useEffect(() => {
    if (isFocused) {
      onRefresh();
    }
  }, [isFocused]);

  const onRefresh = React.useCallback(() => {
    setIsLoading(true);
    if(userid){
      console.log(userid,'ccccccc')
    axios
      .get(`inquiry/book/${userid}`)
      .then((res) => {
        
        setInquiries(res.data);

        console.log(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
    }
    else{
      setIsLoading(false);
      setInquiries([])
      alert("No bookings")
    }
  }, []);

  useEffect(() => {
    setIsLoading(true);
    if(userid){
      console.log(userid,'ccccccc')
    axios
      .get(`inquiry/book/${userid}`)
      .then((res) => {
        
        setInquiries(res.data);

        console.log(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
    }
    else{
      setIsLoading(false);
      setInquiries([])
      alert("No bookings")
    }
  }, [navigation]);

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
          <Button
            mt={5}
            w={"40%"}
            alignSelf="center"
            mb={3}
            onPress={() => navigation.navigate("AddInquiry Screen")}
            variant="solid"
            colorScheme="blue"
            startIcon={<Icon as={Ionicons} name="add-outline" size="sm" />}
          >
            Create New Inquiry
          </Button>

          {inquiries.length == 0 ? 
          
          <NoData
            message="You have not Created any Inquiries"
            onRefresh={onRefresh}
            />
            :

            <>

          {inquiries &&
            inquiries.map((inquiry, index) => (
              <MyInquiry
                inquiry={inquiry}
                key={index}
                navigation={navigation}
                onRefresh={onRefresh}
              />
            ))}
            </>}
        </ScrollView>
      )}
    </NativeBaseProvider>
  );
};

export default MyInquiryScreen;

const styles = StyleSheet.create({
  container: {
    width: "90%",
    backgroundColor: "#F7F1E5",
    marginTop: 10,
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
