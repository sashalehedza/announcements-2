// import { useState, useEffect, useCallback } from 'react'
import { useState, useEffect } from 'react'
import {
  FormGroup,
  FormControl,
  InputLabel,
  Input,
  Button,
  makeStyles,
  Typography,
} from '@material-ui/core'
import { useHistory, useParams, Link } from 'react-router-dom'
import { getAnnouncements, editAnnouncement } from '../service/api'
const initialValue = {
  title: '',
  description: '',
}

const useStyles = makeStyles({
  container: {
    width: '50%',
    margin: '5% 0 0 25%',
    '& > *': {
      marginTop: 20,
    },
  },
})

const EditAnnouncement = () => {
  const [announcement, setAnnouncement] = useState(initialValue)
  const { title, description } = announcement
  const { id } = useParams()
  const classes = useStyles()
  let history = useHistory()

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
  }, [id])

  const editAnnouncementDetails = async () => {
    const response = await editAnnouncement(id, announcement)
    setAnnouncement(response.data)
    history.push('/')
  }

  const onValueChange = (e) => {
    console.log(e.target.value)
    setAnnouncement({
      ...announcement,
      [e.target.name]: e.target.value,
      updated: new Date(),
    })
  }

  return (
    <>
      <Link className='btn btn-primary' to='/'>
        back to Home
      </Link>
      <FormGroup className={classes.container}>
        <Typography variant='h4'>Edit Information</Typography>
        <FormControl>
          <InputLabel htmlFor='my-input'>Title</InputLabel>
          <Input
            onChange={(e) => onValueChange(e)}
            name='title'
            value={title}
            id='my-input'
            aria-describedby='my-helper-text'
          />
        </FormControl>
        <FormControl>
          <InputLabel htmlFor='my-input'>Description</InputLabel>
          <Input
            onChange={(e) => onValueChange(e)}
            name='description'
            value={description}
            id='my-input'
            aria-describedby='my-helper-text'
          />
        </FormControl>

        <FormControl>
          <Button
            variant='contained'
            color='primary'
            onClick={() => editAnnouncementDetails()}
          >
            Edit Announcement
          </Button>
        </FormControl>
      </FormGroup>
    </>
  )
}

export default EditAnnouncement
