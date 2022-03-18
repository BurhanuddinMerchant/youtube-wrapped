import { createChatBotMessage } from 'react-chatbot-kit'
import { AnchorMessage } from './custom/AnchorMessage'
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
  widgets: [
    {
      widgetName: 'anchorMessage',
      widgetFunc: (props) => <AnchorMessage {...props} />,
    },
  ],
}

export default config
