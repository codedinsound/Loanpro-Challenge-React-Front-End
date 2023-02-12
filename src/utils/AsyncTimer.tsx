class AsyncTimer {
  static sleep(ms: number): Promise<any> {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }
}

export default AsyncTimer;
