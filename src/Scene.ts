import GLScene from "smartgl/lib/GLScene";
import IDrawable from "smartgl/lib/interfaces/IDrawable";
import Point4D from "smartgl/lib/Point4D";
import Square from "smartgl/lib/forms/Square";

import Triangle from "./Forms/Triangle"

export default class Scene extends GLScene {
    private shapes: IDrawable[] = [];

    protected onInit() {
        this.canvas.addEventListener("mousedown", this.onClick.bind(this));
    }

    protected render(): void {
        this.shapes.forEach(shape => this.draw(0, 0, shape.draw(), shape.draw().length));
    }

    private onClick(e: MouseEvent) {
        let center = this.getCenterLocation(e.clientX, e.clientY);

        this.shapes.push(this.getSelectedOption(center, 5));

        this.render();
    }

    private getCenterLocation(x: number, y: number) {
        let pixelLocation = new Point4D(x, y);
        let rectangle = this.canvas.getBoundingClientRect();
        return this.toClipping(pixelLocation, rectangle);
    }

    private getSelectedOption(center: Point4D, size: number): IDrawable {
        let selectedShape = document.getElementById("shapeSelected") as HTMLSelectElement;
        let option = selectedShape.value;

        switch (option) {
            case "Square":
                return new Square(center, size);
            case "Triangle":
                return new Triangle(this.gl, center, size);
        }

        return new Square(center, size);
    }

    public reset() {
        this.shapes = [];
        this.render();
    }

    private toClipping(point: Point4D, rect: ClientRect): Point4D {
        const x = 2 * (point.x - rect.left) / this.canvas.width - 1;
        const y = 2 * (rect.top - point.y) / this.canvas.height + 1;
        return new Point4D(x, y);
    }
}