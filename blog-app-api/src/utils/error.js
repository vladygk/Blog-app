class DocumentNotFoundError extends Error {
    constructor(message) {
      super(message);
      this.name = 'DocumentNotFoundError';
    }
  }

module.exports = {DocumentNotFoundError};