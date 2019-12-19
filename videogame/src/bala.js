export default class Bala extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, eX, eY, type){
        super(scene, x, y, type);
        this.game = scene;
        scene.add.existing(this);
        scene.physics.world.enable(this);
        this.setScale(0.2);
        //CALCULAMOS EL VECTOR DE MOVIMIENTO DE LA BALA
        this.dirX = (x - eX) / 10;
        this.dirY = (y - eY) / 10;
        this.rotX = eX;
        this.rotY = eY;
    }

    preUpdate() {
        this.rotation = Phaser.Math.Angle.Between(this.x, this.y, this.rotX, this.rotY);
        this.setPosition(this.x - this.dirX, this.y - this.dirY);
    }
}