import React from "react";
import { StyleSheet, Text, FlatList, View } from "react-native";
import { signInWithGoogle } from "./google-auth";
import { getSheetCell } from "./spreadsheet";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: []
    };

    for (let i = 0; i < 100; i++) {
      this.state.data.push([`A${i}`, `作家${i}`, `作品名${i}`, `値段${i}`]);
    }
  }

  componentDidMount() {
    this.init();
  }

  async init() {
    const accessToken = await signInWithGoogle();
    console.log("token: " + accessToken);

    const res = await getSheetCell(
      accessToken,
      "1GJzM_5mUoUeY9Cxj6zGJo-fKOU0Tf6tkMGGocHMSCas",
      "A4:O107"
    );
    console.log("get sheet cell: ", resj);
    const resj = await res.json();
    console.log(resj.values);
    this.setState({
      data: resj.values
    });
  }

  renderItem({ item }) {
    return (
      <View style={styles.item}>
        <Text>{`${item[0]} - ${item[1]} - ${item[2]}`}</Text>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList data={this.state.data} renderItem={this.renderItem} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafafa"
  },

  item: {
    flex: 1,
    height: 100,
    alignItems: "center"
  }
});
