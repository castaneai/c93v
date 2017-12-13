import React from 'react';
import { StyleSheet, Text, FlatList, View } from 'react-native';
import Expo from 'expo';

async function signInWithGoogleAsync() {
  try {
    const result = await Expo.Google.logInAsync({
      androidClientId: '',
      iosClientId: '369235402889-s52qo0a7n6pt4808p3uol0vkme697cpn.apps.googleusercontent.com',
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    if (result.type === 'success') {
      return result.accessToken;
    } else {
      return {cancelled: true};
    }
  } catch(e) {
    return {error: true};
  }
}

// Example of using the Google REST API
async function getSheetCell(accessToken, spreadsheetId, range) {
  let userInfoResponse = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}`, {
    headers: { Authorization: `Bearer ${accessToken}`},
  });

  return userInfoResponse;
}

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

  init() {
    return new Promise(async (resolve, reject) => {
      const accessToken = await signInWithGoogleAsync();
      console.log("token: " + accessToken)
      const res = await getSheetCell(accessToken, '1_LyvJPoRywod7xj5U2RqKMbUjwDk3vgUnU2WXeU9NDQ', 'A2:H73')
      const resj = await res.json()
      console.log(resj.values);
      this.setState({
        data: resj.values,
      });
      resolve();
    });
  }

  renderItem({ item }) {
    return (
      <View style={styles.item}>
        <Text>{ `${item[0]} - ${item[1]} - ${item[2]}` }</Text>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.data}
          renderItem={this.renderItem}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },

  item: {
    flex: 1,
    height: 100,
    alignItems: 'center',
  }
});