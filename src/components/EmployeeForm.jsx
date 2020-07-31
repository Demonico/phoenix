import React, { Fragment, useContext } from 'react'
import { Formik, Field, Form } from 'formik'
import { TextField, RadioGroup } from 'formik-material-ui'
import { Button, FormControlLabel, Radio } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import { employeeContext } from '../store/EmployeeContext'

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  button: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}))

const blankEmployee = {
  firstName: '',
  lastName: '',
  email: '',
  telephone: '',
  role: '',
  other: '',
}

function replaceNulls(obj) {
  Object.keys(obj).forEach((key) => {
    obj[key] = !!obj[key] ? obj[key] : ''
  })

  return obj
}

export default function EmployeeForm({ empData, toggleModal, viewOnly }) {
  const classes = useToolbarStyles()
  const { addEmplolyee } = useContext(employeeContext)
  // const [showOther, setShowOther] = useState(false)

  const handleSubmit = (newEmployee) => {
    addEmplolyee(newEmployee)
  }

  const initValues = viewOnly
    ? { ...replaceNulls(empData), other: '' }
    : { ...blankEmployee }

  return (
    <Formik
      initialValues={initValues}
      onSubmit={async (values) => {
        handleSubmit(values)
        toggleModal()
      }}
    >
      {({ values }) => (
        <Form className={classes.root}>
          <Field
            component={TextField}
            disabled={viewOnly}
            id="firstName"
            name="firstName"
            label="First Name"
            placeholder="Jane"
          />
          <Field
            component={TextField}
            disabled={viewOnly}
            id="lastName"
            name="lastName"
            label="Last Name"
            placeholder="Doe"
          />
          <Field
            component={TextField}
            disabled={viewOnly}
            id="email"
            name="email"
            label="Email"
            placeholder="jane@acme.com"
            type="email"
          />
          <Field
            component={TextField}
            disabled={viewOnly}
            id="telephone"
            name="telephone"
            label="Phone"
            placeholder="(111) 111 1111"
          />
          {viewOnly ? (
            <Field
              component={TextField}
              disabled={viewOnly}
              id="role"
              name="role"
              label="Role"
            />
          ) : (
            <Fragment>
              <Field component={RadioGroup} name="role">
                <FormControlLabel
                  value="owner"
                  control={<Radio disabled={viewOnly} />}
                  label="Owner"
                  disabled={viewOnly}
                />
                <FormControlLabel
                  value="driver"
                  control={<Radio disabled={viewOnly} />}
                  label="Driver"
                  disabled={viewOnly}
                />
                <FormControlLabel
                  value="other"
                  control={<Radio disabled={viewOnly} />}
                  label="Other"
                  disabled={viewOnly}
                />
              </Field>
              {values.role === 'other' ? (
                <Field
                  component={TextField}
                  disabled={viewOnly}
                  id="other"
                  name="other"
                />
              ) : (
                <Fragment />
              )}
            </Fragment>
          )}

          <br />
          <span>&nbsp;</span>
          {viewOnly ? (
            <Button
              className={classes.button}
              variant="contained"
              color="secondary"
              onClick={toggleModal}
            >
              Close
            </Button>
          ) : (
            <Button
              className={classes.button}
              variant="contained"
              color="secondary"
              type="submit"
            >
              Submit
            </Button>
          )}
        </Form>
      )}
    </Formik>
  )
}
