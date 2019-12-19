let nivel;
let nivelMax;

export default class Mapa extends Phaser.Scene {
    constructor() {
      super({ key: 'Mapa' });
      nivelMax = 2;
    }
    
    preload() {  
        this.load.on("complete", () => { this.scene.start("Mapa"); });
        this.load.image("mapa", "./assets/MapaNiveles.png");
        this.load.image("niveles", "./assets/patronNiveles.png");
        this.load.image("1", "./assets/1.png");
        this.load.image("2", "./assets/2.png");
        this.load.image("3", "./assets/3.png");
        this.load.image("4", "./assets/4.png");
        this.load.image("5", "./assets/5.png");
        this.load.image("6", "./assets/6.png");
        this.load.image("7", "./assets/7.png");
    }
    
    create() {
        this.add.image(0, 0, "mapa").setOrigin(0);
        this.add.image(0, 0, "niveles").setOrigin(0);

        let nX;
        for (let i = 0; i < nivelMax; i++) {
            switch (i) {
                case 0:
                    nX = this.add.image(159, 151, "1");
                    break;
                case 1:
                    nX = this.add.image(446, 243, "2");
                    break;
                case 2:
                    nX = this.add.image(472, 475, "3");
                    break;
                case 3:
                    nX = this.add.image(271, 669, "4");
                    break;
                case 4:
                    nX = this.add.image(747, 702, "5");
                    break;
                case 5:
                    nX = this.add.image(1098, 489, "6");
                    break;
                case 6:
                    nX = this.add.image(1220, 217, "7");
                    break;
            }
            this.seleccNivel(nX, i + 1);
        }
    }

    seleccNivel(nX, i) {
        nX.setInteractive();
        nX.on('pointerdown', pointer => {
            nivel = i;
            this.scene.start("main");
        });
    }
}

//ACTUALIZA EL NIVEL
export function sigNivelActual() {
    nivel++;
}
export function sigNivelMax() {
    nivelMax++;
}
//DEVUELVE EL NIVEL QUE SE QUIERE CARGAR
export function getNivelActual() {
    return nivel;
}
//DEVUELVE EL TOTAL DE PARTIDAS QUE HAN SIDO DESBLOQUEADAS
export function getNivelMax() {
    return nivelMax;
}