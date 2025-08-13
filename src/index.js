import BotTurnController from "./controllers/bot-turn-controller";
import GameEventsController from "./controllers/game-events-controller";
import GameflowController from "./controllers/gameflow-controller";
import ScreenManager from "./screen-manager/screen-manager";
import "./style.css";

const root = document.getElementById("root");

new GameflowController();
new GameEventsController();
new BotTurnController();

ScreenManager.init(root);
ScreenManager.navigateToHome();
