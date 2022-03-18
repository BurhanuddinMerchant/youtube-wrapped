class ActionProvider {
  constructor(createChatbotMessage, setStateFunc, createClientMessage) {
    this.createChatbotMessage = createChatbotMessage
    this.setState = setStateFunc
    this.createClientMessage = createClientMessage
  }

  handleHello() {
    const message = this.createChatbotMessage(
      'Hello. Nice to meet you. How can I help you?'
    )
    this.setState((prev) => ({
      ...prev,
      messages: [...prev.messages, message],
    }))
  }
  handleUnknown() {
    const message = this.createChatbotMessage(
      'I am not able to understand, please connect with the developers in the Contact section',
      { widget: 'anchorMessage' }
    )
    this.setState((prev) => ({
      ...prev,
      messages: [...prev.messages, message],
    }))
  }
}

export default ActionProvider
