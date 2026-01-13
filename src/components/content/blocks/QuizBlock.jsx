import { useState } from 'react';
import Box from '@cloudscape-design/components/box';
import Button from '@cloudscape-design/components/button';
import RadioGroup from '@cloudscape-design/components/radio-group';
import Checkbox from '@cloudscape-design/components/checkbox';
import Alert from '@cloudscape-design/components/alert';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Markdown from 'react-markdown';

/**
 * Renders an interactive quiz question.
 * 
 * @param {object} props
 * @param {string} props.id - Unique quiz identifier
 * @param {string} props.questionType - 'single' or 'multiple'
 * @param {string} props.question - The question text
 * @param {string} [props.hint] - Optional hint shown before answering
 * @param {Array} props.options - Array of {id, text, correct} objects
 * @param {string} props.explanation - Shown after submission
 */
export function QuizBlock({ id, questionType, question, hint, options, explanation }) {
  // Track selected answer(s)
  const [selected, setSelected] = useState(questionType === 'single' ? null : []);
  // Track if quiz has been submitted
  const [submitted, setSubmitted] = useState(false);
  // Track if answer was correct
  const [isCorrect, setIsCorrect] = useState(false);

  // Guard against missing data
  if (!options || options.length === 0) {
    return null;
  }

  // Check if user has selected at least one option
  const hasSelection = questionType === 'single' 
    ? selected !== null 
    : selected.length > 0;

  // Handle single-choice selection
  const handleSingleChange = ({ detail }) => {
    if (!submitted) {
      setSelected(detail.value);
    }
  };

  // Handle multiple-choice selection
  const handleMultipleChange = (optionId, checked) => {
    if (!submitted) {
      if (checked) {
        setSelected([...selected, optionId]);
      } else {
        setSelected(selected.filter(id => id !== optionId));
      }
    }
  };

  // Handle form submission
  const handleSubmit = () => {
    if (questionType === 'single') {
      // Find the selected option and check if it's correct
      const selectedOption = options.find(opt => opt.id === selected);
      setIsCorrect(selectedOption?.correct === true);
    } else {
      // For multiple choice: check if selected matches all correct answers
      const correctIds = options.filter(opt => opt.correct).map(opt => opt.id);
      const selectedSet = new Set(selected);
      const correctSet = new Set(correctIds);
      
      const allCorrectSelected = correctIds.every(id => selectedSet.has(id));
      const noIncorrectSelected = selected.every(id => correctSet.has(id));
      
      setIsCorrect(allCorrectSelected && noIncorrectSelected);
    }
    setSubmitted(true);
  };

  // Determine option status for styling after submission
  const getOptionStatus = (option) => {
    if (!submitted) return 'default';
    if (option.correct) return 'correct';
    
    const isSelected = questionType === 'single' 
      ? selected === option.id 
      : selected.includes(option.id);
    
    if (isSelected && !option.correct) return 'incorrect';
    return 'default';
  };

  return (
    <Box padding={{ vertical: 's' }}>
      <SpaceBetween size="m">
        {/* Question */}
        <Box variant="h4">{question}</Box>

        {/* Hint (before submission) */}
        {hint && !submitted && (
          <Alert type="info" statusIconAriaLabel="Hint">
            {hint}
          </Alert>
        )}

        {/* Options */}
        {questionType === 'single' ? (
          <RadioGroup
            onChange={handleSingleChange}
            value={selected}
            items={options.map(option => ({
              value: option.id,
              label: (
                <span style={{ 
                  color: getOptionStatus(option) === 'correct' 
                    ? 'var(--color-text-status-success)' 
                    : getOptionStatus(option) === 'incorrect'
                    ? 'var(--color-text-status-error)'
                    : 'inherit'
                }}>
                  {option.text}
                  {submitted && option.correct && ' ✓'}
                </span>
              ),
              disabled: submitted,
            }))}
          />
        ) : (
          <SpaceBetween size="xs">
            {options.map(option => (
              <Checkbox
                key={option.id}
                checked={selected.includes(option.id)}
                onChange={({ detail }) => handleMultipleChange(option.id, detail.checked)}
                disabled={submitted}
              >
                <span style={{ 
                  color: getOptionStatus(option) === 'correct' 
                    ? 'var(--color-text-status-success)' 
                    : getOptionStatus(option) === 'incorrect'
                    ? 'var(--color-text-status-error)'
                    : 'inherit'
                }}>
                  {option.text}
                  {submitted && option.correct && ' ✓'}
                </span>
              </Checkbox>
            ))}
          </SpaceBetween>
        )}

        {/* Submit button */}
        {!submitted && (
          <Box>
            <Button 
              variant="primary" 
              onClick={handleSubmit}
              disabled={!hasSelection}
            >
              Submit Answer
            </Button>
          </Box>
        )}

        {/* Result and explanation (after submission) */}
        {submitted && (
          <Alert
            type={isCorrect ? 'success' : 'error'}
            header={isCorrect ? 'Correct!' : 'Incorrect'}
          >
            <Markdown>{explanation}</Markdown>
          </Alert>
        )}
      </SpaceBetween>
    </Box>
  );
}