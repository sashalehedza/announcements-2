// import React, { useState, useEffect, useCallback } from 'react'
import React, { useState, useEffect, useCallback } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getAnnouncements, getComments, addComments } from '../service/api'
//import { useNavigate } from 'react-router-dom'
import {
  FormGroup,
  FormControl,
  InputLabel,
  Input,
  Button,
  makeStyles,
  Typography,
} from '@material-ui/core'

import { useHistory } from 'react-router-dom'

const useStyles = makeStyles({
  container: {
    width: '50%',
    margin: '5% 0 0 25%',
    '& > *': {
      marginTop: 20,
    },
  },
})

const initialValue = {
  commentText: '',
}
const Announcement = () => {
  const [announcement, setAnnouncement] = useState({
    id: '',
    title: '',
    description: '',
  })
  const [comments, setComments] = useState([])
  const [addComment, setAddComment] = useState(initialValue)
  const { commentText } = addComment
  const [similarAnnouncements, setSimilarAnnouncements] = useState([])
  const { id } = useParams()
  //const navigate = useNavigate()
  const classes = useStyles()
  let history = useHistory()

  const onValueChange = (e) => {
    setAddComment({
      ...addComment,
      [e.target.name]: e.target.value,
      created: new Date(),
      announcementId: id,
    })
  }

  const addCommentDetails = async () => {
    await addComments(addComment)
    // window.location.reload(false)
    getAllComments()
    history.push(`/announcements/${id}`)
    //navigate('/')
  }

  const getAllComments = useCallback(async () => {
    let response = await getComments(id)
    setComments(response.data)
  }, [id])

  useEffect(() => {
    const loadAnnouncementDetails = async () => {
      try {
        const response = await getAnnouncements(id)
        setAnnouncement(response.data)
      } catch (error) {
        console.log('Something is Wrong')
      }
    }
    loadAnnouncementDetails()
    getAllComments()
  }, [id, getAllComments])

  const getSimilarAnnouncements = async () => {
    let response = await getAnnouncements()
    setSimilarAnnouncements(response.data)
    // console.log(response.data)
  }
  useEffect(() => {
    getSimilarAnnouncements()
  }, [])

  let getCreatedTime = (announcement) => {
    var showDate = new Date(announcement.created)
    var displayUpdatedDate =
      showDate.getDate() +
      '/' +
      (showDate.getMonth() + 1) +
      '/' +
      showDate.getFullYear()

    var displayUpdatedTime =
      showDate.getHours() +
      ':' +
      showDate.getMinutes() +
      ':' +
      showDate.getSeconds()

    var fullUpdatedDate = displayUpdatedDate.concat(' - ', displayUpdatedTime)

    return fullUpdatedDate
  }

  let getUpdatedTime = (announcement) => {
    var showDate = new Date(announcement.updated)
    var displayUpdatedDate =
      showDate.getDate() +
      '/' +
      (showDate.getMonth() + 1) +
      '/' +
      showDate.getFullYear()

    var displayUpdatedTime =
      showDate.getHours() +
      ':' +
      showDate.getMinutes() +
      ':' +
      showDate.getSeconds()

    var fullUpdatedDate = displayUpdatedDate.concat(' - ', displayUpdatedTime)

    return fullUpdatedDate
  }

  // const filteredData = similarAnnouncements.filter(
  //   (simAnnouncement) =>
  //     simAnnouncement.id !== announcement.id &&
  //     simAnnouncement.title.includes(announcement.title) &&
  //     simAnnouncement.description.includes(announcement.description)
  // )

  const arrCurrentAnnouncementTitle = announcement.title.split(' ')
  const arrCurrentAnnouncementDescription = announcement.description.split(' ')

  const filteredData = similarAnnouncements.filter(
    (simAnnouncement) =>
      simAnnouncement.id !== announcement.id &&
      arrCurrentAnnouncementTitle.find((a) =>
        simAnnouncement.title.includes(a)
      ) &&
      arrCurrentAnnouncementDescription.find((a) =>
        simAnnouncement.description.includes(a)
      )
  )
  let maxSize = 3
  let simAnnLength = 0
  if (filteredData.length >= maxSize) {
    simAnnLength = maxSize
  } else if (filteredData.length < maxSize) {
    simAnnLength = filteredData.length
  }

  return (
    <div className='container py-4'>
      <Link className='btn btn-primary' to='/'>
        back to Home
      </Link>
      {/* <h1 className='display-4'>Announcement Id: {id}</h1> */}
      <hr />
      <ul className='list-group w-50'>
        <li className='list-group-item'>title: {announcement.title}</li>
        <li className='list-group-item'>
          description: {announcement.description}
        </li>
        <li className='list-group-item'>
          created: {getCreatedTime(announcement)}
        </li>
        {announcement.updated && (
          <li> updated: {getUpdatedTime(announcement)}</li>
        )}
      </ul>

      {/* <div>
        <h2>Similar Announcements (Length - {simAnnLength})</h2>
        {filteredData.slice(0, maxSize).map((simannouncement) => (
          <ul className='list-group w-50' key={simannouncement.id}>
            <li className='list-group-item'>title: {simannouncement.title}</li>
            <li className='list-group-item'>
              description: {simannouncement.description}
            </li>
            <li className='list-group-item'>
              created: {getCreatedTime(simannouncement)}
            </li>
            {simannouncement.updated && (
              <li> updated: {getUpdatedTime(simannouncement)}</li>
            )}
          </ul>
        ))}
      </div> */}

      <FormGroup className={classes.container}>
        <Typography variant='h4'>Add Comment</Typography>
        <FormControl>
          <InputLabel htmlFor='my-input'>Comment text</InputLabel>
          <Input
            onChange={(e) => onValueChange(e)}
            name='commentText'
            value={commentText}
            id='my-input'
          />
        </FormControl>

        <FormControl>
          <Button
            variant='contained'
            color='primary'
            onClick={() => addCommentDetails()}
          >
            Add Announcement
          </Button>
        </FormControl>
      </FormGroup>
      {comments.length}
      {comments.map((item) => (
        <h3>{item.commentText}</h3>
      ))}

      {simAnnLength > 0 && (
        <h2>Similar Announcements (Length - {simAnnLength})</h2>
      )}
      {simAnnLength > 0 &&
        filteredData.slice(0, maxSize).map((simannouncement) => (
          <ul className='list-group w-50' key={simannouncement.id}>
            <li className='list-group-item'>title: {simannouncement.title}</li>
            <li className='list-group-item'>
              description: {simannouncement.description}
            </li>
            <li className='list-group-item'>
              created: {getCreatedTime(simannouncement)}
            </li>
            {simannouncement.updated && (
              <li> updated: {getUpdatedTime(simannouncement)}</li>
            )}
          </ul>
        ))}
    </div>
  )
}

export default Announcement
