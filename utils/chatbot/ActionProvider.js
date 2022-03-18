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
      'Sorry, I am not able to understand, please connect with the developers in the Contact section',
      { widget: 'linkMessage' }
    )
    this.setState((prev) => ({
      ...prev,
      messages: [...prev.messages, message],
    }))
  }
  handlePrivacyPolicy() {
    const message = this.createChatbotMessage(
      'Our Privacy Policy can be found below',
      { widget: 'anchorMessage' }
    )
    this.setState((prev) => ({
      ...prev,
      messages: [...prev.messages, message],
    }))
  }
  handleCreatorQuery() {
    const message = this.createChatbotMessage(
      'Burhanuddin Merchant developed this project',
      { widget: 'creatorMessage' }
    )
    this.setState((prev) => ({
      ...prev,
      messages: [...prev.messages, message],
    }))
  }
  handleProjectQuery() {
    const message = this.createChatbotMessage(
      'You can find out more about the project in the about section',
      { widget: 'aboutMessage' }
    )
    this.setState((prev) => ({
      ...prev,
      messages: [...prev.messages, message],
    }))
  }
  handleTutorial() {
    const message = this.createChatbotMessage(
      'Here is a quick walk through video',
      { widget: 'tutorialMessage' }
    )
    this.setState((prev) => ({
      ...prev,
      messages: [...prev.messages, message],
    }))
  }
}

export default ActionProvider
