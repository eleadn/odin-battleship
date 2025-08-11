import GameEventsController from "./controllers/game-events-controller";
import GameflowController from "./controllers/gameflow-controller";
import ScreenManager from "./screen-manager/screen-manager";
import "./style.css";

const root = document.getElementById("root");

new GameflowController();
new GameEventsController();

ScreenManager.init(root);
ScreenManager.navigateToHome();
