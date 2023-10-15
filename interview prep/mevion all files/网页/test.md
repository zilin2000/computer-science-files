<!DOCTYPE html>
<html>
<meta charset="utf-8">
<head>
    <title> TestVersion:0.1</title>
    <style type="text/css">
        html,body{
            width: 100%;
            height: 100%;
            margin: 0px;
            padding: 0px;
        }

        #gameCanvas{
            width: 100%;
            height: 100%;
        }
    </style>
</head>
    <!--引入babylon.js--> 
    <script src="babylon.js"></script>
<body> 
    <canvas id="gameCanvas" width="100%" height="100%"></canvas>
    <script>
        const canvas = document.getElementById("gameCanvas");
        //初始化引擎和场景，设置背景颜色和相机位置
        const engine = new BABYLON.Engine(canvas, true);

        engine.runRenderLoop(function(){
        });
        window.addEventListener("resize", function(){
            engine.resize();
        });

        const createScene = () =>{
            const scene = new BABYLON.Scene(engine);
            scene.clearColor = new BABYLON.Color3(0.5, 0.8, 0.5);
            // 创建默认相机并放置在场景中心
            const camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 0, 0), scene, true);

            //加载全景图
            let panos = [];
            for(let i = 0; i < 25; i++){
                panos[i] = new BABYLON.Texture("image/${i}.jpg", scene);
            }

            //创建plane并朝向相机
            let options = {};
            options.width = 4;
            options.height = 2.666;
            let plane = BABYLON.MeshBuilder.CreatePlane("plane", options);
            let mat = new BABYLON.StandardMaterial("mat", scene);

            //选择一个照片作为初始角度
            let curID = 0;// 当前全景图的ID
            mat.diffuseTexture = panos[curID];
            mat.emissiveColor = new BABYLON.Color3(1, 1, 1);
            mat.diffuseTexture.hasAlpha = true;
            plane.material = mat;

            plane.position = new BABYLON.Vector3(0, -0.3, 3);

            // 创建函数更新当前照片
            let isDrag = false;
            let times = 0;
            let updatePano = function(movement){
                if(!isDrag||times++<5) return;

                times = 0;

                curID = movement > 0 ? curID -1:curID + 1;
                if(curID < 0) curID = panos.length - 1;
                else if (curID >= panos.length) curID = 0;

                mat.diffuseTexture = panos[curID];
                mat.diffuseTexture.hasAlpha = true;
            };
            // 监听鼠标移动事件
            //按照鼠标移动方向更新当前照片
            scene.onPointerObservable.add((pointerInfo)=>{
                switch(pointerInfo.type){
                    case BABYLON.PointerEventTypes.POINTERDOWN:
                        isDrag = true;
                        break;
                    case BABYLON.PointerEventTypes.POINTERUP:
                        isDrag = false;
                        break;
                    case BABYLON.PointerEventTypes.POINTERMOVE:
                        updatePano(pointerInfo.event.movementX);
                        break;
                }
            });
            return scene;
        };

        const scene = createScene();

    </script>
</body>