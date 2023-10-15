<!DOCTYPE html>
<html>

<head>
    <title>Show Different Images</title>
    <style>
        #imageContainer {
            width: 100%;
            height: 100%;
            background-color: lightgray;
            margin: 0px;
            padding: 0px;
            cursor: pointer;
        }

        #backButton {
            position: absolute;
            top: 95%;
            left: 90%;
            transform: translate(-50%, -50%);
            padding: 10px 20px;
            background-color: #ccc;
            cursor: pointer;
        }

        #nextButton {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            padding: 10px 20px;
            background-color: #ccc;
            cursor: pointer;
        }
    </style>
</head>

<body>
    <div id="imageContainer">
        <button id="backButton">Back</button>
        <button id="nextButton">Next</button>
    </div>
    <script>
        // 图片组数组
        var imageGroups = [
            ["image1.jpg", "image2.jpg", "image3.jpg"],
            ["image4.jpg", "image5.jpg", "image6.jpg"],
            ["image7.jpg", "image8.jpg", "image9.jpg"]
        ];

        // 获取图像容器元素和按钮元素
        var imageContainer = document.getElementById("imageContainer");
        var backButton = document.getElementById("backButton");
        var nextButton = document.getElementById("nextButton");

        // 当前图片组索引
        var currentGroupIndex = -1;

        // 点击区域事件处理函数
        // imageContainer.addEventListener("click", function() {
        //     // 显示下一组图片
        //     showNextImageGroup();
        // });

        // 返回按钮点击事件处理函数
        backButton.addEventListener("click", function () {
            // 显示上一组图片
            showPreviousImageGroup();
        });

        // 下一张按钮点击事件处理函数
        nextButton.addEventListener("click", function () {
            // 显示下一组图片
            showNextImageGroup();
        });

        // 显示下一组图片
        function showNextImageGroup() {
            // 增加当前图片组索引
            currentGroupIndex++;
            // 如果索引超出图片组数组的长度，重置为0
            if (currentGroupIndex >= imageGroups.length) {
                currentGroupIndex = 0;
            }

            // 清空图像容器内容
            imageContainer.innerHTML = "";

            // 创建图片元素并添加到图像容器
            for (var i = 0; i < imageGroups[currentGroupIndex].length; i++) {
                var img = document.createElement("img");
                var imagePath = imageGroups[currentGroupIndex][i];
                img.src = imagePath ? imagePath : "picture";
                img.alt = currentGroupIndex == 0 ? "picture" : "changed picture";
                imageContainer.appendChild(img);
                if (currentGroupIndex != imageGroups.length - 1) {
                    imageContainer.appendChild(nextButton);
                }
                if (currentGroupIndex != 0) {
                    imageContainer.appendChild(backButton);
                }
            }
        }

        // 显示上一组图片
        function showPreviousImageGroup() {
            // 减小当前图片组索引
            currentGroupIndex--;
            // 如果索引小于0，重置为最后一组图片
            if (currentGroupIndex < 0) {
                currentGroupIndex = imageGroups.length - 1;
            }

            // 清空图像容器内容
            imageContainer.innerHTML = "";

            // 创建图片元素并添加到图像容器
            for (var i = 0; i < imageGroups[currentGroupIndex].length; i++) {
                var img = document.createElement("img");
                var imagePath = imageGroups[currentGroupIndex][i];
                img.src = imagePath ? imagePath : "picture";
                img.alt = currentGroupIndex == 0 ? "picture" : "changed picture";
                imageContainer.appendChild(img);
                if (currentGroupIndex != imageGroups.length - 1) {
                    imageContainer.appendChild(nextButton);
                }
                if (currentGroupIndex != 0) {
                    imageContainer.appendChild(backButton);
                }
            }
        }
        showNextImageGroup();        
    </script>
</body>

</html>