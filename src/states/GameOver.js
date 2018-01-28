import Phaser from 'phaser-ce';
import globals from './globals';

export default class extends Phaser.State {
  init() {}
  preload() {}

  create() {
    const text = this.add.text(
      this.game.width / 2,
      this.game.height / 2,
      `Game Over\n\nYou reached level ${this.game.global.level} with score ${this.game.global.score}`,
      {
        font: '24px Arial',
        fill: '#000',
        align: 'center',
      }
    )

    text.anchor.set(0.5);

    this.input.onDown.add(this.restartGame, this);
  }

  restartGame() {
    this.resetGlobalVariables();
    this.game.state.start('Game');
  }

  resetGlobalVariables() {
    this.game.global = {...globals};
  }
}
