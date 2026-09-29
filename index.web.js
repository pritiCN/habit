/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import IoniconsFont from 'react-native-vector-icons/Fonts/Ionicons.ttf';
import MaterialIconsFont from 'react-native-vector-icons/Fonts/MaterialIcons.ttf';

// Register the icon fonts on web (native platforms bundle them separately)
const iconFontStyle = document.createElement('style');
iconFontStyle.appendChild(
  document.createTextNode(
    `@font-face { src: url(${IoniconsFont}); font-family: Ionicons; }
     @font-face { src: url(${MaterialIconsFont}); font-family: MaterialIcons; }`,
  ),
);
document.head.appendChild(iconFontStyle);

AppRegistry.registerComponent(appName, () => App);

AppRegistry.runApplication(appName, {
  rootTag: document.getElementById('root'),
});
