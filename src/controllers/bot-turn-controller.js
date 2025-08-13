import EventBus from "../event-bus/event-bus";
import { gameboardMapper } from "../mappers/gameboardMapper";
import { state } from "../state/state";

export default class BotTurnController {
	constructor() {
		EventBus.listen("game:playBotTurn", this.onPlayBotTurn);
	}

	onPlayBotTurn() {
		const possibleAttacks =
			state.currentPlayer.gameboard.getPossibleAttacks();
		const attackIndex = Math.floor(Math.random() * possibleAttacks.length);
		const attack = possibleAttacks[attackIndex];
		state.players["player1"].gameboard.receiveAttack(attack.x, attack.y);

		EventBus.emit(
			"game:playerReceiveAttack",
			gameboardMapper.attackToRaw(
				state.players["player1"].gameboard,
				attack
			)
		);
	}
}
