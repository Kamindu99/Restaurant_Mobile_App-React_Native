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
    useToast,
    Image
  } from "native-base";
  import { Ionicons } from "@expo/vector-icons";
  import React, { useState } from "react";
  import axios from "axios";
  import {  Center } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import AlertBox from "../../components/AlertBox";
import {useEffect} from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {StyleSheet} from "react-native";

const ProfileScreen = ({ navigation }) => {
    const toast = useToast();
    const [show, setShow] = React.useState(false);
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [mobile, setMobile] = useState("");

    useEffect(() => {
        setEmail("kavindupro40@gmail.com")
        setName("Kavindu")
        setMobile("0719882819")
        setPassword("abcd")

    }, []);

    btnUpdate = () =>  {
        setMobile(mobile)
        setEmail(email)
        setName(name)
        setPassword(password)

        toast.show({
            placement: "top",
    
            render: () => (
              <AlertBox
                status="Success"
                title="Updated Success"
                description={`Welcome`}
              />
            ),
          },[]);
    }
    
    const profileDate = async() => {

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
                    status="Success"
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

   
    return (
    <NativeBaseProvider>
        
        <Center flex={1} px="3">
               
                 <View style={{marginTop: 10 }}>
                <Image
                    source={require('../../assets/user-avatar.png')}
                    style={{width: 100, height: 100,marginBottom: 30, alignSelf: 'center' }}
                    alt="Alternate Text"
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
                <Input type="password"size="sm" placeholder="Password" value={password} onChangeText={(e) => setPassword(e)} />
            </Stack>;

            <Button
            style={{ width: 250, marginLeft: 10, marginTop: 25 }}
            variant="solid"
            colorScheme="red"
            startIcon={<Icon as={Ionicons} name="open-outline" size="sm" />}
            onPress={() => btnUpdate()}
            > Update Details
            </Button>

            <Button 
            
            style={{ width: 250, marginLeft: 10, marginTop: 25 , display: 'none'  }}
            variant="solid"
            colorScheme="red"
            startIcon={<Icon as={Ionicons} name="open-outline" size="sm" />}
            onPress={() => profileDate()}
            > Update Details
            </Button>
        </Center>
    </NativeBaseProvider>
    );
  };

  const styles = StyleSheet.create({
    baseText: {
      marginTop: '5%',
      color: 'red',

    }
  });
  export default ProfileScreen;
  