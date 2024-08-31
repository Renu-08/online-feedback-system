import React, { useState } from 'react';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Rating from 'react-rating-stars-component';

const FeedbackForm = () => {
  const [ratingKey, setRatingKey] = useState(0); 

  const initialValues = { name: '', email: '', feedback: '', rating: 0 };

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    feedback: Yup.string().required('Feedback is required'),
    rating: Yup.number().min(1, 'Rating is required').max(5).required(),
  });

  const onSubmit = async (values, { resetForm }) => {
    try {
      const response = await axios.post('http://localhost:5000/api/feedback', values);
      
      console.log('Response:', response.data); 
      alert('Feedback submitted successfully');
      
      resetForm();
      setRatingKey(prevKey => prevKey + 1);
    } catch (error) {
      console.error('Error submitting feedback:', error.response ? error.response.data : error.message);
      alert('Failed to submit feedback');
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      enableReinitialize={true} 
    >
      {({ setFieldValue, values }) => (
        <Form className="feedback-form">
          <div>
            <label htmlFor="name">Name</label>
            <Field name="name" type="text" />
            <ErrorMessage name="name" component="div" className="error" />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <Field name="email" type="email" />
            <ErrorMessage name="email" component="div" className="error" />
          </div>
          <div>
            <label htmlFor="feedback">Feedback</label>
            <Field as="textarea" name="feedback" />
            <ErrorMessage name="feedback" component="div" className="error" />
          </div>
          <div>
            <label htmlFor="rating">Rating</label>
            <Rating
              key={ratingKey} 
              count={5}
              size={30}
              activeColor="#ffd700"
              value={values.rating}
              onChange={(newValue) => setFieldValue('rating', newValue)}
            />
            <ErrorMessage name="rating" component="div" className="error" />
          </div>
          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  );
};

export default FeedbackForm;
