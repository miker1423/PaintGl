import GLScene from "smartgl/lib/GLScene";
import Scene from "./Scene";

GLScene.createAsync(Scene, "canvas")
.then(scene => scene.launch());