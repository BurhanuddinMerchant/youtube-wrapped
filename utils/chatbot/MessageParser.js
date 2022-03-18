export default class MessageParser {
  constructor(actionProvider, state) {
    this.actionProvider = actionProvider
    this.state = state
  }

  parse(message) {
    if (
      matchString(
        ['hi', 'hello', 'hola', 'hey', 'heelo', 'helllo', 'greet'],
        message
      )
    ) {
      this.actionProvider.handleHello()
    } else if (
      matchString(['privacy', 'policy', 'misuse', 'legal', 'illegal'], message)
    ) {
      this.actionProvider.handlePrivacyPolicy()
    } else if (
      matchString(
        ['developer', 'developed', 'creator', 'owner', 'who'],
        message
      )
    ) {
      this.actionProvider.handleCreatorQuery()
    } else if (matchString(['what', 'how', 'where', 'project'], message)) {
      this.actionProvider.handleProjectQuery()
    } else {
      this.actionProvider.handleUnknown()
    }
  }
}

const matchString = (list, message) => {
  return list.some((e) => message.toLowerCase().includes(e))
}
