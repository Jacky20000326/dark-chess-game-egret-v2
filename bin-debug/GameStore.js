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
var GameStore = (function () {
    function GameStore() {
        var _this = this;
        this.SetWinner = function (winner) {
            _this.winner = winner;
        };
        this.preChooseChess = null;
        this.occupiedState = null;
        this.count = 0;
        this.winner = null;
    }
    GameStore.prototype.SetpreChooseChess = function (preChooseChess) {
        this.preChooseChess = preChooseChess;
    };
    GameStore.prototype.SetOccupiedState = function (occupiedState) {
        this.occupiedState = occupiedState;
    };
    GameStore.prototype.ResetpreChooseChess = function () {
        this.preChooseChess = null;
    };
    GameStore.prototype.MoveCount = function (state) {
        var DrawChess = 50;
        if (state == "ReSetCount") {
            this.count = 0;
            return;
        }
        if (state == "AddCount") {
            this.count += 1;
        }
        if (this.count == DrawChess) {
            this.winner = "平局";
        }
    };
    return GameStore;
}());
exports.GameStore = GameStore;
__reflect(GameStore.prototype, "\"/Users/user/Documents/Photons/Egret Project/Project 0411/src/GameStore\".GameStore");
var Request = (function () {
    function Request(currPlayer, currChess, gameState, AllChessArr, switchPlayer) {
        this.currPlayer = currPlayer;
        this.currChess = currChess;
        this.gameState = gameState;
        this.AllChessArr = AllChessArr;
        this.switchPlayer = switchPlayer;
    }
    return Request;
}());
exports.Request = Request;
__reflect(Request.prototype, "\"/Users/user/Documents/Photons/Egret Project/Project 0411/src/GameStore\".Request");
var Handler = (function () {
    function Handler() {
    }
    Handler.prototype.SetCondition = function (condition) {
        this.condition = condition;
    };
    Handler.prototype.HandleRequest = function () { };
    return Handler;
}());
exports.Handler = Handler;
__reflect(Handler.prototype, "\"/Users/user/Documents/Photons/Egret Project/Project 0411/src/GameStore\".Handler");
var HeadHandler = (function (_super) {
    __extends(HeadHandler, _super);
    function HeadHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HeadHandler.prototype.HandleRequest = function (request) {
        this.condition.HandleRequest(request);
    };
    return HeadHandler;
}(Handler));
exports.HeadHandler = HeadHandler;
__reflect(HeadHandler.prototype, "\"/Users/user/Documents/Photons/Egret Project/Project 0411/src/GameStore\".HeadHandler");
var ChoseSameCampChess = (function (_super) {
    __extends(ChoseSameCampChess, _super);
    function ChoseSameCampChess() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ChoseSameCampChess.prototype.HandleRequest = function (request) {
        if (request.gameState.preChooseChess !== null) {
            this.condition.HandleRequest(request);
            return;
        }
        if (request.currPlayer.camp !== request.currChess.belong) {
            alert("please pick " + request.currPlayer.camp + " color chess,thanks.");
        }
        else if (request.currChess.state == "none") {
            alert("There is no chess.");
        }
        else {
            // 互叫選取狀態
            request.currChess.ConCreteSetChoose();
            //  儲存選取棋子
            request.gameState.SetpreChooseChess(request.currChess);
        }
    };
    return ChoseSameCampChess;
}(Handler));
exports.ChoseSameCampChess = ChoseSameCampChess;
__reflect(ChoseSameCampChess.prototype, "\"/Users/user/Documents/Photons/Egret Project/Project 0411/src/GameStore\".ChoseSameCampChess");
var EatChess = (function (_super) {
    __extends(EatChess, _super);
    function EatChess() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EatChess.prototype.HandleRequest = function (request) {
        if (request.currChess.state == "open") {
            request.gameState.preChooseChess.ConcreteAggressive(request.currChess, request.AllChessArr, request.switchPlayer, request.currPlayer, request.gameState);
            request.gameState.ResetpreChooseChess();
            request.gameState.MoveCount("ReSetCount");
        }
        else {
            this.condition.HandleRequest(request);
        }
    };
    return EatChess;
}(Handler));
exports.EatChess = EatChess;
__reflect(EatChess.prototype, "\"/Users/user/Documents/Photons/Egret Project/Project 0411/src/GameStore\".EatChess");
var MoveChess = (function (_super) {
    __extends(MoveChess, _super);
    function MoveChess() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MoveChess.prototype.HandleRequest = function (request) {
        request.gameState.preChooseChess.ConcreteMove(request.currChess, request.AllChessArr, request.switchPlayer);
        request.gameState.ResetpreChooseChess();
        request.gameState.MoveCount("AddCount");
    };
    return MoveChess;
}(Handler));
exports.MoveChess = MoveChess;
__reflect(MoveChess.prototype, "\"/Users/user/Documents/Photons/Egret Project/Project 0411/src/GameStore\".MoveChess");
var isCannon = (function (_super) {
    __extends(isCannon, _super);
    function isCannon() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    isCannon.prototype.HandleRequest = function () {
        if (this.preChooseChess.value == "砲" || this.preChooseChess.value == "炮") {
            // 執行砲的規則
        }
        this.condition.HandleRequest();
    };
    return isCannon;
}(Handler));
exports.isCannon = isCannon;
__reflect(isCannon.prototype, "\"/Users/user/Documents/Photons/Egret Project/Project 0411/src/GameStore\".isCannon");
