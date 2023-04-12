// import * as ChessInfo from './ChessStore'

class InitialChess {
    initChessInfo(){
        let ConcreteChessList = new ChessList();

        let ConcreteSoldierChessInfo = new SoldierChessInfo();
        let ConcreteKingChessInfo = new KingChessInfo();
        let ConcreteElephantChessInfo = new ElephantChessInfo();
        let ConcreteCarChessInfo = new CarChessInfo();
        let ConcreteHorseChessInfo = new HorseChessInfo();
        let ConcreteCannonChessInfo = new CannonChessInfo();
        let ConcretePawnChessInfo = new PawnChessInfo();
    
    
        ConcreteChessList.AddChessToList(ConcreteSoldierChessInfo);
        ConcreteChessList.AddChessToList(ConcreteKingChessInfo);
    
        ConcreteChessList.AddChessToList(ConcreteElephantChessInfo);
        ConcreteChessList.AddChessToList(ConcreteCarChessInfo);
    
        ConcreteChessList.AddChessToList(ConcreteHorseChessInfo);
        ConcreteChessList.AddChessToList(ConcreteCannonChessInfo);
    
        ConcreteChessList.AddChessToList(ConcretePawnChessInfo);
    
    
        // shuffle
        ConcreteChessList.ShuffleArray()
    
    
        return  ConcreteChessList.List
    }
}
