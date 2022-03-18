import { createChatBotMessage } from 'react-chatbot-kit'
import { LinkMessage } from './custom/LinkMessage'
import { AnchorMessage } from './custom/AnchorMessage'
import { CreatorMessage } from './custom/CreatorMessage'
import { AboutMessage } from './custom/AboutMessage'
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
      widgetName: 'linkMessage',
      widgetFunc: (props) => <LinkMessage {...props} />,
    },
    {
      widgetName: 'anchorMessage',
      widgetFunc: (props) => <AnchorMessage {...props} />,
    },
    {
      widgetName: 'creatorMessage',
      widgetFunc: (props) => <CreatorMessage {...props} />,
    },
    {
      widgetName: 'aboutMessage',
      widgetFunc: (props) => <AboutMessage {...props} />,
    },
  ],
}

export default config
