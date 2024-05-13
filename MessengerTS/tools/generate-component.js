const { mkdirSync, writeFileSync, existsSync } = require("fs");
const { join } = require("path");

async function generateComponent(componentName) {
  const componentDir = join(process.cwd(), "src", "components", componentName);
  if (existsSync(componentDir)) return;

  mkdirSync(componentDir, { recursive: true });
  console.log(`Folder ${componentName} został utworzony.`);

  const templates = {
    "types.ts": `
export type ${componentName}Props = {};
`,
    "styles.ts": `
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
container: {}
});

export default styles;
`,
    [`${componentName}.tsx`]: `
import React from "react";
import { View } from "react-native";
import styles from "./styles";
import { ${componentName}Props } from "./types";

const ${componentName}: React.FC<${componentName}Props> = (props) => {
const {} = props;

return <View style={[styles.container]}></View>;
}

export default ${componentName};
`,
    "index.ts": `
import ${componentName} from "./${componentName}";
export default ${componentName};
`,
  };

  Object.entries(templates).forEach(([fileName, fileContent]) => {
    const filePath = join(componentDir, fileName);
    writeFileSync(filePath, fileContent.trim());
    console.log(`Plik ${fileName} został utworzony.`);
  });
}

const componentName = process.argv[2];

if (!componentName) {
  console.error("Musisz podać nazwę komponentu jako argument.");
  process.exit(1);
}

generateComponent(componentName);
