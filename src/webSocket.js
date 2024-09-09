class WebSocketClient {
  constructor(url) {
    this.url = url;
    this.websocket = null;
    this.onMessageCallback = null;
  }

  // 初始化 WebSocket 連接
  connect() {
    this.websocket = new WebSocket(this.url);

    this.websocket.onopen = () => {
      console.log("WebSocket 連接成功");
    };

    this.websocket.onmessage = (event) => {
      console.log("接收到消息: ", event.data);
      if (this.onMessageCallback) {
        this.onMessageCallback(event.data);
      }
    };

    this.websocket.onerror = (error) => {
      console.error("WebSocket 錯誤: ", error);
    };

    this.websocket.onclose = () => {
      console.log("WebSocket 連接已關閉");
    };
  }

  // 發送消息
  sendMessage(message, callback) {
    this.onMessageCallback = callback;
    if (this.websocket && this.websocket.readyState === WebSocket.OPEN) {
      this.websocket.send(message);
    } else {
      console.log("WebSocket 連接未開啟");
    }
  }

  // 關閉 WebSocket 連接
  close() {
    if (this.websocket) {
      this.websocket.close();
    }
  }
}

export default WebSocketClient;
