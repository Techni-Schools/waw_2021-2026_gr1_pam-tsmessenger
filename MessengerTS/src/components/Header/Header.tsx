import React from "react";
import { View } from "react-native";
import styles from "./styles";
import { HeaderProps } from "./types";
import { Text } from "react-native-paper";

const Header: React.FC<HeaderProps> = (props) => {
  const { headline, description, children } = props;

  return (
    <View style={[styles.container]}>
      <View>
        <Text variant="headlineMedium" style={{ fontWeight: "500" }}>
          {headline}
        </Text>
        {description && <Text>{description}</Text>}
      </View>
      <View>{children}</View>
    </View>
  );
};

export default Header;
