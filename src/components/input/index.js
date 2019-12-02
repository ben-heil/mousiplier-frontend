import React from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useEffect } from 'react';
import { useDebounce } from 'use-debounce';

import ButtonIcon from '../../components/button-icon';
import { ReactComponent as ListMultiple } from '../../images/list-multiple.svg';
import { ReactComponent as ListSingle } from '../../images/list-single.svg';
import { ReactComponent as Search } from '../../images/search.svg';
import { ReactComponent as Cross } from '../../images/cross.svg';

import './index.css';

const debounceDelay = 200;

const Input = ({
  onChange = () => null,
  onChangeExpanded = () => null,
  multi = false,
  placeholder = '',
  multiPlaceholder = '',
  ...props
}) => {
  const [focused, setFocused] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [value, setValue] = useState('');
  const [debouncedValue] = useDebounce(value, debounceDelay);

  const changeExpanded = (newExpanded) => {
    let newValue = value;
    if (!newExpanded && newValue.includes('\n')) {
      newValue = newValue.split('\n')[0];
      changeValue(newValue);
    }

    setExpanded(newExpanded);
    onChangeExpanded(newExpanded);
  };

  const changeValue = (newValue) => {
    if (expanded)
      newValue = newValue.split(/[\t|\r|,]/).join('\n');
    else
      newValue = newValue.split('\n')[0];

    setValue(newValue);
  };

  useEffect(() => {
    onChange(debouncedValue);
  }, [onChange, debouncedValue]);

  return (
    <div className='input' data-focused={focused} data-expanded={expanded}>
      {!expanded && (
        <input
          {...props}
          value={value}
          onChange={(event) => changeValue(event.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={expanded ? multiPlaceholder : placeholder}
        />
      )}
      {expanded && (
        <textarea
          {...props}
          value={value}
          onChange={(event) => changeValue(event.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={expanded ? multiPlaceholder : placeholder}
        />
      )}
      {multi && (
        <ButtonIcon
          className='input_button'
          icon={expanded ? <ListSingle /> : <ListMultiple />}
          onClick={() => changeExpanded(!expanded)}
        />
      )}
      {value.length > 0 && (
        <ButtonIcon
          className='input_button'
          icon={<Cross />}
          onClick={() => changeValue('')}
        />
      )}
      {value.length === 0 && (
        <div className='input_button'>
          <Search />
        </div>
      )}
    </div>
  );
};

Input.propTypes = {
  onChange: PropTypes.func,
  onChangeExpanded: PropTypes.func,
  multi: PropTypes.bool,
  placeholder: PropTypes.string,
  multiPlaceholder: PropTypes.string
};

export default Input;