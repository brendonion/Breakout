// @flow
import Phaser from 'phaser-ce';
import Paddle from '../prefabs/paddle';
import Brick from '../prefabs/brick';

export default class extends Phaser.State {
  init() {}
  preload() {}

  create() {
    this.setUpText();
    this.setUpPaddle();
    this.setUpBricks();
  }

  setUpPaddle() {
    this.paddle = new Paddle(
      this.game,
      this.game.world.centerX,
      this.game.world.height - 50,
    );

    this.game.add.existing(this.paddle);
  }

  setUpBricks() {
    this.bricks = this.game.add.group();
    this.generateBricks(this.bricks);
  }

  generateBricks(bricksGroup: any) {
    let rows: number = 5;
    let columns: number = 10;
    let xOffset: number = 100;
    let yOffset: number = 45;
    let brick;

    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < columns; x++) {
        brick = new Brick(
          this.game,
          x * xOffset,
          y * yOffset,
        );

        bricksGroup.add(brick);
      }
    }

    let brickGroupWidth = ((xOffset * columns) - (xOffset - brick.width)) / 2;
    bricksGroup.position.setTo(
      this.game.world.centerX - brickGroupWidth,
      this.game.world.centerY - 250,
    );
  }

  setUpText() {
    this.createText(20, 20, 'left', `Score: ${this.game.global.score}`);
    this.createText(0, 20, 'center', `Lives: ${this.game.global.lives}`);
    this.createText(-20, 20, 'right', `Level: ${this.game.global.level}`);
  }

  createText(xOffset: number, yOffset: number, align: string, text: string) {
    return this.game.add
      .text(xOffset, yOffset, text, {font: '18px Arial', fill: '#000', boundsAlignH: align})
      .setTextBounds(0, 0, this.game.world.width, 0);
  }

  render() {
  }
}
