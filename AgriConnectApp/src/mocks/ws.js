// Mock implementation of the 'ws' package for React Native

class WebSocket {
  constructor(address, protocols, options) {
    this.address = address;
    this.protocols = protocols;
    this.options = options;
    this.readyState = WebSocket.CONNECTING;
    
    // Simulate connection
    setTimeout(() => {
      this.readyState = WebSocket.OPEN;
      if (typeof this.onopen === 'function') {
        this.onopen();
      }
    }, 100);
  }

  // Methods
  send(data) {
    if (this.readyState !== WebSocket.OPEN) {
      throw new Error('WebSocket is not open');
    }
    // Mock implementation - doesn't actually send data
    console.log('WebSocket.send called with:', data);
  }

  close(code, reason) {
    if (this.readyState === WebSocket.CLOSED) return;
    this.readyState = WebSocket.CLOSING;
    
    // Simulate closing
    setTimeout(() => {
      this.readyState = WebSocket.CLOSED;
      if (typeof this.onclose === 'function') {
        this.onclose({ code, reason, wasClean: true });
      }
    }, 100);
  }

  // Event handlers (to be set by user)
  onopen = null;
  onclose = null;
  onmessage = null;
  onerror = null;

  // Constants
  static get CONNECTING() { return 0; }
  static get OPEN() { return 1; }
  static get CLOSING() { return 2; }
  static get CLOSED() { return 3; }
}

// Export the WebSocket class as both default and named export
module.exports = WebSocket;
module.exports.default = WebSocket;