export default class Derrota extends Phaser.Scene {
    constructor() {
        super({ key: "Derrota" });
    }

    preload() {
        this.load.on("complete", () => { this.scene.start("Derrota"); });
        this.load.image("derrota", "./assets/Derrota.png");
        this.load.image("reiniciar0", "./assets/ReiniciarBase.png");
        this.load.image("reiniciar1", "./assets/ReiniciarMarcado.png");
        this.load.image("reiniciar2", "./assets/ReiniciarPulsado.png");
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
        this.add.image(680, 170, "derrota").setScale(1.3);
        this.boton1 = this.add.image(515, 380, "reiniciar0").setScale(0.7).setInteractive();
        this.boton2 = this.add.image(885, 380, "volver0").setScale(0.7).setInteractive();
    }

    update() {
        //BOTÓN PARA REINICIAR EL NIVEL ACTUAL
        this.boton1.on('pointerover', pointer => {
            this.boton1.destroy();
            this.boton2.destroy();
            this.boton1 = this.add.image(515, 380, "reiniciar1").setScale(0.7).setInteractive();
            this.boton2 = this.add.image(885, 380, "volver0").setScale(0.7).setInteractive();
            this.boton1.on('pointerdown', pointer => {
                this.boton1.destroy();
                this.boton1 = this.add.image(515, 380, "reiniciar2").setScale(0.7).setInteractive();
                this.boton1.on('pointerup', pointer => { this.scene.start("main"); });
            });
        });
        //BOTÓN PARA VOLVER AL MAPA
        this.boton2.on('pointerover', pointer => {
            this.boton1.destroy();
            this.boton2.destroy();
            this.boton1 = this.add.image(515, 380, "reiniciar0").setScale(0.7).setInteractive();
            this.boton2 = this.add.image(885, 380, "volver1").setScale(0.7).setInteractive();
            this.boton2.on('pointerdown', pointer => {
                this.boton2.destroy();
                this.boton2 = this.add.image(885, 380, "volver2").setScale(0.7).setInteractive();
                this.boton2.on('pointerup', pointer => { this.scene.start("Mapa"); });
            });
        });
    }
}