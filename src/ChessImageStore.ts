

class ChessImageFlyweight {
    operation() {}
}

class BackChessConcreteFlyweight extends ChessImageFlyweight {
    operation() {
        return new URL(`/src/assets/chesses/chessBack.png`, import.meta.url);
    }
}
class FrontChessConcreteFlyweight extends ChessImageFlyweight {
    operation(index) {
        return new URL(`/src/assets/chesses/chess${index}.png`, import.meta.url);
    }
}

class ChessFlyweightFactory {
    constructor() {
        this.flyweight = {};
        this.flyweight.backImageChess = new BackChessConcreteFlyweight();
        this.flyweight.frontImageChess = new FrontChessConcreteFlyweight();
    }

    GetResultChessImage(category) {
        return this.flyweight[category];
    }
}