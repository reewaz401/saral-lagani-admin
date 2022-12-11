import { randomId } from 'src/utils/randomId';
import { usersApi } from './users';
import { sign, decode, JWT_SECRET, JWT_EXPIRES_IN } from '../utils/jwt';
import { wait } from 'src/utils/wait';
import { ConstructionOutlined } from '@mui/icons-material';
import axios from 'src/utils/axios';
const users = [
  {
    id: '1',
    avatar: '/static/images/avatars/3.jpg',
    location: 'San Francisco, USA',
    username: 'admin',
    email: 'demo@example.com',
    name: 'Rachael Simons',
    jobtitle: 'Lead Developer',
    password: 'TokyoPass1@',
    role: 'admin',
    posts: '27',
    coverImg: '/static/images/placeholders/covers/5.jpg',
    followers: '6513',
    description: 'Curabitur at ipsum ac tellus semper interdum.'
  }
];

class AuthApi {
  async login({ email, password }) {
    await wait(500);
    return new Promise((resolve, reject) => {
      try {
        const user = users.find((_user) => _user.email === email);
        if (!user || user.password !== password) {
          reject(new Error('Email and password combination does not match'));
          return;
        }
        const accessToken = sign({ userId: user.id }, JWT_SECRET, {
          expiresIn: JWT_EXPIRES_IN
        });
        resolve(accessToken);
      } catch (err) {
        console.error(err);
        reject(new Error('Internal server error'));
      }
    });
  }

  async register({ email, name, password }) {
    await wait(1000);
    return new Promise((resolve, reject) => {
      try {
        axios.post('auth/signup', {
          user_id: "",
          user_name: name,
          first_name: "",
          last_name: "",
          email: email,
          login_type: "",
          member_type: "1",
          investor_type: "",
          password: password
        })
          .then(function (response) {
            const userInfo = response.data.data;   
            resolve(userInfo);
          })
          .catch(function (error) {
            reject(new Error(error));
          });
      } catch (err) {
        reject(new Error('Internal server error'));
      }
    });
  }

  me(userId) {
    return new Promise((resolve, reject) => {
      usersApi.getUser(userId).then((res) => {
        localStorage.setItem('userInfo', res.data[0]);
          resolve(res.data[0]);
        }).catch((_) => {
          reject(new Error('Internal server error'));
        });
    });
  }
}

export const authApi = new AuthApi();
