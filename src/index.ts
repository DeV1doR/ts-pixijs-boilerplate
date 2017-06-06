import * as PIXI from "pixi.js";

class Game {

    public updateId: number;
    public nextLoopTime: number;
    public deltaLoopTime: number;
    public tickRate: number;
    public lastRun: number;

    public canvas: HTMLCanvasElement;
    public renderer: PIXI.Application;
    public frameTime: number;

    constructor(name: string, width: number, height: number, frameTime: number) {
        let canvas = <HTMLCanvasElement>document.getElementById(name);
        canvas.width = width;
        canvas.height = height;

        this.canvas = canvas;
        this.renderer = new PIXI.Application(width, height, {
            legacy: true,
            view: this.canvas,
        }, true);
        this.frameTime = frameTime;
    }

    public update(): void {

    }

    public get interval(): number {
        return 1000 / this.frameTime;
    }

    private _gameLoop(): void {
        const now: number = Date.now();
        this.updateId = requestAnimationFrame(this._gameLoop.bind(this));

        this.deltaLoopTime = now - this.nextLoopTime;

        if (this.deltaLoopTime > this.interval) {
            this.update();
            this.nextLoopTime = now - (this.deltaLoopTime % this.interval);
        }
        this.tickRate = 1000 / (Date.now() - this.lastRun);
        this.lastRun = Date.now();
    }
}

window.onload = (e: any) => {
    (window as any).game = new Game('main-lp', 760, 540, 60);
};
