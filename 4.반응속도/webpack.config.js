const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin'); //노드환경에서는 require, Vue 환경에서는 import를 주로 쓴다.
module.exports = {
    mode: 'development', //배포시에는 production으로 수정해준다.
    devtool: 'eval', //배포시에는 주로 hidden-source-map을 많이 쓴다. eval은 웹팩 빌드속도가 빨라짐
    resolve: {
        extensions: ['.js', '.vue'], //import할 때 확장자를 생략해도 된다.
    },
    entry: {
        app: path.join(__dirname, 'main.js'), // 하나로 합쳐진 파일 app.js가 만들어짐
    },
    module: {
        rules: [{
            test: /\.vue$/,
            use: 'vue-loader', //.js로 끝나지않으면 webpack이 읽을 수 없음
            // vue-loader 같은 로더는 -D 옵션을 이용해서 개발할때만 사용하게끔.
        }, {
            test: /\.css$/,
            use: [
                'vue-style-loader',
                'css-loader'
            ]

        }],
    },
    plugins: [
        new VueLoaderPlugin(),
    ],
    output: {
        filename: '[name].js', // name에 app이 자동으로 들어가짐
        path: path.join(__dirname, 'dist'), //폴더경로 ./dist/app.js
        //script src="./dist/app.js"로만으로도 다 됨
        publicPath: '/dist', //webpack dev server 이용시 적어줘야 함
    },
};