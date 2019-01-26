import React from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import Placeholder from "rn-placeholder";

const imageRatio = Dimensions.get("window").width * 0.25;

const customPlaceholder = props => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      borderRadius: 10,
      margin: 6
    },
    feedBox: {
      flex: 1,
      flexDirection: "row"
    },
    feedImageArea: {
      flex: 2
    },
    feedImage: {
      borderRadius: 10,
      margin: 12,
      backgroundColor: "#E4E5E8",
      width: imageRatio,
      height: imageRatio
    },
    feedTextArea: {
      flex: 5
    },
    feedTextAreaInside: {
      flex: 1,
      marginTop: 12,
      marginLeft: 14,
      marginBottom: 12,
      marginRight: 12
    }
  });

  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <View style={styles.feedBox}>
          <View style={styles.feedImageArea}>
            <View style={styles.feedImage} />
          </View>
          <View style={styles.feedTextArea}>
            <View style={styles.feedTextAreaInside}>
              <Placeholder.Paragraph
                lineNumber={3}
                textSize={16}
                lineSpacing={8}
                color="#E4E5E8"
                width="100%"
                lastLineWidth="30%"
                firstLineWidth="100%"
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Placeholder.connect(customPlaceholder);
