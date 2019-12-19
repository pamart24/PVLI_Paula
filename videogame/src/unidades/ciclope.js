import Unidad from "./unidad.js";

export default class Ciclope extends Unidad {
    constructor(scene, x, y, pR){ 
        super(scene, 45, x, y, pR, 50000, "");
        this.game = scene;
        scene.add.existing(this);
        scene.physics.world.enable(this);
        this.setScale(1);
        
        //VARIABLES AUXILIARES
        this.vida = 250;
        this.game.tiempoUnid = 10000;    //ACTUALIZAMOS EL VALOR EN GAME.JS
    }
}