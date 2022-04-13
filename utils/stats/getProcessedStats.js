import { getTotal } from './getTotal'
import { getTopThreeFromDataObject } from './topThree'

export const getProcessedStats = (stats, setSharableData, user) => {
  // console.log(user)
  const processedData = {
    channelTitle: {
      liked: {},
      disliked: {},
      all_liked: {},
      all_disliked: {},
      title_helper: 'Channels',
      info: 'This Indicates the top 3 channels that you have liked/disliked based on the number of videos you have liked/disliked from that channel',
      unit_liked: 'Likes',
      unit_disliked: 'Dislikes',
      field: 'Channel Title',
      total_liked: 0,
      total_disliked: 0,
    },
    topic: {
      liked: {},
      disliked: {},
      all_liked: {},
      all_disliked: {},
      title_helper: 'Topics',
      info: 'This Indicates the top 3 topics that you have liked/disliked based on the number of videos you have liked/disliked from that topic',
      unit_liked: 'Likes',
      unit_disliked: 'Dislikes',
      field: 'Topic',
      total_liked: 0,
      total_disliked: 0,
    },
    tags: {
      liked: {},
      disliked: {},
      all_liked: {},
      all_disliked: {},
      title_helper: 'Tags',
      info: 'This Indicates the top 3 tags that you have liked/disliked based on the number of videos you have liked/disliked from that tag',
      unit_liked: 'Likes',
      unit_disliked: 'Dislikes',
      field: 'Tag',
      total_liked: 0,
      total_disliked: 0,
    },
    language: {
      liked: {},
      disliked: {},
      all_liked: {},
      all_disliked: {},
      title_helper: 'Languages',
      info: 'This Indicates the top 3 languages that you have liked/disliked based on the number of videos you have liked/disliked from that language',
      unit_liked: 'Likes',
      unit_disliked: 'Dislikes',
      field: 'Language',
      total_liked: 0,
      total_disliked: 0,
    },
    duration_per_channel: {
      liked: {},
      disliked: {},
      all_liked: {},
      all_disliked: {},
      title_helper: 'Most Viewed Channel (in sec)',
      info: 'This indicates your most watched channels based on the duraton of the video (in secs).',
      unit_liked: 'Secs',
      unit_disliked: 'Secs',
      field: 'Channel Title',
      total_liked: 0,
      total_disliked: 0,
    },
    duration_per_language: {
      liked: {},
      disliked: {},
      all_liked: {},
      all_disliked: {},
      title_helper: 'Most Viewed Language (in sec)',
      info: 'This indicates your most watched languages based on the duraton of the video (in secs).',
      unit_liked: 'Secs',
      unit_disliked: 'Secs',
      field: 'Language',
      total_liked: 0,
      total_disliked: 0,
    },
    duration_per_topic: {
      liked: {},
      disliked: {},
      all_liked: {},
      all_disliked: {},
      title_helper: 'Most Viewed Topic (in sec)',
      info: 'This indicates your most watched topics based on the duraton of the video (in secs).',
      unit_liked: 'Secs',
      unit_disliked: 'Secs',
      field: 'Topic',
      total_liked: 0,
      total_disliked: 0,
    },
  }
  for (let data_point in processedData) {
    processedData[data_point]['liked'] = getTopThreeFromDataObject(
      stats[data_point]['liked']
    )
    processedData[data_point]['disliked'] = getTopThreeFromDataObject(
      stats[data_point]['disliked']
    )
    processedData[data_point]['all_liked'] = stats[data_point]['liked']
    processedData[data_point]['all_disliked'] = stats[data_point]['disliked']
    processedData[data_point]['total_liked'] = getTotal(
      stats[data_point]['liked']
    )
    processedData[data_point]['total_disliked'] = getTotal(
      stats[data_point]['disliked']
    )
  }
  processedData['duration'] = stats['duration']
  // console.log(processedData)
  let top_channels = []
  let top_tags = []
  let top_topics = []
  // console.log(processedData)
  for (let i = 0; i < 3; i++) {
    if (
      processedData['tags']['liked'] &&
      processedData['tags']['liked'][i] &&
      processedData['tags']['liked'][i]['key']
    ) {
      let tag_name = processedData['tags']['liked'][i]['key']
      if (tag_name > 13) {
        tag_name = tag_name.substring(0, 11) + '...'
      }
      top_tags.push(tag_name)
    }
    if (
      processedData['channelTitle']['liked'] &&
      processedData['channelTitle']['liked'][i] &&
      processedData['channelTitle']['liked'][i]['key']
    ) {
      let channel_name = processedData['channelTitle']['liked'][i]['key']
      if (channel_name.length > 13) {
        channel_name = channel_name.substring(0, 11) + '...'
      }
      top_channels.push(channel_name)
    }
    if (
      processedData['topic']['liked'] &&
      processedData['topic']['liked'][i] &&
      processedData['topic']['liked'][i]['key']
    ) {
      let topic_name = processedData['topic']['liked'][i]['key']
      if (topic_name === 'Lifestyle_(sociology)') {
        topic_name = 'Lifestyle'
      }
      if (topic_name.length > 13) {
        topic_name = topic_name.substring(0, 11) + '...'
      }
      top_topics.push(topic_name)
    }
  }
  let most_viewed_channel, most_viewed_tag, most_viewed_topic
  if (
    processedData['duration_per_topic']['liked'] &&
    processedData['duration_per_topic']['liked'][0] &&
    processedData['duration_per_topic']['liked'][0]['key']
  ) {
    most_viewed_topic = processedData['duration_per_topic']['liked'][0]['key']
    if (most_viewed_topic.length > 16) {
      most_viewed_topic = most_viewed_topic.substring(0, 16) + '...'
    }
  }
  if (
    processedData['duration_per_channel']['liked'] &&
    processedData['duration_per_channel']['liked'][0] &&
    processedData['duration_per_channel']['liked'][0]['key']
  ) {
    most_viewed_channel =
      processedData['duration_per_channel']['liked'][0]['key']
    if (most_viewed_channel.length > 16) {
      most_viewed_channel = most_viewed_channel.substring(0, 16) + '...'
    }
  }
  if (
    processedData['tags']['liked'] &&
    processedData['tags']['liked'][0] &&
    processedData['tags']['liked'][0]['key']
  ) {
    most_viewed_tag = processedData['tags']['liked'][0]['key']
    if (most_viewed_tag.length > 16) {
      most_viewed_tag = most_viewed_tag.substring(0, 16) + '...'
    }
  }
  setSharableData({
    username: user.username.toUpperCase(),
    most_viewed_topic,
    most_viewed_tag,
    most_viewed_channel,
    top_channels,
    top_tags,
    top_topics,
  })
  return processedData
}
