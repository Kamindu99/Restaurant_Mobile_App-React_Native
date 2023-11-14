import React from "react";
import { Box, HStack, Text, Icon, Image, Pressable } from "native-base";
import { Ionicons } from "@expo/vector-icons";

export default function NoData({ onRefresh, message }) {
  return (
    <>
      <Image
        p={2}
        mt={4}
        ml={4}
        mr={4}
        borderRadius="lg"
        source={{
          uri: "https://img.freepik.com/free-vector/curious-analyst-investigating-question-mark-with-magnifier_74855-20083.jpg?w=740&t=st=1679582376~exp=1679582976~hmac=e9e1e94f5e6a746dfe507113273b2fb5b32e2cc5f42de12cd388a562859c2ea1",
        }}
        alt="image"
        maxWidth="100%"
        height={300}
        resizeMode="cover"
      />
      <Box p={2} mt={2} ml={4} mr={4} borderRadius="lg" bg="white" rounded="lg">
        <HStack justifyContent="center">
          <Text
            textAlign="center"
            fontWeight="bold"
            fontSize="2xl"
            mt={2}
            mb={2}
          >
            {message ? message + " " : "No Data Found"}
          </Text>

          <Pressable onPress={onRefresh} mt={2}>
            <Icon
              as={Ionicons}
              name="refresh-outline"
              size="xl"
              color="red"
              alignSelf="center"
            />
          </Pressable>
        </HStack>
      </Box>
    </>
  );
}
