// This was the module 21 tutorial "with a global name change from "thought" to "project"
// which probably just confuses things
// dont' know if we'll be using it but it's here for reference

import { useMutation } from '@apollo/react-hooks';
import { ADD_REACTION } from '../../utils/mutations';

const ReactionForm = ({ projectId }) => {
  const [reactionBody, setBody] = useState('');
  const [characterCount, setCharacterCount] = useState(0);
  const [addReaction, { error }] = useMutation(ADD_REACTION);

  // update state based on form input changes
  const handleChange = event => {
    if (event.target.value.length <= 280) {
      setBody(event.target.value);
      setCharacterCount(event.target.value.length);
    }
  };

  // submit form
  const handleFormSubmit = async event => {
    event.preventDefault();

    try {
      await addReaction({
        variables: { reactionBody, projectId }
      });

      // clear form value
      setBody('');
      setCharacterCount(0);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <p className={`m-0 ${characterCount === 280 || error ? 'text-error' : ''}`}>
        Character Count: {characterCount}/280
        {error && <span className="ml-2">Something went wrong...</span>}
      </p>
      <form
        className="flex-row justify-center justify-space-between-md align-stretch"
        onSubmit={handleFormSubmit}
      >
        <textarea
          placeholder="Leave a reaction to this project..."
          value={reactionBody}
          className="form-input col-12 col-md-9"
          onChange={handleChange}
        ></textarea>

        <button className="btn col-12 col-md-3" type="submit">
          Submit
        </button>
      </form>

      {error && <div>Something went wrong...</div>}
    </div>
  );
};

export default ReactionForm;
