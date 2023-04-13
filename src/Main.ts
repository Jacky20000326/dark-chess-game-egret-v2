

class Main extends eui.UILayer {
    allChess:[] | null
    PlaygroundContainer: any
    PlayerScoreContainer: any
    CountRecordContainer: any
    chessPosition: any
    constructor(){
        super()
        
        this.allChess = null
        this.PlaygroundContainer = new egret.DisplayObjectContainer()
        this.PlayerScoreContainer = new egret.DisplayObjectContainer()
        this.CountRecordContainer = new egret.DisplayObjectContainer()
        this.chessPosition = new GetChessPosition()

    }

    protected SetInitChess(chessData){
        this.allChess = chessData
    }

    protected GetChessPosition(){
        
        return this.chessPosition.positionArr
    }


    protected createChildren(): void {
        super.createChildren();

        egret.lifecycle.addLifecycleListener((context) => {
            // custom lifecycle plugin
        })

        egret.lifecycle.onPause = () => {
            egret.ticker.pause();
        }

        egret.lifecycle.onResume = () => {
            egret.ticker.resume();
        }

        //inject the custom material parser
        //注入自定义的素材解析器

        // 晚點看影片
        let assetAdapter = new AssetAdapter();
        egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
        egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());
        this.runGame()
    }

    private async runGame() {
        await this.loadResource()
        this.createGameScene();
        
        // const result = await RES.getResAsync("description_json")
        // this.startAnimation(result);
        await platform.login();


    }
    // 加載畫面
    private async loadResource() {
        try {
            const loadingView = new LoadingUI();
            this.stage.addChild(loadingView);
            await RES.loadConfig("resource/default.res.json", "resource/");
            await this.loadTheme();
            await RES.loadGroup("preload", 0, loadingView);
            this.stage.removeChild(loadingView);
        }
        catch (e) {
            console.error(e);
        }
    }
    // 呼叫畫面
    private loadTheme() {
        return new Promise((resolve, reject) => {
            // load skin theme configuration file, you can manually modify the file. And replace the default skin.
            //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
            let theme = new eui.Theme("resource/default.thm.json", this.stage);
            theme.addEventListener(eui.UIEvent.COMPLETE, () => {
                resolve()
            }, this);

        })
    }

    private textfield: egret.TextField;
    /**
     * 创建场景界面
     * Create scene interface
     */
    protected createGameScene(): void {

        

        // table image
        this.createTableBg()

        // Playground DisplayObjectContainer

        this.createPlayground(this.PlaygroundContainer)

        // add ChessBoard to Playground Table
        this.PlaygroundContainer.addChild(this.CreateChessBoard(this.PlaygroundContainer.width, this.PlaygroundContainer.height))

        // Game title
        this.createGameTitle()

        // get initial chesses
        this.InitalChess()  

        // add chess to Playground
        this.CreateChessImageAtPlayground()


        // add playerState to Playground
        this.CreatePlayerState()

         // add Count to Playground
        this.CreateCountRecord()


    }

    // 創建紀錄連續次數
    protected CreateCountRecord(){
        this.addChild(this.CountRecordContainer)
        const CountLabel: egret.TextField = new egret.TextField();
        CountLabel.text = `${concreteGameStore.count}`;
        CountLabel.bold = true;
        CountLabel.y =50
        CountLabel.size = 40
        CountLabel.x = this.stage.stageWidth - 150
        this.CountRecordContainer.addChild(CountLabel)
    }

    // 創建遊戲標頭
    protected createGameTitle(){
        const GameTitle: egret.TextField = new egret.TextField();
        GameTitle.text = "Dark Chess Game";
        GameTitle.textAlign = egret.HorizontalAlign.CENTER;
        this.addChild(GameTitle);
        GameTitle.width = this.stage.stageWidth;
        GameTitle.y = 50
        GameTitle.size = 60
        GameTitle.bold = true;
    }

    // 棋子畫面更新
    protected UpdateplaygroundState(){

        let GetPosition = this.ConcretePosition()
        this.PlaygroundContainer.$children = []
        this.PlayerScoreContainer.$children = []
        this.CountRecordContainer.$children = []
        this.PlaygroundContainer.addChild(this.CreateChessBoard(this.PlaygroundContainer.width, this.PlaygroundContainer.height))
        this.CreatePlayerState()
        this.CreateCountRecord()
        // this.CheckChessState()
        this.CreateChessImageAtPlayground()

    }

    protected CheckChooseChess(){

    }

    // 創建底圖
    protected createTableBg(){
        let table = this.createBitmapByName("table_jpeg");
        let stageW = this.stage.stageWidth;
        let stageH = this.stage.stageHeight;
        table.width = stageW;
        table.height = stageH;
        this.addChild(table);
    }

    // 創建playground
    protected createPlayground(PlaygroundContainer){
        let Playgroundwidth = 1004
        let PlaygroundHeight = 504
        PlaygroundContainer.width = Playgroundwidth
        PlaygroundContainer.height = PlaygroundHeight


    // Playground position
    PlaygroundContainer.x= this.stage.stageWidth/2 - PlaygroundContainer.width/2
    PlaygroundContainer.y = this.stage.stageHeight/2 - PlaygroundContainer.height/2
    this.addChild(PlaygroundContainer)

    }


    // 取得棋子座標
    protected ConcretePosition(){
        let ConcreteGetChessPosition = new GetChessPosition()
        let GetPosition = ConcreteGetChessPosition.positionArr
        return GetPosition
    }



    // 創建棋子圖片在playground
    protected CreateChessImageAtPlayground(){
        let GetPosition = this.GetChessPosition()
        this.allChess.forEach((item,i)=>{            
            if(item.state == 'close'){
                this.PlaygroundContainer.addChild(this.CreateChess(`chessBack_png`,GetPosition[i].x,GetPosition[i].y,item))
            }else if(item.state == 'none'){
                this.PlaygroundContainer.addChild(this.CreateChess(`NoneChess_png`,GetPosition[i].x,GetPosition[i].y,item))
            }else{
                if(item.isChoose == true){
                    this.PlaygroundContainer.addChild(this.CreateChess(`chesschecked${item.imageIndex}_png`,GetPosition[i].x,GetPosition[i].y,item))
                }else{

                    this.PlaygroundContainer.addChild(this.CreateChess(`chess${item.imageIndex}_png`,GetPosition[i].x,GetPosition[i].y,item))
                }
            }
        })
    }


    // 創建初始化棋子
    protected InitalChess(){
        let ConcreteChess =  new InitialChess()
        let getAllChess = ConcreteChess.initChessInfo()
        this.SetInitChess(getAllChess)
    }


    // 創建淺色棋盤圖
    protected CreateChessBoard (PlaygroundContainerWidth:number,PlaygroundContainerHeight:number): egret.Bitmap {
        let boardImg = this.createBitmapByName("playground_jpeg")
        boardImg.width = PlaygroundContainerWidth
        boardImg.height = PlaygroundContainerHeight
        return boardImg
    }


    //創建棋子
    protected CreateChess(ImageId:string,positionX:number,positionY:number,chessData):egret.DisplayObjectContainer {
        const ChessContainer: egret.DisplayObjectContainer = new egret.DisplayObjectContainer();
        ChessContainer.width = 125
        ChessContainer.height = 125
        this.addChild(ChessContainer)
        
        let ChessImage = this.createBitmapByName(ImageId)
        ChessImage.width = ChessContainer.width * 0.9
        ChessImage.height = ChessContainer.height * 0.9
        ChessImage.x = positionX 
        ChessImage.y = positionY 
        ChessContainer.addChild(ChessImage)
        ChessImage.touchEnabled = true; 
        ChessImage.addEventListener(egret.TouchEvent.TOUCH_TAP, ()=>{
            SetCamp(chessData)
            this.CompareCamp(chessData)
            this.UpdateplaygroundState()
        }, 'this');
        
        return ChessContainer
    }

    //檢查棋子被選狀態
    protected CheckChessState(){
        const color: number = 0x33CCFF; /// 光晕的颜色，十六进制，不包含透明度
        const alpha: number = 0.8; /// 光晕的颜色透明度，是对 color 参数的透明度设定。有效值为 0.0 到 1.0。例如，0.8 设置透明度值为 80%。
        const blurX: number = 35; /// 水平模糊量。有效值为 0 到 255.0（浮点）
        const blurY: number = 35; /// 垂直模糊量。有效值为 0 到 255.0（浮点）
        const strength: number = 2; /// 压印的强度，值越大，压印的颜色越深，而且发光与背景之间的对比度也越强。有效值为 0 到 255。暂未实现
        const quality: number = egret.BitmapFilterQuality.HIGH; /// 应用滤镜的次数，建议用 BitmapFilterQuality 类的常量来体现
        const inner: boolean = false; /// 指定发光是否为内侧发光，暂未实现
        const knockout: boolean = false; /// 指定对象是否具有挖空效果，暂未实现
        const glowFilter: egret.GlowFilter = new egret.GlowFilter(color, alpha, blurX, blurY, strength, quality, inner, knockout);

        // let chooseChess = this.allChess.filter(item => item.isChoose == true)
    }

    // 創建旗子樣式
    protected CreateFlagStyle(){

        let flagImage = this.createBitmapByName("flag_png")
        flagImage.width = 30
        flagImage.height = 30
        flagImage.y = this.stage.stageHeight /1.2
        return flagImage
    
    }

    // 創建玩家文本
    protected CreatePlayerState(){
        this.addChild(this.PlayerScoreContainer)
        const Player1Label: egret.TextField = new egret.TextField();
        const Player2Label: egret.TextField = new egret.TextField();
        let Flag = this.CreateFlagStyle()

        if(Play1State.state){
            Flag.x = 380
            this.PlayerScoreContainer.addChild(Flag)
        }else{
            Flag.x = this.stage.stageWidth - 430
            this.PlayerScoreContainer.addChild(Flag)
        }

        Player1Label.text = `player1 score : ${Play1State.score}`;
        Player1Label.bold = true;
        Player1Label.y = this.stage.stageHeight /1.2
        Player1Label.x = 100
        
      
        Player2Label.text = `player2 score : ${Play2State.score}`;
        Player2Label.bold = true;
        Player2Label.y = this.stage.stageHeight /1.2
        Player2Label.x = this.stage.stageWidth - 350
        // Player2Label.textColor =Play2State.camp;

        if(Play1State.camp == 'red'){
            Player1Label.textColor =  0xff0000
            Player2Label.textColor = 0x0000ff
            Player1Label.strokeColor = egret.TextField.default_textColor;
            Player2Label.strokeColor = egret.TextField.default_textColor;
            Player1Label.stroke = 2;
            Player2Label.stroke = 2;
        }else if(Play1State.camp == null){
            Player1Label.textColor =  egret.TextField.default_textColor
            Player2Label.textColor = egret.TextField.default_textColor
        }else{
            Player1Label.textColor =  0x0000ff
            Player2Label.textColor = 0xff0000
            Player1Label.strokeColor = egret.TextField.default_textColor
            Player2Label.strokeColor = egret.TextField.default_textColor
         
            Player1Label.stroke = 2;
            Player2Label.stroke = 2;
        }
        this.PlayerScoreContainer.addChild(Player1Label)
        this.PlayerScoreContainer.addChild(Player2Label)
    }



    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    private createBitmapByName(name: string): egret.Bitmap {
        let result = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }



    // 判斷玩家的陣營與所選是否相同及判斷chess.state
    CompareCamp(chess) {

    // concrete 遊戲中的職責鏈
    let GetRequest = new Request(currPlayer(),chess,concreteGameStore,this.allChess,switchPlayer)

    this.resetAllChessState()

    if(chess.state == 'close'){
        chess.ConcreteOpen();
        switchPlayer();
        concreteGameStore.ResetpreChooseChess()
        concreteGameStore.MoveCount("ReSetCount");
        return
    } 
    
    
    ConcreteHeadHandler.SetCondition(concreteChoseSameCampChess)
    concreteChoseSameCampChess.SetCondition(ConcreteEatChess)
    ConcreteEatChess.SetCondition(ConcreteMoveChess)
    ConcreteHeadHandler.HandleRequest(GetRequest)

    this.UpdateplaygroundState()
};
// 將所有棋子狀態改為close
resetAllChessState(){
    this.allChess.forEach(item => {
        item.ConCreteResetChoose()
        })
    }
}


// 資料管理
let Play1State = new Player1()
let Play2State = new Player2()

// 取得遊戲狀態
let concreteGameStore = new GameStore()
// 規則(職責鏈)實體化
let concreteChoseSameCampChess = new ChoseSameCampChess()
let ConcreteEatChess = new EatChess()
let ConcreteHeadHandler = new HeadHandler()
let ConcreteMoveChess = new MoveChess()
// concrete 遊戲中的職責鏈

// 玩家選陣營(camp)
const SetCamp = (chess) => {
    if (chess.belong == "red") {
        Play1State.SetCamp("red");
        Play2State.SetCamp("blue");
    } else {
        Play1State.SetCamp("blue");
        Play2State.SetCamp("red");
    }
};

// 取得當前玩家
let currPlayer = ()=>{
    return Play1State.state == true ? Play1State : Play2State
}


// 判斷玩家的陣營與所選是否相同及判斷chess.state
const CompareCamp = (chess) => {
    // concrete 遊戲中的職責鏈
    let GetRequest = new Request(currPlayer,chess,concreteGameStore,AllChess,switchPlayer)
    resetAllChessState()

    if(chess.state == 'close'){
        chess.ConcreteOpen();
        switchPlayer();
        concreteGameStore.ResetpreChooseChess()
        concreteGameStore.MoveCount("ReSetCount");
        return
    } 
    ConcreteHeadHandler.SetCondition(concreteChoseSameCampChess)
    concreteChoseSameCampChess.SetCondition(ConcreteEatChess)
    ConcreteEatChess.SetCondition(ConcreteMoveChess)

    ConcreteHeadHandler.HandleRequest(GetRequest)
};

// 玩家交換
const switchPlayer = () => {
    Play1State.SwitchPlayer();
    Play2State.SwitchPlayer();
};

