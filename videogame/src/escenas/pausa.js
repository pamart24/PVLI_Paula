export default class Pausa extends Phaser.Scene {
    constructor() {
        super({ key: "Pausa" });
    }

    preload() {
        this.load.on("complete", () => { this.scene.start("Pausa"); });
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
        let bg = this.add.image(0, 0, "fondoCols").setOrigin(0);
        bg.alpha = 0.5;
        this.boton1 = this.add.image(515, 380, "siguiente0").setScale(0.7).setInteractive();
        this.boton2 = this.add.image(885, 380, "volver0").setScale(0.7).setInteractive();
    }

    update() {
        //BOTÓN PARA REAUNUDAR
        this.boton1.on('pointerover', pointer => {
            this.boton1.destroy();
            this.boton2.destroy();
            this.boton1 = this.add.image(515, 380, "siguiente1").setScale(0.7).setInteractive();
            this.boton2 = this.add.image(885, 380, "volver0").setScale(0.7).setInteractive();
            this.boton1.on('pointerdown', pointer => {
                this.boton1.destroy();
                this.boton1 = this.add.image(515, 380, "siguiente2").setScale(0.7).setInteractive();
                this.boton1.on('pointerup', pointer => {
                    var g = this.scene.get("main");
                    g.resumeGame();
                    this.scene.resume("main");
                    this.scene.stop("Pausa");
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
                this.boton2.on('pointerup', pointer => { 
                    this.scene.stop("main");
                    this.scene.start("Mapa");
                });
            });
        });
    }
}