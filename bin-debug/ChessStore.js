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
// import { v4 as RandomId } from "uuid";
// import { player1, player2 } from "../Store/PlayerState";
// 方法工廠
var ChessInfo = (function () {
    function ChessInfo(value, quantity, rank, belong, imageIndex) {
        this.id = Math.random();
        this.state = "close";
        this.stage = new ChessCloseStage(this);
        this.value = value;
        this.quantity = quantity;
        this.rank = rank;
        this.imageIndex = imageIndex;
        this.belong = belong;
        this.isChoose = false;
    }
    ChessInfo.prototype.MoveAction = function (currChess, getAllChess) {
        var _this = this;
        var PreChessIndex = getAllChess.findIndex(function (item) { return item.id == _this.id; });
        var CurrChessResultIndex = getAllChess.findIndex(function (item) { return item.id == currChess.id; });
        var temp = getAllChess[PreChessIndex];
        getAllChess[PreChessIndex] = getAllChess[CurrChessResultIndex];
        getAllChess[CurrChessResultIndex] = temp;
        console.log("移動");
    };
    ChessInfo.prototype.ConcreteSetStage = function (context) {
        this.stage.SetStage(context);
    };
    ChessInfo.prototype.ConcreteOpen = function () {
        this.stage.Open();
    };
    ChessInfo.prototype.ConcreteMove = function (currChess, getAllChess, switchPlayer) {
        this.stage.Move(currChess, getAllChess, switchPlayer);
    };
    ChessInfo.prototype.ConcreteBeingInvaded = function () {
        this.stage.BeingInvaded();
    };
    ChessInfo.prototype.ConcreteAggressive = function (currChess, getAllChess, switchPlayer, currPlayer, gameState) {
        this.stage.Aggressive(currChess, getAllChess, switchPlayer, currPlayer, gameState);
    };
    ChessInfo.prototype.ConCreteSetChoose = function () {
        this.stage.SetChoose();
    };
    ChessInfo.prototype.ConCreteResetChoose = function () {
        this.stage.ResetChoose();
    };
    return ChessInfo;
}());
__reflect(ChessInfo.prototype, "ChessInfo");
var ChessList = (function () {
    function ChessList() {
        this.List = [];
    }
    ChessList.prototype.AddChessToList = function (Chess) {
        var quantity = Chess.CreateBlueChessInfo().quantity;
        for (var i = 1; i <= quantity; i++) {
            this.List.push(Chess.CreateBlueChessInfo());
            this.List.push(Chess.CreateRedChessInfo());
        }
    };
    ChessList.prototype.ShuffleArray = function () {
        this.List.sort(function () { return Math.random() - 0.5; });
    };
    return ChessList;
}());
__reflect(ChessList.prototype, "ChessList");
var createChessInfoFactory = (function () {
    function createChessInfoFactory() {
    }
    createChessInfoFactory.prototype.CreateChessInfo = function () { };
    return createChessInfoFactory;
}());
__reflect(createChessInfoFactory.prototype, "createChessInfoFactory");
// 抽成設定檔(config)(Ex. 將 -> kingBlue 由設定檔決定，能在改動時不碰到程式碼)
var KingChessInfo = (function (_super) {
    __extends(KingChessInfo, _super);
    function KingChessInfo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    KingChessInfo.prototype.CreateBlueChessInfo = function () {
        return new ChessInfo("將", 1, 1, "blue", 1);
    };
    KingChessInfo.prototype.CreateRedChessInfo = function () {
        return new ChessInfo("帥", 1, 1, "red", 8);
    };
    return KingChessInfo;
}(createChessInfoFactory));
__reflect(KingChessInfo.prototype, "KingChessInfo");
var SoldierChessInfo = (function (_super) {
    __extends(SoldierChessInfo, _super);
    function SoldierChessInfo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SoldierChessInfo.prototype.CreateBlueChessInfo = function () {
        return new ChessInfo("士", 2, 2, "blue", 2);
    };
    SoldierChessInfo.prototype.CreateRedChessInfo = function () {
        return new ChessInfo("仕", 2, 2, "red", 9);
    };
    return SoldierChessInfo;
}(createChessInfoFactory));
__reflect(SoldierChessInfo.prototype, "SoldierChessInfo");
var ElephantChessInfo = (function (_super) {
    __extends(ElephantChessInfo, _super);
    function ElephantChessInfo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ElephantChessInfo.prototype.CreateBlueChessInfo = function () {
        return new ChessInfo("象", 2, 3, "blue", 3);
    };
    ElephantChessInfo.prototype.CreateRedChessInfo = function () {
        return new ChessInfo("相", 2, 3, "red", 10);
    };
    return ElephantChessInfo;
}(createChessInfoFactory));
__reflect(ElephantChessInfo.prototype, "ElephantChessInfo");
var CarChessInfo = (function (_super) {
    __extends(CarChessInfo, _super);
    function CarChessInfo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CarChessInfo.prototype.CreateBlueChessInfo = function () {
        return new ChessInfo("車", 2, 4, "blue", 4);
    };
    CarChessInfo.prototype.CreateRedChessInfo = function () {
        return new ChessInfo("俥", 2, 4, "red", 11);
    };
    return CarChessInfo;
}(createChessInfoFactory));
__reflect(CarChessInfo.prototype, "CarChessInfo");
var HorseChessInfo = (function (_super) {
    __extends(HorseChessInfo, _super);
    function HorseChessInfo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HorseChessInfo.prototype.CreateBlueChessInfo = function () {
        return new ChessInfo("馬", 2, 5, "blue", 5);
    };
    HorseChessInfo.prototype.CreateRedChessInfo = function () {
        return new ChessInfo("傌", 2, 5, "red", 12);
    };
    return HorseChessInfo;
}(createChessInfoFactory));
__reflect(HorseChessInfo.prototype, "HorseChessInfo");
var CannonChessInfo = (function (_super) {
    __extends(CannonChessInfo, _super);
    function CannonChessInfo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CannonChessInfo.prototype.CreateBlueChessInfo = function () {
        return new ChessInfo("炮", 2, 6, "blue", 6);
    };
    CannonChessInfo.prototype.CreateRedChessInfo = function () {
        return new ChessInfo("砲", 4, 6, "red", 13);
    };
    return CannonChessInfo;
}(createChessInfoFactory));
__reflect(CannonChessInfo.prototype, "CannonChessInfo");
var PawnChessInfo = (function (_super) {
    __extends(PawnChessInfo, _super);
    function PawnChessInfo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PawnChessInfo.prototype.CreateBlueChessInfo = function () {
        return new ChessInfo("卒", 5, 7, "blue", 7);
    };
    PawnChessInfo.prototype.CreateRedChessInfo = function () {
        return new ChessInfo("兵", 5, 7, "red", 14);
    };
    return PawnChessInfo;
}(createChessInfoFactory));
__reflect(PawnChessInfo.prototype, "PawnChessInfo");
// 跟改棋子狀態要用狀態模式來寫/open/close/none
var Stage = (function () {
    function Stage() {
    }
    Stage.prototype.Open = function () { };
    Stage.prototype.Move = function () { };
    Stage.prototype.BeingInvaded = function () { };
    Stage.prototype.Aggressive = function () { };
    Stage.prototype.SetStage = function () { };
    Stage.prototype.SetChoose = function () { };
    Stage.prototype.ResetChoose = function () { };
    return Stage;
}());
__reflect(Stage.prototype, "Stage");
// close
var ChessCloseStage = (function (_super) {
    __extends(ChessCloseStage, _super);
    function ChessCloseStage(chess) {
        var _this = _super.call(this) || this;
        _this.chess = chess;
        return _this;
    }
    ChessCloseStage.prototype.Open = function () {
        this.chess.state = "open";
        this.chess.ConcreteSetStage(new ChessOpenStage(this.chess));
    };
    ChessCloseStage.prototype.Move = function () {
        console.log("不能移動");
    };
    ChessCloseStage.prototype.BeingInvaded = function () {
        console.log("不會被佔領");
    };
    ChessCloseStage.prototype.Aggressive = function () {
        console.log("不能佔領別人");
    };
    ChessCloseStage.prototype.SetStage = function (context) {
        this.chess.stage = context;
    };
    ChessCloseStage.prototype.SetChoose = function () {
        console.log("還不能選取");
    };
    return ChessCloseStage;
}(Stage));
__reflect(ChessCloseStage.prototype, "ChessCloseStage");
// open
var ChessOpenStage = (function (_super) {
    __extends(ChessOpenStage, _super);
    function ChessOpenStage(chess) {
        var _this = _super.call(this) || this;
        _this.chess = chess;
        return _this;
    }
    ChessOpenStage.prototype.Open = function () {
        console.log("已經打開了");
    };
    ChessOpenStage.prototype.Move = function (currChess, getAllChess, switchPlayer) {
        var _this = this;
        var PreChessIndex = getAllChess.findIndex(function (item) { return item.id == _this.chess.id; });
        var CurrChessResultIndex = getAllChess.findIndex(function (item) { return item.id == currChess.id; });
        var topChessIndex = CurrChessResultIndex + 1 - 8;
        var downChessIndex = CurrChessResultIndex + 1 + 8;
        var rightChessIndex = CurrChessResultIndex + 1 + 1;
        var leftChessIndex = CurrChessResultIndex + 1 - 1;
        if (PreChessIndex + 1 == topChessIndex ||
            PreChessIndex + 1 == downChessIndex ||
            PreChessIndex + 1 == rightChessIndex ||
            PreChessIndex + 1 == leftChessIndex) {
            this.chess.MoveAction(currChess, getAllChess);
            switchPlayer();
        }
        else {
            alert("Cannot move");
            return;
        }
    };
    ChessOpenStage.prototype.BeingInvaded = function () {
        console.log("被佔領");
    };
    ChessOpenStage.prototype.Aggressive = function (currChess, getAllChess, switchPlayer, currPlayer, gameState) {
        // 將(帥)兵(卒)規則 // 若為六可以吃
        var result;
        result = currChess.rank - this.chess.rank == 6 ? "kingCannotAggressive" : "kingAggressive";
        result = currChess.rank - this.chess.rank == -6 ? "PawnAggressive" : "PawncannotAggressive";
        if (result == "kingCannotAggressive") {
            alert("Cannot eat a chess piece bigger than oneself");
            return;
        }
        if (currChess.rank >= this.chess.rank || result == "PawnAggressive") {
            this.Move(currChess, getAllChess, switchPlayer);
            currChess.state = "none";
            currChess.ConcreteSetStage(new ChessNoneStage(this.chess));
            currPlayer.SetScore(gameState.SetWinner);
            return;
        }
        alert("Cannot eat a chess piece bigger than oneself");
    };
    ChessOpenStage.prototype.SetChoose = function () {
        if (this.chess.rank == 6) {
            this.chess.ConcreteSetStage(new ChessCannonStage(this.chess));
        }
        this.chess.isChoose = true;
    };
    ChessOpenStage.prototype.ResetChoose = function () {
        this.chess.isChoose = false;
    };
    ChessOpenStage.prototype.SetStage = function (context) {
        this.chess.stage = context;
    };
    return ChessOpenStage;
}(Stage));
__reflect(ChessOpenStage.prototype, "ChessOpenStage");
// Cannon
var ChessCannonStage = (function (_super) {
    __extends(ChessCannonStage, _super);
    function ChessCannonStage(chess) {
        var _this = _super.call(this) || this;
        _this.chess = chess;
        return _this;
    }
    ChessCannonStage.prototype.SetChoose = function () {
        console.log("none");
    };
    ChessCannonStage.prototype.Open = function () {
        console.log("cannon open");
    };
    ChessCannonStage.prototype.Move = function (currChess, getAllChess, switchPlayer) {
        var _this = this;
        var PreChessIndex = getAllChess.findIndex(function (item) { return item.id == _this.chess.id; });
        var CurrChessResultIndex = getAllChess.findIndex(function (item) { return item.id == currChess.id; });
        var topChessIndex = CurrChessResultIndex + 1 - 8;
        var downChessIndex = CurrChessResultIndex + 1 + 8;
        var rightChessIndex = CurrChessResultIndex + 1 + 1;
        var leftChessIndex = CurrChessResultIndex + 1 - 1;
        if (PreChessIndex + 1 == topChessIndex ||
            PreChessIndex + 1 == downChessIndex ||
            PreChessIndex + 1 == rightChessIndex ||
            PreChessIndex + 1 == leftChessIndex) {
            this.chess.MoveAction(currChess, getAllChess);
            switchPlayer();
        }
        else {
            alert("Cannot move");
            return;
        }
    };
    ChessCannonStage.prototype.BeingInvaded = function () {
        console.log("none");
    };
    ChessCannonStage.prototype.Aggressive = function (currChess, getAllChess, switchPlayer, currPlayer, gameState) {
        var _this = this;
        var CurrChessResultIndex = getAllChess.findIndex(function (item) { return item.id == currChess.id; });
        var PreChessIndex = getAllChess.findIndex(function (item) { return item.id == _this.chess.id; });
        console.log(currChess);
        console.log(this.chess);
        // 紀錄砲台數量
        var isOneChessInBetween = 0;
        // 砲的排數
        var compareHorizontalIndex = Math.floor(PreChessIndex / 8);
        // 目標的排數
        var targetHorizontalIndex = Math.floor(CurrChessResultIndex / 8);
        // 確認是否是與砲垂直的棋子，若為0則垂直
        var isVertical = Math.abs(CurrChessResultIndex - PreChessIndex) % 8;
        // if ((CurrChessResultIndex <= 7 && PreChessIndex > 7) || (PreChessIndex <= 7 && CurrChessResultIndex > 7)) {
        // 若為平行
        if (compareHorizontalIndex == targetHorizontalIndex) {
            for (var i = 1; i <= Math.abs(CurrChessResultIndex - PreChessIndex) - 1; i++) {
                if (getAllChess[Math.min(CurrChessResultIndex, PreChessIndex) + i].state == "open") {
                    isOneChessInBetween++;
                }
            }
            if (isOneChessInBetween == 1) {
                this.chess.MoveAction(currChess, getAllChess);
                switchPlayer();
                currChess.state = "none";
                currPlayer.SetScore(gameState.SetWinner);
                return;
            }
            alert("砲不能這樣走喔～");
            return;
        }
        // 若為垂直
        if (isVertical == 0) {
            if (Math.max(CurrChessResultIndex, PreChessIndex) - Math.min(CurrChessResultIndex, PreChessIndex) / 8 >=
                2) {
                for (var i = Math.min(CurrChessResultIndex, PreChessIndex) + 8; i < Math.max(CurrChessResultIndex, PreChessIndex); i += 8) {
                    if (getAllChess[i].state == "open") {
                        isOneChessInBetween++;
                    }
                }
                if (isOneChessInBetween == 1 && getAllChess[CurrChessResultIndex].state == "open") {
                    this.chess.MoveAction(currChess, getAllChess);
                    switchPlayer();
                    currChess.state = "none";
                    currPlayer.SetScore(gameState.SetWinner);
                }
                else {
                    alert("砲不能這樣走喔～");
                }
            }
            return;
        }
        alert("砲不能這樣走喔～");
        // }
        // console.log("cc");
    };
    ChessCannonStage.prototype.SetChoose = function () {
        this.chess.isChoose = true;
    };
    ChessCannonStage.prototype.ResetChoose = function () {
        this.chess.isChoose = false;
    };
    ChessCannonStage.prototype.SetStage = function (context) {
        this.chess.stage = context;
    };
    return ChessCannonStage;
}(Stage));
__reflect(ChessCannonStage.prototype, "ChessCannonStage");
// none
var ChessNoneStage = (function (_super) {
    __extends(ChessNoneStage, _super);
    function ChessNoneStage(chess) {
        var _this = _super.call(this) || this;
        _this.chess = chess;
        return _this;
    }
    ChessNoneStage.prototype.SetChoose = function () {
        console.log("There is no chess.");
    };
    ChessNoneStage.prototype.Open = function () {
        console.log("none");
    };
    ChessNoneStage.prototype.Move = function () {
        console.log("none");
    };
    ChessNoneStage.prototype.BeingInvaded = function () {
        console.log("none");
    };
    ChessNoneStage.prototype.Aggressive = function () {
        console.log("none");
    };
    return ChessNoneStage;
}(Stage));
__reflect(ChessNoneStage.prototype, "ChessNoneStage");
