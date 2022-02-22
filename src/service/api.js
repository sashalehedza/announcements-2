import axios from 'axios'

const announcementsUrl = 'http://localhost:3003/announcements'
const commentsUrl = 'http://localhost:3003/comments'
//const announcementsUrl = 'http://localhost:5001/announcements'

export const getAnnouncements = async (id) => {
  id = id || ''
  return await axios.get(`${announcementsUrl}/${id}`)
}

export const addAnnouncement = async (announcement) => {
  return await axios.post(`${announcementsUrl}`, announcement)
}

export const getComments = async (annId) => {
  return await axios.get(`${commentsUrl}/?announcementId=${annId}`)
}

export const addComments = async (comment) => {
  return await axios.post(`${commentsUrl}`, comment)
}

// export const addAnnouncement = async (announcement) => {
//   return await axios.post(`${announcementsUrl}/add`, announcement)
// }

export const deleteAnnouncement = async (id) => {
  return await axios.delete(`${announcementsUrl}/${id}`)
}

export const editAnnouncement = async (id, announcement) => {
  return await axios.put(`${announcementsUrl}/${id}`, announcement)
}

export const getAnnouncementsByTitle = async (title) => {
  if (title) {
    return await axios.get(`${announcementsUrl}/?title_like=${title}`)
  } else if (!title) {
    return await axios.get(`${announcementsUrl}`)
  }
}
