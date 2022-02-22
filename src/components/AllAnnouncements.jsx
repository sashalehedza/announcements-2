import React, { useState, useEffect } from 'react'
import {
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  Button,
  makeStyles,
  Box,
  InputBase,
} from '@material-ui/core'
import {
  getAnnouncements,
  deleteAnnouncement,
  getAnnouncementsByTitle,
} from '../service/api'
import { Link } from 'react-router-dom'
//import axios from 'axios'
const useStyles = makeStyles({
  table: {
    width: '90%',
    margin: '50px 0 0 50px',
  },
  thead: {
    '& > *': {
      fontSize: 20,
      background: '#000000',
      color: '#FFFFFF',
    },
  },
  row: {
    '& > *': {
      fontSize: 18,
    },
  },
  search: {
    margin: '20px',
  },
  inputBox: {
    color: 'inherit',
    margin: '0 50px',
  },
})

const AllAnnouncements = () => {
  //const [search, setSearch] = useState('')
  const [announcements, setAnnouncements] = useState([])
  const classes = useStyles()

  useEffect(() => {
    getAllAnnouncements()
  }, [])

  const deleteAnnouncementData = async (id) => {
    await deleteAnnouncement(id)
    getAllAnnouncements()
  }

  const getAllAnnouncements = async () => {
    let response = await getAnnouncements()
    setAnnouncements(response.data)
  }

  // Search Records here
  // const searchRecords = () => {
  //   axios
  //     .get(`http://localhost:3003/announcements?title=${search}`)
  //     .then((response) => {
  //       setAnnouncements(response.data)
  //     })
  // }

  // const searchRecords = async () => {
  //   let response = await getAnnouncementsByTitle(search)
  //   setAnnouncements(response.data)
  // }

  const searchRecordsInput = async (value) => {
    let response = await getAnnouncementsByTitle(value)
    setAnnouncements(response.data)
  }

  if (announcements.length < 1) {
    return (
      <>
        <Box className={classes.search}>
          <InputBase
            placeholder='Search by title'
            autoFocus
            classes={{ root: classes.inputBox }}
            onChange={(e) => searchRecordsInput(e.target.value)}
          />
        </Box>
        <h1>No announcements found</h1>
      </>
    )
  }

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

  return (
    <>
      <Box className={classes.search}>
        <InputBase
          placeholder='Search by title'
          autoFocus
          classes={{ root: classes.inputBox }}
          onChange={(e) => searchRecordsInput(e.target.value)}
        />
      </Box>

      {/* <Box className={classes.search}>
        <InputBase
          placeholder='Search by title'
          autoFocus
          classes={{ root: classes.inputBox }}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Box>
      <button type='button' onClick={searchRecords} class='btn btn-success'>
        <i class='fa fa-search' aria-hidden='true'>
          Submit
        </i>
      </button> */}

      {/* <div class='input-group mb-4 mt-3'>
        <div class='form-outline'>
          <input
            type='text'
            id='form1'
            onChange={(e) => setSearch(e.target.value)}
            class='form-control'
            placeholder='Search announcement by title'
            style={{ backgroundColor: '#ececec' }}
          />
        </div>
        <button type='button' onClick={searchRecords} class='btn btn-success'>
          <i class='fa fa-search' aria-hidden='true'>
            Submit
          </i>
        </button>
      </div> */}

      <Table className={classes.table}>
        <TableHead>
          <TableRow className={classes.thead}>
            <TableCell>Id</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Created</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {announcements.map((announcement) => (
            <TableRow className={classes.row} key={announcement.id}>
              <TableCell>{announcement.id}</TableCell>
              {/* change it to announcement.id to use JSON Server */}
              <TableCell>{announcement.title}</TableCell>
              <TableCell>{announcement.description}</TableCell>
              <TableCell>{getCreatedTime(announcement)}</TableCell>
              <TableCell>
                <Button
                  color='default'
                  variant='contained'
                  style={{ marginRight: 10 }}
                  component={Link}
                  to={`/announcements/${announcement.id}`}
                >
                  View
                </Button>
                {/* change it to announcement.id to use JSON Server */}
                <Button
                  color='primary'
                  variant='contained'
                  style={{ marginRight: 10 }}
                  component={Link}
                  to={`/edit/${announcement.id}`}
                >
                  Edit
                </Button>
                {/* change it to announcement.id to use JSON Server */}
                <Button
                  color='secondary'
                  variant='contained'
                  onClick={() => deleteAnnouncementData(announcement.id)}
                >
                  Delete
                </Button>
                {/* change it to announcement.id to use JSON Server */}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}

export default AllAnnouncements
