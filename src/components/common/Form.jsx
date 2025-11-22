import React from 'react';
import Button from './Button';

const Form = ({ fields, onSubmit, submitButtonText = 'Submit', style = {}, initialData = {} }) => {
  const [formData, setFormData] = React.useState(() => {
    const data = {};
    fields.forEach(field => {
      if (initialData[field.name] !== undefined) {
        data[field.name] = initialData[field.name];
      }
    });
    return data;
  });
  const [errors, setErrors] = React.useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    
    fields.forEach(field => {
      if (field.required && !formData[field.name]) {
        newErrors[field.name] = `${field.label} is required`;
      }
      if (field.type === 'email' && formData[field.name]) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData[field.name])) {
          newErrors[field.name] = 'Invalid email format';
        }
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSubmit(formData);
  };

  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    ...style
  };

  const fieldStyle = {
    marginBottom: '30px',
    fontSize: '16px',
    display: 'flex',
    flexDirection: 'column'
  };

  const inputStyle = {
    padding: '10px',
    fontSize: '16px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    marginTop: '5px'
  };

  const errorStyle = {
    color: 'red',
    fontSize: '14px',
    marginTop: '5px'
  };

  return (
    <form style={formStyle} onSubmit={handleSubmit}>
      {fields.map((field) => (
        <div key={field.name} style={fieldStyle}>
          <label htmlFor={field.name}>{field.label}</label>
          {field.type === 'textarea' ? (
            <textarea
              id={field.name}
              name={field.name}
              value={formData[field.name] || ''}
              onChange={handleChange}
              placeholder={field.placeholder}
              style={inputStyle}
              rows={field.rows || 4}
            />
          ) : field.type === 'select' ? (
            <select
              id={field.name}
              name={field.name}
              value={formData[field.name] || ''}
              onChange={handleChange}
              style={inputStyle}
            >
              <option value="">Select {field.label}</option>
              {field.options?.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          ) : (
            <input
              type={field.type || 'text'}
              id={field.name}
              name={field.name}
              value={formData[field.name] || ''}
              onChange={handleChange}
              placeholder={field.placeholder}
              style={inputStyle}
            />
          )}
          {errors[field.name] && <span style={errorStyle}>{errors[field.name]}</span>}
        </div>
      ))}
      <Button type="submit" style={{ padding: '12px 40px', fontSize: '18px' }}>
        {submitButtonText}
      </Button>
    </form>
  );
};

export default Form;

