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
var PlayerStore = (function () {
    function PlayerStore(camp) {
        if (camp === void 0) { camp = null; }
        this.camp = camp;
        this.score = 0;
    }
    PlayerStore.prototype.SetCamp = function (camp) {
        if (this.camp != null)
            return;
        this.camp = camp;
    };
    PlayerStore.prototype.SetScore = function (setWinner) {
        this.score += 1;
        if (this.score == 1) {
            setWinner(this.camp);
            return;
        }
        console.log(this.camp + ":" + this.score);
    };
    PlayerStore.prototype.SwitchPlayer = function () {
        this.state = !this.state;
    };
    return PlayerStore;
}());
exports.PlayerStore = PlayerStore;
__reflect(PlayerStore.prototype, "\"/Users/user/Documents/Photons/Egret Project/Project 0411/src/PlayerState\".PlayerStore");
var Player1 = (function (_super) {
    __extends(Player1, _super);
    function Player1() {
        var _this = _super.call(this) || this;
        _this.state = true;
        return _this;
    }
    return Player1;
}(PlayerStore));
exports.Player1 = Player1;
__reflect(Player1.prototype, "\"/Users/user/Documents/Photons/Egret Project/Project 0411/src/PlayerState\".Player1");
var Player2 = (function (_super) {
    __extends(Player2, _super);
    function Player2() {
        var _this = _super.call(this) || this;
        _this.state = false;
        return _this;
    }
    return Player2;
}(PlayerStore));
exports.Player2 = Player2;
__reflect(Player2.prototype, "\"/Users/user/Documents/Photons/Egret Project/Project 0411/src/PlayerState\".Player2");
exports.player1 = new Player1();
exports.player2 = new Player2();
