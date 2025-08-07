import GameflowController from "./controllers/gameflow-controller";
import ScreenManager from "./screen-manager/screen-manager";
import "./style.css";

const root = document.getElementById("root");

new GameflowController();

ScreenManager.init(root);
ScreenManager.navigateToHome();
