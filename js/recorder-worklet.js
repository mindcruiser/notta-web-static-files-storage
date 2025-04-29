class RecorderProcessor extends AudioWorkletProcessor {
  // 0.确定缓冲区大小（这与 ScriptProcessor 的第一个参数相同）
  bufferSize = 16 * 1024; // 4096;
  // 1. 跟踪当前缓冲区填充水平
  bytesWritten = 0;

  // 2.创建一个固定大小的缓冲区
  buffer = new Float32Array(this.bufferSize);

  constructor() {
    super();
    this.initBuffer();
  }

  initBuffer() {
    this.bytesWritten = 0;
  }

  isBufferEmpty() {
    return this.bytesWritten === 0;
  }

  isBufferFull() {
    return this.bytesWritten === this.bufferSize;
  }

  /**
   * @param {Float32Array[][]} inputs
   * @returns {boolean}
   */
  process(inputs) {
    // 抓取类似于 ScriptProcessorNode 的第一个通道
    this.append(inputs[0][0]);

    return true;
  }

  /**
   *
   * @param {Float32Array} channelData
   */
  append(channelData) {
    if (this.isBufferFull()) {
      this.flush();
    }

    if (!channelData) return;

    for (let i = 0; i < channelData.length; i++) {
      this.buffer[this.bytesWritten++] = channelData[i];
    }
  }

  flush() {
    // 如果过早结束，则修剪缓冲区
    this.port.postMessage(this.bytesWritten < this.bufferSize ? this.buffer.slice(0, this.bytesWritten) : this.buffer);
    this.initBuffer();
  }
}

registerProcessor('recorder.worklet', RecorderProcessor);
