import Unidad from "./unidad.js";

export default class Hydra extends Unidad {
    constructor(scene, x, y, pR){ 
        super(scene, 15, x, y, pR, 20000, "");
        this.game = scene;
        scene.add.existing(this);
        scene.physics.world.enable(this);
        this.setScale(1);
        
        //VARIABLES AUXILIARES
        this.vida = 110;
        this.game.tiempoUnid = 5000;    //ACTUALIZAMOS EL VALOR EN GAME.JS
    }
}