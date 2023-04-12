export class GameStore {
    constructor() {
        this.preChooseChess = null;
        this.occupiedState = null;
        this.count = 0;
        this.winner = null;
    }
    SetpreChooseChess(preChooseChess) {
        this.preChooseChess = preChooseChess;
    }
    SetOccupiedState(occupiedState) {
        this.occupiedState = occupiedState;
    }
    ResetpreChooseChess() {
        this.preChooseChess = null;
    }
    MoveCount(state) {
        let DrawChess = 50;
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
    }
    SetWinner = (winner) => {
        this.winner = winner;
    };
}

export class Request {
    constructor(currPlayer, currChess, gameState, AllChessArr, switchPlayer) {
        this.currPlayer = currPlayer;
        this.currChess = currChess;
        this.gameState = gameState;
        this.AllChessArr = AllChessArr;
        this.switchPlayer = switchPlayer;
    }
}

export class Handler {
    SetCondition(condition) {
        this.condition = condition;
    }
    HandleRequest() {}
}

export class HeadHandler extends Handler {
    HandleRequest(request) {
        this.condition.HandleRequest(request);
    }
}

export class ChoseSameCampChess extends Handler {
    HandleRequest(request) {
        if (request.gameState.preChooseChess !== null) {
            this.condition.HandleRequest(request);
            return;
        }
        if (request.currPlayer.camp !== request.currChess.belong) {
            alert(`please pick ${request.currPlayer.camp} color chess,thanks.`);
        } else if (request.currChess.state == "none") {
            alert("There is no chess.");
        } else {
            // 互叫選取狀態
            request.currChess.ConCreteSetChoose();
            //  儲存選取棋子
            request.gameState.SetpreChooseChess(request.currChess);
        }
    }
}

export class EatChess extends Handler {
    HandleRequest(request) {
        if (request.currChess.state == "open") {
            request.gameState.preChooseChess.ConcreteAggressive(
                request.currChess,
                request.AllChessArr,
                request.switchPlayer,
                request.currPlayer,
                request.gameState
            );
            request.gameState.ResetpreChooseChess();
            request.gameState.MoveCount("ReSetCount");
        } else {
            this.condition.HandleRequest(request);
        }
    }
}

export class MoveChess extends Handler {
    HandleRequest(request) {
        request.gameState.preChooseChess.ConcreteMove(request.currChess, request.AllChessArr, request.switchPlayer);
        request.gameState.ResetpreChooseChess();
        request.gameState.MoveCount("AddCount");
    }
}

export class isCannon extends Handler {
    HandleRequest() {
        if (this.preChooseChess.value == "砲" || this.preChooseChess.value == "炮") {
            // 執行砲的規則
        }
        this.condition.HandleRequest();
    }
}
