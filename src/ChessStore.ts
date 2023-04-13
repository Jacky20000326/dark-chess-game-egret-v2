// import { v4 as RandomId } from "uuid";
// import { player1, player2 } from "../Store/PlayerState";
// 方法工廠
 class ChessInfo {
    constructor(value, quantity, rank, belong, imageIndex) {
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
    MoveAction(currChess, getAllChess) {
        let PreChessIndex = getAllChess.findIndex((item) => item.id == this.id);
        let CurrChessResultIndex = getAllChess.findIndex((item) => item.id == currChess.id);

        let temp = getAllChess[PreChessIndex];
        getAllChess[PreChessIndex] = getAllChess[CurrChessResultIndex];
        getAllChess[CurrChessResultIndex] = temp;
    }
    ConcreteSetStage(context) {
        this.stage.SetStage(context);
    }
    ConcreteOpen() {
        this.stage.Open();
    }
    ConcreteMove(currChess, getAllChess, switchPlayer) {
        this.stage.Move(currChess, getAllChess, switchPlayer);
    }
    ConcreteBeingInvaded() {
        this.stage.BeingInvaded();
    }
    ConcreteAggressive(currChess, getAllChess, switchPlayer, currPlayer, gameState) {
        this.stage.Aggressive(currChess, getAllChess, switchPlayer, currPlayer, gameState);
    }
    ConCreteSetChoose() {
        this.stage.SetChoose();
    }
    ConCreteResetChoose() {
        this.stage.ResetChoose();
    }
}

class ChessList {
    constructor() {
        this.List = [];
    }

    AddChessToList(Chess) {
        let quantity = Chess.CreateBlueChessInfo().quantity;
        for (var i = 1; i <= quantity; i++) {
            this.List.push(Chess.CreateBlueChessInfo());
            this.List.push(Chess.CreateRedChessInfo());
        }
    }

    ShuffleArray() {
        this.List.sort(() => Math.random() - 0.5);
    }
}

 class createChessInfoFactory {
    CreateChessInfo() {}
}

// 抽成設定檔(config)(Ex. 將 -> kingBlue 由設定檔決定，能在改動時不碰到程式碼)
 class KingChessInfo extends createChessInfoFactory {
    CreateBlueChessInfo() {
        return new ChessInfo("將", 1, 1, "blue", 1);
    }
    CreateRedChessInfo() {
        return new ChessInfo("帥", 1, 1, "red", 8);
    }
}

 class SoldierChessInfo extends createChessInfoFactory {
    CreateBlueChessInfo() {
        return new ChessInfo("士", 2, 2, "blue", 2);
    }
    CreateRedChessInfo() {
        return new ChessInfo("仕", 2, 2, "red", 9);
    }
}

 class ElephantChessInfo extends createChessInfoFactory {
    CreateBlueChessInfo() {
        return new ChessInfo("象", 2, 3, "blue", 3);
    }
    CreateRedChessInfo() {
        return new ChessInfo("相", 2, 3, "red", 10);
    }
}

 class CarChessInfo extends createChessInfoFactory {
    CreateBlueChessInfo() {
        return new ChessInfo("車", 2, 4, "blue", 4);
    }
    CreateRedChessInfo() {
        return new ChessInfo("俥", 2, 4, "red", 11);
    }
}

 class HorseChessInfo extends createChessInfoFactory {
    CreateBlueChessInfo() {
        return new ChessInfo("馬", 2, 5, "blue", 5);
    }
    CreateRedChessInfo() {
        return new ChessInfo("傌", 2, 5, "red", 12);
    }
}

 class CannonChessInfo extends createChessInfoFactory {
    CreateBlueChessInfo() {
        return new ChessInfo("炮", 2, 6, "blue", 6);
    }
    CreateRedChessInfo() {
        return new ChessInfo("砲", 4, 6, "red", 13);
    }
}

 class PawnChessInfo extends createChessInfoFactory {
    CreateBlueChessInfo() {
        return new ChessInfo("卒", 5, 7, "blue", 7);
    }
    CreateRedChessInfo() {
        return new ChessInfo("兵", 5, 7, "red", 14);
    }
}

// 跟改棋子狀態要用狀態模式來寫/open/close/none

class Stage {
    Open() {}
    Move() {}
    BeingInvaded() {}
    Aggressive() {}
    SetStage() {}
    SetChoose() {}
    ResetChoose() {}
}

// close
 class ChessCloseStage extends Stage {
    constructor(chess) {
        super();

        this.chess = chess;
    }
    Open() {
        this.chess.state = "open";

        this.chess.ConcreteSetStage(new ChessOpenStage(this.chess));
    }
    Move() {
        console.log("不能移動");
    }
    BeingInvaded() {
        console.log("不會被佔領");
    }
    Aggressive() {
        console.log("不能佔領別人");
    }
    SetStage(context) {
        this.chess.stage = context;
    }
    SetChoose() {
        console.log("還不能選取");
    }
}
// open
 class ChessOpenStage extends Stage {
    constructor(chess) {
        super();
        this.chess = chess;
    }

    Open() {
        console.log("已經打開了");
    }

    Move(currChess, getAllChess, switchPlayer) {
        let PreChessIndex = getAllChess.findIndex((item) => item.id == this.chess.id);
        let CurrChessResultIndex = getAllChess.findIndex((item) => item.id == currChess.id);

        let topChessIndex = CurrChessResultIndex + 1 - 8;
        let downChessIndex = CurrChessResultIndex + 1 + 8;
        let rightChessIndex = CurrChessResultIndex + 1 + 1;
        let leftChessIndex = CurrChessResultIndex + 1 - 1;
        if (
            PreChessIndex + 1 == topChessIndex ||
            PreChessIndex + 1 == downChessIndex ||
            PreChessIndex + 1 == rightChessIndex ||
            PreChessIndex + 1 == leftChessIndex
        ) {
            this.chess.MoveAction(currChess, getAllChess);
            switchPlayer();
        } else {
            alert("Cannot move");
            return;
        }
    }
    BeingInvaded() {
        console.log("被佔領");
    }
    Aggressive(currChess, getAllChess, switchPlayer, currPlayer, gameState) {
        // 將(帥)兵(卒)規則 // 若為六可以吃
        let KingRull;
        let PawnRull
        KingRull = currChess.rank - this.chess.rank == 6 ? "kingCannotAggressive" : "kingAggressive";
        let PawnRull = currChess.rank - this.chess.rank == -6 ? "PawnCanAggressive" : "PawnCannotAggressive";
        if(currChess.belong == this.chess.belong){
            alert("It's my chess")
            return
        }
        if (KingRull == "kingCannotAggressive") {
            alert("Cannot eat a chess piece bigger than oneself");
            return;
        }

        if (currChess.rank >= this.chess.rank || PawnRull == "PawnCanAggressive") {
            this.Move(currChess, getAllChess, switchPlayer);
            currChess.state = "none";
            currChess.ConcreteSetStage(new ChessNoneStage(this.chess));
            currPlayer.SetScore(gameState.SetWinner);
            return;
        }
        alert("Cannot eat a chess piece bigger than oneself");
    }
    SetChoose() {
        if (this.chess.rank == 6) {
            this.chess.ConcreteSetStage(new ChessCannonStage(this.chess));
        }

        this.chess.isChoose = true;
    }
    ResetChoose() {
        this.chess.isChoose = false;
    }
    SetStage(context) {
        this.chess.stage = context;
    }
}
// Cannon
 class ChessCannonStage extends Stage {
    constructor(chess) {
        super();
        this.chess = chess;
    }
    SetChoose() {
        console.log("none");
    }
    Open() {
        console.log("cannon open");
    }
    Move(currChess, getAllChess, switchPlayer) {
        let PreChessIndex = getAllChess.findIndex((item) => item.id == this.chess.id);
        let CurrChessResultIndex = getAllChess.findIndex((item) => item.id == currChess.id);

        let topChessIndex = CurrChessResultIndex + 1 - 8;
        let downChessIndex = CurrChessResultIndex + 1 + 8;
        let rightChessIndex = CurrChessResultIndex + 1 + 1;
        let leftChessIndex = CurrChessResultIndex + 1 - 1;
        if (
            PreChessIndex + 1 == topChessIndex ||
            PreChessIndex + 1 == downChessIndex ||
            PreChessIndex + 1 == rightChessIndex ||
            PreChessIndex + 1 == leftChessIndex
        ) {
            this.chess.MoveAction(currChess, getAllChess);
            switchPlayer();
        } else {
            alert("Cannot move");
            return;
        }
    }
    BeingInvaded() {
        console.log("none");
    }
    Aggressive(currChess, getAllChess, switchPlayer, currPlayer, gameState) {
        let CurrChessResultIndex = getAllChess.findIndex((item) => item.id == currChess.id);
        let PreChessIndex = getAllChess.findIndex((item) => item.id == this.chess.id);
        console.log(currChess);
        console.log(this.chess);
        // 紀錄砲台數量
        let isOneChessInBetween = 0;
        // 砲的排數
        let compareHorizontalIndex = Math.floor(PreChessIndex / 8);
        // 目標的排數
        let targetHorizontalIndex = Math.floor(CurrChessResultIndex / 8);

        // 確認是否是與砲垂直的棋子，若為0則垂直
        let isVertical = Math.abs(CurrChessResultIndex - PreChessIndex) % 8;

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
            if (
                Math.max(CurrChessResultIndex, PreChessIndex) - Math.min(CurrChessResultIndex, PreChessIndex) / 8 >=
                2
            ) {
                for (
                    var i = Math.min(CurrChessResultIndex, PreChessIndex) + 8;
                    i < Math.max(CurrChessResultIndex, PreChessIndex);
                    i += 8
                ) {
                    if (getAllChess[i].state == "open") {
                        isOneChessInBetween++;
                    }
                }
                if (isOneChessInBetween == 1 && getAllChess[CurrChessResultIndex].state == "open") {
                    this.chess.MoveAction(currChess, getAllChess);
                    switchPlayer();
                    currChess.state = "none";
                    currPlayer.SetScore(gameState.SetWinner);
                } else {
                    alert("砲不能這樣走喔～");
                }
            }
            return;
        }

        alert("砲不能這樣走喔～");
        // }
        // console.log("cc");
    }
    SetChoose() {
        this.chess.isChoose = true;
    }
    ResetChoose() {
        this.chess.isChoose = false;
    }
    SetStage(context) {
        this.chess.stage = context;
    }
}

// none
 class ChessNoneStage extends Stage {
    constructor(chess) {
        super();
        this.chess = chess;
    }
    SetChoose() {
        console.log("There is no chess.");
    }
    Open() {
        console.log("none");
    }
    Move() {
        console.log("none");
    }
    BeingInvaded() {
        console.log("none");
    }
    Aggressive() {
        console.log("none");
    }
}
