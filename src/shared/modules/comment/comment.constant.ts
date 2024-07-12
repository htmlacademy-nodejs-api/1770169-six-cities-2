export const COLLECTION_NAME = 'comment';
export const MAX_COMMENT_VIEW = 50;

export const InfoMessage = {
  CREATE_COMMENT_MESSAGE: 'New comment has been successfully created.',
  DELETE_COMMENT_MESSAGE: '%count% comment has been successfully deleted.',
  REGISTER_ROUTES_MESSAGE: 'Register routes for CommentController.',
};

export enum Comment {
  Min = 5,
  Max = 1024
}

export enum Rating {
  Min = 1,
  Max = 5
}

export enum Route {
  OfferId = '/:offerId',
}
