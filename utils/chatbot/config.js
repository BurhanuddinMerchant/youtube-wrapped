import { createChatBotMessage } from 'react-chatbot-kit'

const botName = 'YTWBot'

const config = {
  initialMessages: [createChatBotMessage(`Hi! I'm ${botName}`)],
  botName: botName,
  customStyles: {
    botMessageBox: {
      backgroundColor: 'rgb(248 113 113)',
    },
    chatButton: {
      backgroundColor: '#dc2626',
    },
  },
}

export default config
