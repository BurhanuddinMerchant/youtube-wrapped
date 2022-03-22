import { getTotal } from './getTotal'
import { getTopThreeFromDataObject } from './topThree'

export const getProcessedStats = (stats) => {
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
  return processedData
}
