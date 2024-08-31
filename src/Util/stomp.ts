import {Client, IFrame, IMessage, StompSubscription} from "@stomp/stompjs";
import {Message} from "../components/ChatWindow";

export default class StompService {
    private client: Client; // Client 타입으로 선언

    constructor() {
        this.client = new Client({
            brokerURL: 'ws://localhost:8080/ws', // WebSocket 서버 URL
            debug: (str: string) => {
                console.log(str);
            },
            reconnectDelay: 5000, // 연결 재시도 지연 시간 (밀리초)
            heartbeatIncoming: 4000, // 수신 Heartbeat 주기 (밀리초)
            heartbeatOutgoing: 4000, // 송신 Heartbeat 주기 (밀리초)
        });
    }

    connect(onConnect: () => void, onError: (frame: IFrame) => void): void {
        this.client.onConnect = onConnect; // 연결 성공 시 콜백
        this.client.onStompError = onError; // STOMP 오류 발생 시 콜백
        this.client.activate(); // 클라이언트 활성화 (연결 시작)
    }
    disconnect(): void {
        this.client.deactivate(); // 클라이언트 비활성화 (연결 종료)
    }

    sendMessage(destination: string, body: any): void {
        this.client.publish({
            destination, // 메시지를 보낼 목적지
            body: JSON.stringify(body), // 메시지 본문
        });
    }

    subscribe(destination: string, callback: (message: IMessage) => void): void {
            this.client.subscribe(destination, (message) => {
                callback(message);
            });
        }

}