//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

class Main extends eui.UILayer {
    allChess:[] | null
    constructor(){
        super()
        this.allChess = null
    }

    protected SetInitChess(chessData){
        this.allChess = chessData
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
        const userInfo = await platform.getUserInfo();
        console.log(userInfo);

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

        let table = this.createBitmapByName("table_jpeg");
       
        let stageW = this.stage.stageWidth;
        let stageH = this.stage.stageHeight;
        table.width = stageW;
        table.height = stageH;
        this.addChild(table);


        // Playground DisplayObjectContainer
        const PlaygroundContainer: egret.DisplayObjectContainer = new egret.DisplayObjectContainer();

        //Playground size 
        let Playgroundwidth = 1004
        let PlaygroundHeight = 504
        PlaygroundContainer.width = Playgroundwidth
        PlaygroundContainer.height = PlaygroundHeight

        // Playground position
        PlaygroundContainer.x= this.stage.stageWidth/2 - PlaygroundContainer.width/2
        PlaygroundContainer.y = this.stage.stageHeight/2 - PlaygroundContainer.height/2
        this.addChild(PlaygroundContainer)

        // add ChessBoard to Playground
        PlaygroundContainer.addChild(this.CreateChessBoard(PlaygroundContainer.width, PlaygroundContainer.height))

        // get initial chesses
        let GetAllChess =  this.InitalChess()  
        this.SetInitChess(GetAllChess)

        // get chess position
        let ConcreteGetChessPosition = new GetChessPosition()
        let GetPosition = ConcreteGetChessPosition.positionArr


        // add chess to Playground

        this.allChess.forEach((item,i)=>{            
            if(item.state == 'close'){
                PlaygroundContainer.addChild(this.CreateChess(`chessBack_png`,GetPosition[i].x,GetPosition[i].y,item))
            }else{

                PlaygroundContainer.addChild(this.CreateChess(`chess${item.imageIndex}_png`,GetPosition[i].x,GetPosition[i].y,item))
            }
        })
      

    }
    // 創建初始化棋子
    protected InitalChess(){
        let ConcreteChess =  new InitialChess()
        let getAllChess = ConcreteChess.initChessInfo()
        return getAllChess
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
            chessData.state = 'open'
            console.log(this.allChess)
            console.log(chessData)
        }, 'this');
        
        return ChessContainer
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
    
    /**
     * 点击按钮
     * Click the button
     */
    private callChess(e: egret.TouchEvent) {
        let panel = new eui.Panel();
        panel.title = "Title";
        panel.horizontalCenter = 0;
        panel.verticalCenter = 0;
        this.addChild(panel);
    }


    
}

const clickHandler = (data)=>{
    console.log(data)
}

// const getChessUrl = (index, isOpenState) => {
//     if (isOpenState == "close") {
//         return BackImageChess.operation();
//     } else {
//         return FrontImageChess.operation(index);
//     }
// };