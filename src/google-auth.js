import Expo from "expo";

export async function signInWithGoogle() {
  const result = await Expo.Google.logInAsync({
    androidClientId: "",
    iosClientId:
      "869271934593-5oeg0j1n0vscd6nkju6mqttun58lh2lj.apps.googleusercontent.com",
    scopes: ["https://www.googleapis.com/auth/spreadsheets"]
  });

  if (result.type === "success") {
    return result.accessToken;
  }
  throw new Error(result);
}
