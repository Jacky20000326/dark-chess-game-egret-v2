// import * as ChessInfo from './ChessStore'
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var InitialChess = (function () {
    function InitialChess() {
    }
    InitialChess.prototype.initChessInfo = function () {
        var ConcreteChessList = new ChessList();
        var ConcreteSoldierChessInfo = new SoldierChessInfo();
        var ConcreteKingChessInfo = new KingChessInfo();
        var ConcreteElephantChessInfo = new ElephantChessInfo();
        var ConcreteCarChessInfo = new CarChessInfo();
        var ConcreteHorseChessInfo = new HorseChessInfo();
        var ConcreteCannonChessInfo = new CannonChessInfo();
        var ConcretePawnChessInfo = new PawnChessInfo();
        ConcreteChessList.AddChessToList(ConcreteSoldierChessInfo);
        ConcreteChessList.AddChessToList(ConcreteKingChessInfo);
        ConcreteChessList.AddChessToList(ConcreteElephantChessInfo);
        ConcreteChessList.AddChessToList(ConcreteCarChessInfo);
        ConcreteChessList.AddChessToList(ConcreteHorseChessInfo);
        ConcreteChessList.AddChessToList(ConcreteCannonChessInfo);
        ConcreteChessList.AddChessToList(ConcretePawnChessInfo);
        // shuffle
        ConcreteChessList.ShuffleArray();
        return ConcreteChessList.List;
    };
    return InitialChess;
}());
__reflect(InitialChess.prototype, "InitialChess");
