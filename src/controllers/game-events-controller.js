import EventBus from "../event-bus/event-bus";
import { gameboardMapper } from "../mappers/gameboardMapper";
import { state } from "../state/state";

export default class GameEventsController {
	constructor() {
		EventBus.listen("ui:opponentCellClicked", (p) =>
			this.onOpponentCellClicked(p)
		);
	}

	onOpponentCellClicked(position) {
		const result = state.players["player2"].gameboard.receiveAttack(
			position.x,
			position.y
		);

		if (result) {
			EventBus.emit(
				"game:opponentReceiveAttack",
				gameboardMapper.attackToRaw(
					state.players["player2"].gameboard,
					position
				)
			);
		}
	}
}
