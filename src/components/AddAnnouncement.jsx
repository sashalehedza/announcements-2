import React, { useState } from 'react'
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
import { addAnnouncement } from '../service/api'
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

const AddAnnouncement = () => {
  const [announcement, setAnnouncement] = useState(initialValue)
  const [warningMessage, setWarningMessage] = useState('')
  const { title, description } = announcement
  const classes = useStyles()
  let history = useHistory()

  const onValueChange = (e) => {
    setAnnouncement({
      ...announcement,
      [e.target.name]: e.target.value,
      created: new Date(),
    })
  }

  const addAnnouncementDetails = async () => {
    if (title === '' || description === '') {
      setWarningMessage('Please input fields')
    } else {
      await addAnnouncement(announcement)
      setWarningMessage('')
      history.push('/')
    }
  }

  return (
    <FormGroup className={classes.container}>
      <Typography variant='h4'>Add Announcement</Typography>
      {warningMessage && <h3>{warningMessage}</h3>}
      <FormControl>
        <InputLabel htmlFor='my-input'>Title</InputLabel>
        <Input
          onChange={(e) => onValueChange(e)}
          name='title'
          value={title}
          id='my-input'
        />
      </FormControl>
      <FormControl>
        <InputLabel htmlFor='my-input'>Description</InputLabel>
        <Input
          onChange={(e) => onValueChange(e)}
          name='description'
          value={description}
          id='my-input'
        />
      </FormControl>
      <FormControl>
        <Button
          variant='contained'
          color='primary'
          onClick={() => addAnnouncementDetails()}
        >
          Add Announcement
        </Button>
      </FormControl>
    </FormGroup>
  )
}

export default AddAnnouncement
