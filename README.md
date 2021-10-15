# TS-Video-component
I realise all my previous project are based on JS framework e.g. React or Vue, result in that I don't know how to write code in pure JS. Therefore, I decided to code a video component in pure JS.

## webpack
Since I am not going to use React, so I won't use the `create-react-app`. I made a simple `webpack.config.js` to transpile ES5, CSS, and TS.  
In order to succefully transplie TS to JS, I also create a `tsconfig.json` which allows me to use ES6 syntax as well.

## CSS module
I was not clear about `CSS module` before, so that I push myself to use it in this project. The first think I need to do is to allow the `css-loader` to create css modules
```
{
        test: /\.css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: {
                localIdentName: "[path][name]__[local]--[hash:base64:5]",
              },
            },
          },
        ],
        include: [path.resolve(__dirname, "src/components")],
      },
```
After doing this, I found that `CSS module` allows me to write less code and have the same `class name`. In my opinion, `SASS` can do the same thing in `mixin`, which allows me to store some code in and use it by `@include`. Definitely I have a long way to go to know more about CSS module, but now I don't see much difference.

## video component
Please have a look  
![WeChat Screenshot_20211015165701](https://user-images.githubusercontent.com/72715709/137439868-be66fabc-f0a4-4e2c-b06c-b36085d5d1f8.png)


