import GameObjectsGO from "./gameObjects.js";

export default class Torre extends GameObjectsGO {
    constructor(scene, x, y, level, type){ 
        super(scene, 10, x, y, 50, type);
        this.game = scene;
        this.level = level;
        scene.add.existing(this);
        this.setInteractive();
        this.mejora(x, y, level);
        this.usaBala = true;
    }

    //MEJORA DE TORRES -- PRUEBA BASE, MOVER A HERENCIAS DE LA TORRE                  //*********//
    mejora(p, q) {
        //MODIFICAMOS LOS VALORES DE LA TORRE SEGÚN SU NIVEL
        switch (this.level) {
            case 'O':
                this.setScale(0.25);
                this.rango = 200;
                break;
            case 'A':
                this.setScale(0.8);
                this.rango = 350;
                this.daño = this.daño + 5;
                this.cadencia = this.cadencia - 20;
                break;
            case 'B':
                this.setScale(0.2);
                this.rango = 250;
                this.daño = this.daño + 15;
                this.cadencia = this.cadencia + 20;
                break;
            case 'AA':
                this.setScale(1);
                this.rango = 500;
                this.daño = this.daño + 15;
                this.cadencia = this.cadencia - 30;
                break;
            case 'BB':
                this.setScale(1);
                this.rango = 300;
                this.daño = this.daño + 30;
                this.cadencia = this.cadencia + 40;
                break;
        }

        //ACTIVAMOS LA POSIBILIDAD DE MEJORAR NUESTRA TORRE (SI SE PUEDE)
        if (this.level != 'AA' && this.level != 'BB') {
            this.on('pointerdown', pointer => {
                this.game.mejoraTorre(p, q, this);
            });
        }
    }

    //ATAQUE DE LA TORRE
    ataque(torre, enemigo) { 
        if (enemigo.active == true) super.ataque(torre, enemigo);

        //SI EL ENEMIGO SE QUEDA SIN VIDA LO DESTRUIMOS
        if (enemigo.vida <= 0) {
            enemigo.onDestroy(enemigo.unidad);
            enemigo.destroy();
        }
    }

    preUpdate() {
        this.game.children.bringToTop(this);
    }
}