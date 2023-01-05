import { useState, useRef, useCallback } from 'react';

function useInputs(initialForm) {
  const [inputs, setInputs] = useState(initialForm);
  const inputRef = useRef();

  const onChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setInputs({ ...inputs, [name]: value });
    },
    [inputs]
  );

  const reset = useCallback(() => {
    setInputs(initialForm);
    inputRef.current.focus();
  }, []);

  return [inputs, onChange, reset, inputRef];
}

export default useInputs;
