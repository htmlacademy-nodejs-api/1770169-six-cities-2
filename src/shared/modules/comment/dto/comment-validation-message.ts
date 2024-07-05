export const CommentValidationMessage = {
  comment: {
    invalidFormat: 'Comment must be an string',
    minLength: 'Minimum title length must be 5',
    maxLength: 'Maximum title length must be 1024',
  },
  date: {
    invalidFormat: 'Date must be a valid ISO date',
  },
  rating: {
    invalidFormat: 'Rating must be an integer',
    minValue: 'Minimum rating is 1',
    maxValue: 'Maximum rating is 5',
  }
} as const;
