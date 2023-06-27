import { Button, StyleSheet, View, Text } from "react-native";
import GoogleCast, { CastButton, useRemoteMediaClient, CastState, useCastState } from "react-native-google-cast";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";

export default function App() {
  const client = useRemoteMediaClient();
  const castState = useCastState();

  useEffect(() => {
    if (client) {
      // Send the media to your Cast device as soon as we connect to a device
      // (though you'll probably want to call this later once user clicks on a video or something)
      client.loadMedia({
        mediaInfo: {
          contentUrl:
            'https://commondatastorage.googleapis.com/gtv-videos-bucket/CastVideos/mp4/BigBuckBunny.mp4',
          contentType: 'video/mp4',
        },
      })
    }
  }, [client]);

  return (
    <View style={styles.container}>
      {castState === CastState.CONNECTED && (
        <Button
          title="Controller"
          onPress={() => {
            GoogleCast.showExpandedControls();
          }}
        />
      )}
      <CastButton style={{ width: 24, height: 24, tintColor: "black" }} />
      <Text>Click on the Cast button</Text>
      <Text>{castState}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
