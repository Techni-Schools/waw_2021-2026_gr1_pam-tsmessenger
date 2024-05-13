import { useIsFocused } from "@react-navigation/native";
import { useEffect } from "react";

const useFocusEffect = (
  callback: React.EffectCallback,
  deps: React.DependencyList | undefined
) => {
  const isFocused = useIsFocused();

  useEffect(() => {
    if (!isFocused) return;
    callback();
  }, [isFocused, ...(deps ?? [])]);
};

export default useFocusEffect;
