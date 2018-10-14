import AbstractPolygon from "smartgl/lib/forms/AbstractPolygon";
import Point4D from "smartgl/lib/Point4D";
import GLVector from "smartgl/lib/GLVector";

export default class Triangle extends AbstractPolygon {
    protected center: Point4D;
    protected radius: number;
    protected position: GLVector;
    protected color: GLVector;

    public constructor(gl: WebGLRenderingContext, center: Point4D, radius: number) {
        super();
        this.position = new GLVector(gl, 3);
        this.color = new GLVector(gl, 3);
        this.position.attributeName = "aPosition";
        this.color.attributeName = "aColor";

        this.center = center;
        this.radius = radius;

        this.setCorners(radius);
        this.setColor(255, 255, 255);
    }

    private setCorners(radius: number) {
        let base = Math.PI / 2;
        for (var i = 0; i < 3; i++) {
            let angle = base * i * (2 * Math.PI / 3);
            let x = radius * Math.cos(angle) + this.center.x;
            let y = radius * Math.sin(angle) + this.center.y;
            this.position.addPoint(new Point4D(x, y));
        }
    }

    public setColor(r: number, g: number, b: number) {
        this.color.addPoint(new Point4D(r / 255, g / 255, b / 255, 1))
    }

    public draw(): GLVector[] {
        return [this.position, this.color];
    }
}