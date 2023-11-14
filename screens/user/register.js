import {
    Button,
    HStack,
    Input,
    NativeBaseProvider,
    VStack,
    Stack,
    Icon,
    Text,
    Spacer,
    Pressable,
    Box,
    View,
    IconButton,
    CloseIcon,
    useToast
  } from "native-base";
  import { Images } from 'react-native'
  import { Alert } from "native-base";
  import { Ionicons } from "@expo/vector-icons";
  import React, { useState } from "react";
  import axios from "axios";
  import {  Center } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import {Image, ScrollView, TextInput} from 'react-native';
import {StyleSheet} from "react-native";
import AlertBox from "../../components/AlertBox";
const RegisterScreen = ({ navigation }) => {
   
  const [show, setShow] = React.useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [mobile, setMobile] = useState("");
    const toast = useToast();
    const btnRegsiter =() =>{

        if (name == "") {
            toast.show({
                placement: "top",
                render: () => (
                  <AlertBox
                    status="error"
                    title="Name Is Empty"
                    // description="Check Again and Fill All Fields"
                  />
                ),
              });
            return;
        }
        if (email == "") {
            toast.show({
                placement: "top",
                render: () => (
                  <AlertBox
                    status="error"
                    title="email Is Empty"
                    // description="Check Again and Fill All Fields"
                  />
                ),
              });
            return;
        }
        if (password == "") {
            toast.show({
                placement: "top",
                render: () => (
                  <AlertBox
                    status="error"
                    title="password Is Empty"
                    // description="Check Again and Fill All Fields"
                  />
                ),
              });
            return;
        }
        if (confirmPassword == "") {
            toast.show({
                placement: "top",
                render: () => (
                  <AlertBox
                    status="error"
                    title="confirm Password Is Empty"
                    // description="Check Again and Fill All Fields"
                  />
                ),
              });
            return;
        }
        if (mobile == "") {
            toast.show({
                placement: "top",
                render: () => (
                  <AlertBox
                    status="error"
                    title="Mobile Is Empty"
                    // description="Check Again and Fill All Fields"
                  />
                ),
              });
            return;
        }
        if (password != confirmPassword) {
            toast.show({
                placement: "top",
                render: () => (
                  <AlertBox
                    status="error"
                    title="Password Match error Is Empty"
                    // description="Check Again and Fill All Fields"
                  />
                ),
              });
            return;
        }
        else{
        axios.post('https://sliitfoodsystem.onrender.com/user/reg',{
            name: name,
            email: email,
            password: password,
            confirmPass: confirmPassword,
            mobile: mobile
        })
        .then(response => {
            if(response.data.success){
                toast.show({
                    placement: "top",
            
                    render: () => (
                      <AlertBox
                        status="success"
                        title="Registration Success"
                        description={`Welcome`}
                      />
                    ),
                  },[]);
                navigation.navigate('login')
            }
        })
        .catch(error => {
            console.log(error);
        });
    }
    }

    return (
        
        <NativeBaseProvider>
        <ScrollView>
        <Center flex={1} px="3">
      
            {/* <Box alignItems="center">
                <Input  placeholder="Full Name" w="75%"/>
            </Box> */}
             <View style={{marginTop: 10 }}>
                <Image
                    source={require('../../assets/team.png')}
                    style={{width: 150, height: 150,marginBottom: 10, alignSelf: 'center' }}
                />
            </View>
            <Stack space={1} w="75%" maxW="300px" mx="auto">
                <Text> Name</Text>
                <Input size="sm" placeholder="First Name" value={name} onChangeText={(e) => setName(e)}/>
                <Text >Email</Text>
                <Input size="sm" placeholder="example@gmail.com" value={email} onChangeText={(e) => setEmail(e)} />
                <Text >Mobile Number</Text>
                <Input size="sm" placeholder="071-9882***" value={mobile} onChangeText={(e) => setMobile(e)} />
                <Text >Password</Text>
                <Input type="password" size="sm" placeholder="Password" value={password} onChangeText={(e) => setPassword(e)} />
                <Text >Confirm Password</Text>
                <Input type="password"size="sm" placeholder="Confirm Password" value={confirmPassword} onChangeText={(e) => setConfirmPassword(e)} />
            </Stack>;


            <Button
            style={{ width: 250, marginLeft: 10, marginTop: 25 }}
            variant="solid"
            colorScheme="red"
            startIcon={<Icon as={Ionicons} name="open-outline" size="sm" />}
            onPress={() => btnRegsiter()}
            >
                Register
            </Button>

            <Text style={styles.baseText} onPress={()=>navigation.navigate('login')} >Login</Text>
        </Center>
        </ScrollView>
        </NativeBaseProvider>
 

    );
};

const styles = StyleSheet.create({
    baseText: {
      marginTop: '5%',
      color: 'red',
    }
  });
export default RegisterScreen
  