import axios from "axios";
import {SignupData} from "./page/Signup";
import {LoginData} from "./page/Login";
import {RoomInfo} from "./components/Sidebar";
import {MessageListProps} from "./components/ChatWindow";

const api = axios.create({
    baseURL: 'http://192.168.45.157:8080',
});

api.interceptors.request.use(
    (config) => {
        console.log('here');
        const token = localStorage.getItem('token'); // 로컬 스토리지에서 토큰 가져오기
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`; // 요청 헤더에 토큰 추가
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const signup = async (signupData: SignupData) => {
    try {
        const baseRequest = {
            userId: '',
            timestamp: String(Date.now()),
            requestBody: signupData,
        };
        const res = await api.post('/api/auth/signup', baseRequest);
        return res.data;
    } catch (e) {
        console.log(e);
    }
};

export const login = async (loginData: LoginData) => {
    try {
        const baseRequest = {
            userId: '',
            timestamp: String(Date.now()),
            requestBody: loginData,
        };
        const response = await api.post('/api/auth/login', baseRequest);
        return response.data;
    } catch (e) {
        console.log(e);
    }
};

export const getChatRoomList = async () => {
    try {
        const baseRequest = {
            userId: '',
            timestamp: String(Date.now()),
            requestBody: {}
        };
        const response = await api.post('/chat/room/list', baseRequest);
        return response.data;

    } catch (e) {
        console.log(e);
    }

};

export const getUser = async () => {
    try {
        const response = await api.get('/api/auth/users');
        return response.data;
    }catch (e){
        console.log(e);
    }
}

export const createRoom = async (roomInfo: RoomInfo | undefined) =>{
    try {
        const baseRequest = {
            userId: '',
            timestamp: String(Date.now()),
            requestBody: roomInfo
        };
        const response = await api.post('/chat/room/create', baseRequest);
        return response.data;
    }catch (e){
        console.log(e);
    }
}

export const getMessageList = async (messageListProps: MessageListProps | undefined) =>{
    try {
        const baseRequest = {
            userId: '',
            timestamp: String(Date.now()),
            requestBody: messageListProps
        };
        const response = await api.post('/messages',baseRequest);
        return response.data;
    }catch (e){
        console.log(e);
    }
}
