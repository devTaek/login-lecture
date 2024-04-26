"use strict";

const fs = require("fs").promises; // users.json 파일을 읽어올 수 있게 해주는 것.

class UserStorage {
  // 프라이빗이나 클래스는 항상 최상단에 올려준다.
  static #getUserInfo(data, id) {
    const users = JSON.parse(data);
      const idx = users.id.indexOf(id);
      const usersKeys = Object.keys(users); // => [id, psword, name]
      const userInfo = usersKeys.reduce((newUser, info) => {
        newUser[info] = users[info][idx];
        return newUser;
      }, {});

      return userInfo;
  }

  // class 안에 변수를 선언할 때는 선언자(const)가 필요없다.
  // 다른 곳에서 UserStorage의 이 class 자체의 users에 접근할 때는 static 으로 선언해주어 정적변수로 만들어줘야한다.

  // 원래는 다이렉트로 접근할 수 없어야해요. (외부에서 데이터를 가져올수 없도록)
  // 그래서 이 변수를 은닉화 시켜줘야한다. (#변수)
  // public한 변수에서 private한 변수로 바꿔줘야한다.


    static #getUsers(data, isAll, fields) {
      const users = JSON.parse(data)
      if(isAll) return users;
      const newUsers = fields.reduce((newUsers, field) => {
      if(users.hasOwnProperty(field)) {
        newUsers[field] = users[field];
      }
      return newUsers;
    }, {});
    return newUsers;
  }

  // class 자체에서 메서드에 접근하려면 static을 붙여줘야한다.
  static getUsers(isAll, ...fields) {
    return fs
      .readFile("./src/databases/users.json")
      .then((data) => {
        return this.#getUsers(data, isAll, fields);
      })
      .catch((err) => console.erorr);
    // 은닉화된 users를 반환
    // const users = this.#users;
   
  }
  
  static getUserInfo(id) {
    // const users = this.#users;
    return fs
      .readFile("./src/databases/users.json")
      .then((data) => {
        return this.#getUserInfo(data, id);
      })
      .catch((err) => console.erorr);
  }

  // 클라이언트에서 전달한 데이터를 저장해주는 함수
  static async save(userInfo) {
    // users.json파일을 읽어 온 후에
    const users = await this.getUsers(true);
    if(users.id.includes(userInfo.id)) {
      throw ("이미 존재하는 아이디입니다.");
    }
    users.id.push(userInfo.id);
    users.name.push(userInfo.name)
    users.psword.push(userInfo.psword);
    // 데이터를 추가
    fs.writeFile("./src/databases/users.json", JSON.stringify(users))
    return {success: true};
  }
}

module.exports = UserStorage;