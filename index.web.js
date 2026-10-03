/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import IoniconsFont from 'react-native-vector-icons/Fonts/Ionicons.ttf';
import MaterialIconsFont from 'react-native-vector-icons/Fonts/MaterialIcons.ttf';
import FontAwesome5SolidFont from 'react-native-vector-icons/Fonts/FontAwesome5_Solid.ttf';
import FeatherFont from 'react-native-vector-icons/Fonts/Feather.ttf';
import SimpleLineIconsFont from 'react-native-vector-icons/Fonts/SimpleLineIcons.ttf';

// Register the icon fonts on web (native platforms bundle them separately).
// On web the library uses the font file name (without .ttf) as the font-family.
const iconFontStyle = document.createElement('style');
iconFontStyle.appendChild(
  document.createTextNode(
    `@font-face { src: url(${IoniconsFont}); font-family: Ionicons; }
     @font-face { src: url(${MaterialIconsFont}); font-family: MaterialIcons; }
     @font-face { src: url(${FontAwesome5SolidFont}); font-family: FontAwesome5_Solid; }
     @font-face { src: url(${FeatherFont}); font-family: Feather; }
     @font-face { src: url(${SimpleLineIconsFont}); font-family: SimpleLineIcons; }`,
  ),
);
document.head.appendChild(iconFontStyle);

AppRegistry.registerComponent(appName, () => App);

AppRegistry.runApplication(appName, {
  rootTag: document.getElementById('root'),
});
