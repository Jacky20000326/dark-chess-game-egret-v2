"use strict";
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
Object.defineProperty(exports, "__esModule", { value: true });
var ChessImageFlyweight = (function () {
    function ChessImageFlyweight() {
    }
    ChessImageFlyweight.prototype.operation = function () { };
    return ChessImageFlyweight;
}());
exports.ChessImageFlyweight = ChessImageFlyweight;
__reflect(ChessImageFlyweight.prototype, "\"/Users/user/Documents/Photons/Egret Project/Project 0411/src/ChessImageStore\".ChessImageFlyweight");
var BackChessConcreteFlyweight = (function (_super) {
    __extends(BackChessConcreteFlyweight, _super);
    function BackChessConcreteFlyweight() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BackChessConcreteFlyweight.prototype.operation = function () {
        return new URL("/src/assets/chesses/chessBack.png", meta.url);
    };
    return BackChessConcreteFlyweight;
}(ChessImageFlyweight));
exports.BackChessConcreteFlyweight = BackChessConcreteFlyweight;
__reflect(BackChessConcreteFlyweight.prototype, "\"/Users/user/Documents/Photons/Egret Project/Project 0411/src/ChessImageStore\".BackChessConcreteFlyweight");
var FrontChessConcreteFlyweight = (function (_super) {
    __extends(FrontChessConcreteFlyweight, _super);
    function FrontChessConcreteFlyweight() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FrontChessConcreteFlyweight.prototype.operation = function (index) {
        return new URL("/src/assets/chesses/chess" + index + ".png", meta.url);
    };
    return FrontChessConcreteFlyweight;
}(ChessImageFlyweight));
exports.FrontChessConcreteFlyweight = FrontChessConcreteFlyweight;
__reflect(FrontChessConcreteFlyweight.prototype, "\"/Users/user/Documents/Photons/Egret Project/Project 0411/src/ChessImageStore\".FrontChessConcreteFlyweight");
var ChessFlyweightFactory = (function () {
    function ChessFlyweightFactory() {
        this.flyweight = {};
        this.flyweight.backImageChess = new BackChessConcreteFlyweight();
        this.flyweight.frontImageChess = new FrontChessConcreteFlyweight();
    }
    ChessFlyweightFactory.prototype.GetResultChessImage = function (category) {
        return this.flyweight[category];
    };
    return ChessFlyweightFactory;
}());
exports.ChessFlyweightFactory = ChessFlyweightFactory;
__reflect(ChessFlyweightFactory.prototype, "\"/Users/user/Documents/Photons/Egret Project/Project 0411/src/ChessImageStore\".ChessFlyweightFactory");
