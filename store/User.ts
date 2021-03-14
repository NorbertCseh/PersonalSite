
class User {
  id: number;
  name: string;
  avatar: string;
  isAdmin: boolean;
  iat: number;
  exp: number;

  constructor(id: number, name: string, avatar: string, isAdmin: boolean, iat: number, exp: number) {
    this.id = id;
    this.name = name;
    this.avatar = avatar;
    this.isAdmin = isAdmin;
    this.iat = iat;
    this.exp = exp;

  }
}


export const state = () => ({
  id: Number,
  name: String,
  avatar: String,
  isAdmin: Boolean,
  iat: Number,
  exp: Number
})

export const mutations = {
  loadUser(state: any, user: User): void {
    state.id = user.id
    state.name = user.name
    state.avatar = user.avatar
    state.isAdmin = user.isAdmin
    state.iat = user.iat
    state.exp = user.exp
  }
}

// TODO: Page refresh clears the stere 
// TODO: Send token with every request check here:https://github.com/NorbertCseh/Social-media-for-creators/blob/master/client/src/utils/setAuthToken.js