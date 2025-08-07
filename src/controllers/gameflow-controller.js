import EventBus from "../event-bus/event-bus";
import ScreenManager from "../screen-manager/screen-manager";
import { GAMESTATE, state } from "../state/state";

export default class GameflowController {
	constructor() {
		EventBus.listen("game:startRequest", this.onHomePlayButtonClick);
	}

	onHomePlayButtonClick() {
		state.gameState = GAMESTATE.INIT;
		ScreenManager.navigateToGameboard();
	}
}
