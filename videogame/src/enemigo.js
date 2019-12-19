import GameObjectsGO from './gameObjects.js';

export default class Enemigo extends GameObjectsGO {
    constructor(scene, x, y, type){ 
        super(scene, 20, -50, -50, 20000, type);
        this.alpha = 0;
        this.game = scene;
        scene.add.existing(this);
        scene.physics.world.enable(this);
        this.setScale(1.5);
        scene.children.moveDown(this);
        
        //VARIABLES AUXILIARES
        this.t = 0;    //REPRESENTA EL MOVIMIENTO RELATIVO EN EL EJE X
        this.r = y;
        this.m = x + Phaser.Math.Between(-50, 50);  //REPRESENTA LA POSICIÓN X EN EL MAPA
        this.n = y + Phaser.Math.Between(-50, 50);  //REPRESENTA LA POSICIÓN Y EN EL MAPA
        this.dir = Phaser.Math.Between(0, 1);
        this.pausa = false;
        this.vida = 100;
        this.unidad = undefined;
        this.exp = 50;
        this.funcion = 0;
        this.cambiaAnim = true;

        //LA ANIMACIÓN SE HACE GENERANDO UN SPRITE ENCIMA DEL ENEMIGO, IGUAL QUE LA UNIDAD (VER UNIDAD.JS)
        this.animacion = this.game.add.sprite(x, y, type).setScale(2.5).play('diabloDer');
    }

    //MOVIMIENTO DEL ENEMIGO
    movEnem(){
        if (!this.pausa) {
            switch (this.game.nivel) {
                case 1:
                    if (this.cambiaAnim) {
                        this.animacion.play('diabloDer');
                        this.cambiaAnim = false;
                    }
                    this.setPosition(this.t * 25, this.n + 150 * Math.sin(this.t/7));
                    this.animacion.setPosition(this.t * 25, this.n + 150 * Math.sin(this.t/7));
                    this.t += 0.05;
                    break;
                case 2:
                    //DISPONEMOS DE 2 CAMINOS EN ESTE NIVEL (DIR)
                    //CADA CAMINO ESTÁ FORMADO POR 2 FUNCIONES CADA UNO
                    if (this.funcion == 0) {
                        if (this.cambiaAnim) {
                            if (this.dir == 0) this.animacion.play('diabloIzq');
                            if (this.dir == 1) this.animacion.play('diabloDer');
                            this.cambiaAnim = false;
                        }
                        let y0 = -2.5 * Math.sqrt(1 - Math.sqrt(Math.abs(this.t/7) / 2));
                        if (!isNaN(y0)) {
                            this.setPosition(this.m + this.t * 25, this.r - 200 * y0);
                            this.animacion.setPosition(this.m + this.t * 25, this.r - 200 * y0);
                        }
                        else {
                            if (this.dir == 0) this.m += (this.t + 0.05) * 25;
                            if (this.dir == 1) this.m += (this.t - 0.05) * 25;
                            this.t = 0;
                            this.funcion = 1;
                            this.cambiaAnim = true;
                        }
                        if (this.dir == 0) this.t -= 0.05;
                        if (this.dir == 1) this.t += 0.05;
                    }
                    if (this.funcion == 1) {
                        if (this.cambiaAnim) {
                            if (this.dir == 0) this.animacion.play('diabloDer');
                            if (this.dir == 1) this.animacion.play('diabloIzq');
                            this.cambiaAnim = false;
                        }
                        let y1 = Math.sqrt(1 - (Math.pow(Math.abs(this.t/7) - 1, 2)));
                        if (!isNaN(y1)) {
                            this.setPosition(this.m + this.t * 25, this.r - 200 * y1);
                            this.animacion.setPosition(this.m + this.t * 25, this.r - 200 * y1);
                        }
                        if (this.dir == 0) this.t += 0.05;
                        if (this.dir == 1) this.t -= 0.05;
                    }
                    break;
            }
        }
    }

    //ATAQUE DEL ENEMIGO AL NÚCLEO, ATACA UNA VEZ Y SE DESTRUYE
    ataqueNucleo(obj1, obj2) {
        //TENEMOS QUE ASEGURARNOS QUE ATACARÁ (CADENCIA_AUX = 0)
        obj1.cadenciaAux = 0;
        super.ataque(obj1, obj2);
        obj1.destroy();
        obj1.animacion.destroy();
        //ACTUALIZAMOS LA BARRA DE VIDA DEL NÚCLEO
        obj2.barraSalud();
        if (obj2.vida <= 0) obj2.onDestroy();
    }

    //ACCIONES CORRESPONDIENTES TRAS LA ELIMINACIÓN DE UN ENEMIGO
    onDestroy(){
        if(this.unidad != undefined){
            this.unidad.pausa = false;
            this.unidad.enemigo = undefined;
            this.unidad.cadenciaAux = 0;
        }
        this.animacion.destroy();
        this.game.ptosExp += this.exp;  //SUMAMOS LOS PTOS DE EXP DEL ENEMIGO
        super.muestraPtos();    //ACTUALIZAMOS LOS PTOS DE EXP
    }

    preUpdate() {
        this.movEnem();
    }
}