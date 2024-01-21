import { createDrawerNavigator } from "@react-navigation/drawer";
import { UserProfileScreen } from '../views/userProfile/UserProfileScreen';
import MainMenuScreen from "../views/mainMenu/MainMenuScreen";

const Drawer = createDrawerNavigator();

export const LateralMenu = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="UserProfileScreen" component={UserProfileScreen} />
      <Drawer.Screen name="MainMenuScreen" component={MainMenuScreen} />
    </Drawer.Navigator>
  );
}
