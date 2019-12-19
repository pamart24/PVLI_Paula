export default class Nucleo extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, type){
        super(scene, x, y, type);
        this.game = scene;
        scene.add.existing(this);
        scene.physics.world.enable(this);
        this.body.immovable = true;
        this.setInteractive();
        this.vidaTotal = 100;
        this.vida = 100;
        this.tamBarra = 150;
        this.posX = x;
        this.posY = y;
    }

    onDestroy() {
        this.game.derrota = true;
    }

    //BARRA QUE REPRESENTA LA SALUD DEL NÚCLEO
    barraSalud() {
        //CALCULAMOS LA VIDA PROPORCIONAL PARA SABER LA LONGITUD DE LA BARRA DE SALUD
        let barra = 150 - ((this.vida * 150) / this.vidaTotal);
        let graphics = this.game.add.graphics();
        graphics.fillStyle(0xA9A9A9, 1);
        graphics.fillRect(this.posX + 70 - barra, this.posY - 170, barra, 20);
    }
}