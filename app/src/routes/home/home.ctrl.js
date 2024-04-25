"use strict";

const User = require('../../models/User');

  const output = {
    home: (req, res) => {
      res.render("home/index");
    },
  
   login: (req, res) => {
      res.render("home/login");
    },
    register: (req, res) => {
      res.render("home/register");
    }
  }

const process = {
  login: (req, res) => {
    const user = new User(req.body);
    const response = user.login();
    return res.json(response);


    // const id = req.body.id,
    //   psword = req.body.psword;

    // const users = UserStorage.getUsers("id","psword");

    // // 로그인 데이터를 검증
    //   const response = {};
    //   if (users.id.includes(id)) {
    //     const idx = users.id.indexOf(id);
    //     if(users.psword[idx] === psword) {
    //       response.success = true;
    //       return res.json(response);
    //     }
    //   }

    //   response.success = false;
    //   response.msg = "로그인에 실패하셨습니다."
    //   return res.json(response)

    
  },
  // 회원가입 기능 컨트롤러
  register: (req, res) => {
    const user = new User(req.body);
    const response = user.register();
    return res.json(response);    // response를 json파일로 변환후 클라이언트에게 응답
  },
};

module.exports = {
  output,
  process
};
