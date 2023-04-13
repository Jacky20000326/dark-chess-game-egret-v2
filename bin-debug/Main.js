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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        var _this = _super.call(this) || this;
        _this.allChess = null;
        _this.PlaygroundContainer = new egret.DisplayObjectContainer();
        _this.PlayerScoreContainer = new egret.DisplayObjectContainer();
        _this.CountRecordContainer = new egret.DisplayObjectContainer();
        _this.chessPosition = new GetChessPosition();
        return _this;
    }
    Main.prototype.SetInitChess = function (chessData) {
        this.allChess = chessData;
    };
    Main.prototype.GetChessPosition = function () {
        return this.chessPosition.positionArr;
    };
    Main.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        egret.lifecycle.addLifecycleListener(function (context) {
            // custom lifecycle plugin
        });
        egret.lifecycle.onPause = function () {
            egret.ticker.pause();
        };
        egret.lifecycle.onResume = function () {
            egret.ticker.resume();
        };
        //inject the custom material parser
        //注入自定义的素材解析器
        // 晚點看影片
        var assetAdapter = new AssetAdapter();
        egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
        egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());
        this.runGame();
    };
    Main.prototype.runGame = function () {
        return __awaiter(this, void 0, void 0, function () {
            var userInfo;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadResource()];
                    case 1:
                        _a.sent();
                        this.createGameScene();
                        // const result = await RES.getResAsync("description_json")
                        // this.startAnimation(result);
                        return [4 /*yield*/, platform.login()];
                    case 2:
                        // const result = await RES.getResAsync("description_json")
                        // this.startAnimation(result);
                        _a.sent();
                        return [4 /*yield*/, platform.getUserInfo()];
                    case 3:
                        userInfo = _a.sent();
                        console.log(userInfo);
                        return [2 /*return*/];
                }
            });
        });
    };
    // 加載畫面
    Main.prototype.loadResource = function () {
        return __awaiter(this, void 0, void 0, function () {
            var loadingView, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        loadingView = new LoadingUI();
                        this.stage.addChild(loadingView);
                        return [4 /*yield*/, RES.loadConfig("resource/default.res.json", "resource/")];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.loadTheme()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, RES.loadGroup("preload", 0, loadingView)];
                    case 3:
                        _a.sent();
                        this.stage.removeChild(loadingView);
                        return [3 /*break*/, 5];
                    case 4:
                        e_1 = _a.sent();
                        console.error(e_1);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    // 呼叫畫面
    Main.prototype.loadTheme = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            // load skin theme configuration file, you can manually modify the file. And replace the default skin.
            //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
            var theme = new eui.Theme("resource/default.thm.json", _this.stage);
            theme.addEventListener(eui.UIEvent.COMPLETE, function () {
                resolve();
            }, _this);
        });
    };
    /**
     * 创建场景界面
     * Create scene interface
     */
    Main.prototype.createGameScene = function () {
        // table image
        this.createTableBg();
        // Playground DisplayObjectContainer
        this.createPlayground(this.PlaygroundContainer);
        // add ChessBoard to Playground Table
        this.PlaygroundContainer.addChild(this.CreateChessBoard(this.PlaygroundContainer.width, this.PlaygroundContainer.height));
        // Game title
        this.createGameTitle();
        // get initial chesses
        this.InitalChess();
        // add chess to Playground
        this.CreateChessImageAtPlayground();
        // add playerState to Playground
        this.CreatePlayerState();
        // add Count to Playground
        this.CreateCountRecord();
    };
    // 創建紀錄連續次數
    Main.prototype.CreateCountRecord = function () {
        this.addChild(this.CountRecordContainer);
        var CountLabel = new egret.TextField();
        CountLabel.text = "" + concreteGameStore.count;
        CountLabel.bold = true;
        CountLabel.y = 50;
        CountLabel.size = 40;
        CountLabel.x = this.stage.stageWidth - 150;
        this.CountRecordContainer.addChild(CountLabel);
    };
    // 創建遊戲標頭
    Main.prototype.createGameTitle = function () {
        var GameTitle = new egret.TextField();
        GameTitle.text = "Dark Chess Game";
        GameTitle.textAlign = egret.HorizontalAlign.CENTER;
        this.addChild(GameTitle);
        GameTitle.width = this.stage.stageWidth;
        GameTitle.y = 50;
        GameTitle.size = 60;
        GameTitle.bold = true;
    };
    // 棋子畫面更新
    Main.prototype.UpdateplaygroundState = function () {
        var GetPosition = this.ConcretePosition();
        this.PlaygroundContainer.$children = [];
        this.PlayerScoreContainer.$children = [];
        this.CountRecordContainer.$children = [];
        this.PlaygroundContainer.addChild(this.CreateChessBoard(this.PlaygroundContainer.width, this.PlaygroundContainer.height));
        this.CreatePlayerState();
        this.CreateCountRecord();
        this.CheckChessState();
        this.CreateChessImageAtPlayground();
    };
    Main.prototype.CheckChooseChess = function () {
    };
    // 創建底圖
    Main.prototype.createTableBg = function () {
        var table = this.createBitmapByName("table_jpeg");
        var stageW = this.stage.stageWidth;
        var stageH = this.stage.stageHeight;
        table.width = stageW;
        table.height = stageH;
        this.addChild(table);
    };
    // 創建playground
    Main.prototype.createPlayground = function (PlaygroundContainer) {
        var Playgroundwidth = 1004;
        var PlaygroundHeight = 504;
        PlaygroundContainer.width = Playgroundwidth;
        PlaygroundContainer.height = PlaygroundHeight;
        // Playground position
        PlaygroundContainer.x = this.stage.stageWidth / 2 - PlaygroundContainer.width / 2;
        PlaygroundContainer.y = this.stage.stageHeight / 2 - PlaygroundContainer.height / 2;
        this.addChild(PlaygroundContainer);
    };
    // 取得棋子座標
    Main.prototype.ConcretePosition = function () {
        var ConcreteGetChessPosition = new GetChessPosition();
        var GetPosition = ConcreteGetChessPosition.positionArr;
        return GetPosition;
    };
    // 創建棋子圖片在playground
    Main.prototype.CreateChessImageAtPlayground = function () {
        var _this = this;
        var GetPosition = this.GetChessPosition();
        this.allChess.forEach(function (item, i) {
            if (item.state == 'close') {
                _this.PlaygroundContainer.addChild(_this.CreateChess("chessBack_png", GetPosition[i].x, GetPosition[i].y, item));
            }
            else if (item.state == 'none') {
                _this.PlaygroundContainer.addChild(_this.CreateChess("NoneChess_png", GetPosition[i].x, GetPosition[i].y, item));
            }
            else {
                _this.PlaygroundContainer.addChild(_this.CreateChess("chess" + item.imageIndex + "_png", GetPosition[i].x, GetPosition[i].y, item));
            }
        });
    };
    // 創建初始化棋子
    Main.prototype.InitalChess = function () {
        var ConcreteChess = new InitialChess();
        var getAllChess = ConcreteChess.initChessInfo();
        this.SetInitChess(getAllChess);
    };
    // 創建淺色棋盤圖
    Main.prototype.CreateChessBoard = function (PlaygroundContainerWidth, PlaygroundContainerHeight) {
        var boardImg = this.createBitmapByName("playground_jpeg");
        boardImg.width = PlaygroundContainerWidth;
        boardImg.height = PlaygroundContainerHeight;
        return boardImg;
    };
    //創建棋子
    Main.prototype.CreateChess = function (ImageId, positionX, positionY, chessData) {
        var _this = this;
        var ChessContainer = new egret.DisplayObjectContainer();
        ChessContainer.width = 125;
        ChessContainer.height = 125;
        this.addChild(ChessContainer);
        var ChessImage = this.createBitmapByName(ImageId);
        ChessImage.width = ChessContainer.width * 0.9;
        ChessImage.height = ChessContainer.height * 0.9;
        ChessImage.x = positionX;
        ChessImage.y = positionY;
        ChessContainer.addChild(ChessImage);
        ChessImage.touchEnabled = true;
        ChessImage.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            SetCamp(chessData.belong);
            _this.CompareCamp(chessData);
            _this.UpdateplaygroundState();
        }, 'this');
        return ChessContainer;
    };
    //檢查棋子被選狀態
    Main.prototype.CheckChessState = function () {
        var color = 0x33CCFF; /// 光晕的颜色，十六进制，不包含透明度
        var alpha = 0.8; /// 光晕的颜色透明度，是对 color 参数的透明度设定。有效值为 0.0 到 1.0。例如，0.8 设置透明度值为 80%。
        var blurX = 35; /// 水平模糊量。有效值为 0 到 255.0（浮点）
        var blurY = 35; /// 垂直模糊量。有效值为 0 到 255.0（浮点）
        var strength = 2; /// 压印的强度，值越大，压印的颜色越深，而且发光与背景之间的对比度也越强。有效值为 0 到 255。暂未实现
        var quality = 3 /* HIGH */; /// 应用滤镜的次数，建议用 BitmapFilterQuality 类的常量来体现
        var inner = false; /// 指定发光是否为内侧发光，暂未实现
        var knockout = false; /// 指定对象是否具有挖空效果，暂未实现
        var glowFilter = new egret.GlowFilter(color, alpha, blurX, blurY, strength, quality, inner, knockout);
        // let chooseChess = this.allChess.filter(item => item.isChoose == true)
        console.log(this.PlaygroundContainer.$children);
    };
    // 創建旗子樣式
    Main.prototype.CreateFlagStyle = function () {
        var flagImage = this.createBitmapByName("flag_png");
        flagImage.width = 30;
        flagImage.height = 30;
        flagImage.y = this.stage.stageHeight / 1.2;
        return flagImage;
    };
    // 創建玩家文本
    Main.prototype.CreatePlayerState = function () {
        this.addChild(this.PlayerScoreContainer);
        var Player1Label = new egret.TextField();
        var Player2Label = new egret.TextField();
        var Flag = this.CreateFlagStyle();
        if (Play1State.state) {
            Flag.x = 380;
            this.PlayerScoreContainer.addChild(Flag);
        }
        else {
            Flag.x = this.stage.stageWidth - 430;
            this.PlayerScoreContainer.addChild(Flag);
        }
        Player1Label.text = "player1 score : " + Play1State.score;
        Player1Label.bold = true;
        Player1Label.y = this.stage.stageHeight / 1.2;
        Player1Label.x = 100;
        Player2Label.text = "player2 score : " + Play2State.score;
        Player2Label.bold = true;
        Player2Label.y = this.stage.stageHeight / 1.2;
        Player2Label.x = this.stage.stageWidth - 350;
        // Player2Label.textColor =Play2State.camp;
        console.log(Play1State);
        if (Play1State.camp == 'red') {
            Player1Label.textColor = 0xff0000;
            Player2Label.textColor = 0x0000ff;
            Player1Label.strokeColor = egret.TextField.default_textColor;
            Player2Label.strokeColor = egret.TextField.default_textColor;
            Player1Label.stroke = 2;
            Player2Label.stroke = 2;
        }
        else if (Play1State.camp == null) {
            Player1Label.textColor = egret.TextField.default_textColor;
            Player2Label.textColor = egret.TextField.default_textColor;
        }
        else {
            Player1Label.textColor = 0x0000ff;
            Player1Label.strokeColor = egret.TextField.default_textColor;
            Player2Label.strokeColor = egret.TextField.default_textColor;
            Player2Label.textColor = 0xff0000;
            Player1Label.stroke = 2;
            Player2Label.stroke = 2;
        }
        this.PlayerScoreContainer.addChild(Player1Label);
        this.PlayerScoreContainer.addChild(Player2Label);
    };
    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    Main.prototype.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    // 判斷玩家的陣營與所選是否相同及判斷chess.state
    Main.prototype.CompareCamp = function (chess) {
        // concrete 遊戲中的職責鏈
        var GetRequest = new Request(currPlayer(), chess, concreteGameStore, this.allChess, switchPlayer);
        console.log(GetRequest);
        this.resetAllChessState();
        if (chess.state == 'close') {
            chess.ConcreteOpen();
            switchPlayer();
            concreteGameStore.ResetpreChooseChess();
            concreteGameStore.MoveCount("ReSetCount");
            return;
        }
        ConcreteHeadHandler.SetCondition(concreteChoseSameCampChess);
        concreteChoseSameCampChess.SetCondition(ConcreteEatChess);
        ConcreteEatChess.SetCondition(ConcreteMoveChess);
        ConcreteHeadHandler.HandleRequest(GetRequest);
        this.UpdateplaygroundState();
    };
    ;
    // 將所有棋子狀態改為close
    Main.prototype.resetAllChessState = function () {
        this.allChess.forEach(function (item) {
            item.ConCreteResetChoose();
        });
    };
    return Main;
}(eui.UILayer));
__reflect(Main.prototype, "Main");
// 資料管理
var Play1State = new Player1();
var Play2State = new Player2();
// 取得遊戲狀態
var concreteGameStore = new GameStore();
// 規則(職責鏈)實體化
var concreteChoseSameCampChess = new ChoseSameCampChess();
var ConcreteEatChess = new EatChess();
var ConcreteHeadHandler = new HeadHandler();
var ConcreteMoveChess = new MoveChess();
// concrete 遊戲中的職責鏈
// 玩家選陣營(camp)
var SetCamp = function (chess) {
    if (chess.belong == "red") {
        Play1State.SetCamp("red");
        Play2State.SetCamp("blue");
    }
    else {
        Play1State.SetCamp("blue");
        Play2State.SetCamp("red");
    }
};
// 取得當前玩家
var currPlayer = function () {
    return Play1State.state == true ? Play1State : Play2State;
};
// 判斷玩家的陣營與所選是否相同及判斷chess.state
var CompareCamp = function (chess) {
    // concrete 遊戲中的職責鏈
    var GetRequest = new Request(currPlayer, chess, concreteGameStore, AllChess, switchPlayer);
    resetAllChessState();
    if (chess.state == 'close') {
        chess.ConcreteOpen();
        switchPlayer();
        concreteGameStore.ResetpreChooseChess();
        concreteGameStore.MoveCount("ReSetCount");
        return;
    }
    ConcreteHeadHandler.SetCondition(concreteChoseSameCampChess);
    concreteChoseSameCampChess.SetCondition(ConcreteEatChess);
    ConcreteEatChess.SetCondition(ConcreteMoveChess);
    ConcreteHeadHandler.HandleRequest(GetRequest);
};
// 玩家交換
var switchPlayer = function () {
    Play1State.SwitchPlayer();
    Play2State.SwitchPlayer();
};
