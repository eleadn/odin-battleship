import EventBus from "../event-bus/event-bus";
import ScreenManager from "../screen-manager/screen-manager";

export default class GameflowController {
	constructor() {
		EventBus.listen("game:startRequest", this.onHomePlayButtonClick);
	}

	onHomePlayButtonClick() {
		ScreenManager.navigateToGameboard();
	}
}
