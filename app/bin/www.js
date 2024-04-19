"use strict";

const app = require("../app");
const PORT = 3000;

app.listen(PORT, () => {
  console.log("서버 가동");
});

// 서버를 실행시켜주는 코드 node ./bin/www.js