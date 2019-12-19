import { sigNivelMax, sigNivelActual, getNivelActual, getNivelMax } from './mapa.js';

export default class Victoria extends Phaser.Scene {
    constructor() {
        super({ key: "Victoria" });
    }

    preload() {
        this.load.on("complete", () => { this.scene.start("Victoria"); });
        this.load.image("victoria", "./assets/Victoria.png");
        this.load.image("siguiente0", "./assets/sigBase.png");
        this.load.image("siguiente1", "./assets/sigMarcado.png");
        this.load.image("siguiente2", "./assets/sigPulsado.png");
        this.load.image("volver0", "./assets/VolverBase.png");
        this.load.image("volver1", "./assets/VolverMarcado.png");
        this.load.image("volver2", "./assets/VolverPulsado.png");
        this.w = this.sys.game.config.width / 2;
        this.h = this.sys.game.config.height / 2;
    }

    create() {
        let pointer = this.input.activePointer;
        this.input.mouse.disableContextMenu();
        this.add.image(0, 0, "fondoCols").setOrigin(0);
        this.add.image(700, 170, "victoria").setScale(1.3);
        this.boton1 = this.add.image(515, 380, "siguiente0").setScale(0.7).setInteractive();
        this.boton2 = this.add.image(885, 380, "volver0").setScale(0.7).setInteractive();
        
        //SI EL NIVEL SUPERADO ERA EL ÚLTIMO DISPONIBLE SE DESBLOQUEA EL SIGUIENTE
        if (getNivelActual() == getNivelMax()) sigNivelMax();
    }

    update() {
        //BOTÓN PARA LA SIGUIENTE PARTIDA
        this.boton1.on('pointerover', pointer => {
            this.boton1.destroy();
            this.boton2.destroy();
            this.boton1 = this.add.image(515, 380, "siguiente1").setScale(0.7).setInteractive();
            this.boton2 = this.add.image(885, 380, "volver0").setScale(0.7).setInteractive();
            this.boton1.on('pointerdown', pointer => {
                this.boton1.destroy();
                this.boton1 = this.add.image(515, 380, "siguiente2").setScale(0.7).setInteractive();
                this.boton1.on('pointerup', pointer => {
                    //SIGUIENTE NIVEL AL JUGADO
                    sigNivelActual();
                    this.scene.start("main");
                });
            });
        });
        //BOTÓN PARA VOLVER AL MAPA
        this.boton2.on('pointerover', pointer => {
            this.boton1.destroy();
            this.boton2.destroy();
            this.boton1 = this.add.image(515, 380, "siguiente0").setScale(0.7).setInteractive();
            this.boton2 = this.add.image(885, 380, "volver1").setScale(0.7).setInteractive();
            this.boton2.on('pointerdown', pointer => {
                this.boton2.destroy();
                this.boton2 = this.add.image(885, 380, "volver2").setScale(0.7).setInteractive();
                this.boton2.on('pointerup', pointer => { this.scene.start("Mapa"); });
            });
        });
    }
}