const validateAppointment = (req, res, next) => {
  const {
    appointmentDate,
    appointmentTime,
    firstName,
    lastName,
    email,
    organization,
    region,
    industry,
    category,
    message,
    country,
    state,
    city,
    consent
  } = req.body;

  const errors = [];

  // Required field validation
  if (!firstName?.trim()) errors.push('First name is required');
  if (!lastName?.trim()) errors.push('Last name is required');
  if (!email?.trim()) errors.push('Email is required');
  if (!organization?.trim()) errors.push('Organization is required');
  if (!region) errors.push('Region is required');
  if (!industry) errors.push('Industry is required');
  if (!category) errors.push('Category is required');
  if (!message?.trim()) errors.push('Message is required');
  if (!country?.trim()) errors.push('Country is required');
  if (!state?.trim()) errors.push('State is required');
  if (!city?.trim()) errors.push('City is required');
  if (!appointmentDate) errors.push('Appointment date is required');
  if (!appointmentTime) errors.push('Appointment time is required');
  if (!consent) errors.push('Consent is required');

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email && !emailRegex.test(email)) {
    errors.push('Please provide a valid email address');
  }

  // Date validation
  if (appointmentDate) {
    const parsedDate = new Date(appointmentDate);
    if (isNaN(parsedDate.getTime())) {
      errors.push('Invalid appointment date format');
    } else if (parsedDate < new Date()) {
      errors.push('Appointment date cannot be in the past');
    }
  }

  // Conditional field validation
  if (industry === 'other' && !req.body.otherIndustry?.trim()) {
    errors.push('Please specify your industry');
  }

  if (category === 'other' && !req.body.otherCategory?.trim()) {
    errors.push('Please specify your category');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors
    });
  }

  next();
};

module.exports = { validateAppointment };