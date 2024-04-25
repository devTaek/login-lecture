"use strict";

class UserStorage {
  // class 안에 변수를 선언할 때는 선언자(const)가 필요없다.
  // 다른 곳에서 UserStorage의 이 class 자체의 users에 접근할 때는 static 으로 선언해주어 정적변수로 만들어줘야한다.

  // 원래는 다이렉트로 접근할 수 없어야해요. (외부에서 데이터를 가져올수 없도록)
  // 그래서 이 변수를 은닉화 시켜줘야한다. (#변수)
  // public한 변수에서 private한 변수로 바꿔줘야한다.
  static #users = {
    id: ["harold", "harold3", "harold109"],
    psword: ["123", "1234", "12345"],
    name: ["정태균", "태균", "택"],
  };

  // class 자체에서 메서드에 접근하려면 static을 붙여줘야한다.
  static getUsers(...fields) {
    // 은닉화된 users를 반환
    const users = this.#users;
    const newUsers = fields.reduce((newUsers, field) => {
      if(users.hasOwnProperty(field)) {
        newUsers[field] = users[field];
      }
      return newUsers;
    }, {});
    return newUsers;
  }
  
  static getUserInfo(id) {
    const users = this.#users;
    const idx = users.id.indexOf(id);
    const usersKeys = Object.keys(users); // => [id, psword, name]
    const userInfo = usersKeys.reduce((newUser, info) => {
      newUser[info] = users[info][idx];
      return newUser;
    }, {});

    return userInfo;
  }

  // 클라이언트에서 전달한 데이터를 저장해주는 함수
  static save(userInfo) {
    const users = this.#users;
    users.id.push(userInfo.id);
    users.name.push(userInfo.name);
    users.psword.push(userInfo.psword);
    return {success: true};
  }
}

module.exports = UserStorage;