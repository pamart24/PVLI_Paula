import GameObjectsGO from './gameObjects.js';

export default class Base extends GameObjectsGO {
    constructor(scene, x, y, type){
        super(scene, 0, x, y, 0, type);
        scene.add.existing(this);
        this.setScale(1/5);
        this.setInteractive();
    }
}
