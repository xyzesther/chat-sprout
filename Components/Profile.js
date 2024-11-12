import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { fontSize } from "../styles/styles";
import { Button, Card, Dialog } from "tamagui";
import { colors } from "../styles/styles";

const Profile = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>

      <Card
        paddingVertical="$2"
        marginVertical="$3"
        backgroundColor={colors.lightTheme}
        style={styles.cardContainer}
      >
        <Card
          paddingVertical="$2"
          backgroundColor="transparent"
          style={styles.infoContainer}
        >
          <Text style={styles.item}> email</Text>
          <Text style={styles.display}> abc@email.com </Text>
          <View style={styles.edit}></View>
        </Card>
        <View style={styles.separator} />

        <Card
          paddingVertical="$2"
          backgroundColor="transparent"
          style={styles.infoContainer}
        >
          <Text style={styles.item}> password</Text>
          <Text style={styles.display}> ******** </Text>
          <View style={styles.edit}>
            <Button>Edit</Button>
          </View>
        </Card>
        <View style={styles.separator} />

        <Card
          paddingVertical="$2"
          backgroundColor="transparent"
          style={styles.infoContainer}
        >
          <Text style={styles.item}> name</Text>
          <Text style={styles.display}> abcnameabc </Text>
          <View style={styles.edit}>
            <Button>Edit</Button>
          </View>
        </Card>
      </Card>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  title: {
    fontSize: fontSize.header,
    fontWeight: "bold",
  },
  cardContainer: {
    paddingVertical: 10,
    marginVertical: 10,
  },
  infoContainer: {
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    justifyItems: "center",
    height: 50,
  },
  item: {
    flex: 3,
  },
  display: {
    flex: 4,
  },
  edit: {
    flex: 3,
  },
  separator: {
    height: 1,
    backgroundColor: "white",
    marginVertical: 8,
  },
});
