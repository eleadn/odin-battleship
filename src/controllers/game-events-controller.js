import EventBus from "../event-bus/event-bus";
import { gameboardMapper } from "../mappers/gameboardMapper";
import { playerType, state } from "../state/state";

export default class GameEventsController {
	constructor() {
		EventBus.listen("ui:opponentCellClicked", (p) =>
			this.onOpponentCellClicked(p)
		);
	}

	onOpponentCellClicked(position) {
		if (state.players[state.currentPlayer].type === playerType.bot) {
			return;
		}

		state.players["player2"].gameboard.receiveAttack(
			position.x,
			position.y
		);

		EventBus.emit(
			"game:opponentReceiveAttack",
			gameboardMapper.attackToRaw(
				state.players["player2"].gameboard,
				position
			)
		);

		EventBus.emit("game:switchTurn");
	}
}
