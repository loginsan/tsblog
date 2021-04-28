import { Article, ArticleData, Tag } from '../types';
import { ArticleAction } from './articlesActions';
import {
  EDIT_ARTICLE_FETCHING,
  EDIT_ARTICLE_ERROR,
  EDIT_ARTICLE_SUCCESS,
  INIT_TAGS,
  ADD_TAG,
  EDIT_TAG,
  REMOVE_TAG,
} from './constants';


export interface EditState {
  loading: boolean,
  error: string,
  article: Article,
  tagList: Tag[],
}

const zeroTag: Tag = { order: 0, text: '' };

const initialState: EditState = {
  loading: false,
  error: '',
  article: {},
  tagList: [zeroTag],
};

export default function edit(
  state = initialState, 
  action: ArticleAction
): EditState {
  
  switch (action.type) {
    case INIT_TAGS: {
      const data = (action.payload as string[]).filter(elem => elem !== '');
      return {
        ...state,
        tagList: data.map((tag, index) => ({ order: index, text: tag }))
      }
    }

    case EDIT_TAG: {
      const data = action.payload as Tag;
      return {
        ...state,
        tagList: state.tagList.map(elem => {
          if (elem.order !== data.order) {
            return elem
          }
          return { order: data.order, text: data.text }
        }),
      }
    }

    case REMOVE_TAG:
      return {
        ...state,
        tagList: state.tagList.filter(elem => elem.order !== action.payload),
      }
    
    case ADD_TAG: {
      const data = action.payload as number;
      return {
        ...state,
        tagList: [ ...state.tagList, { order: data + 1, text: '' } ],
      }
    }

    case EDIT_ARTICLE_FETCHING:
      return { 
        ...state,
        error: '',
        loading: action.payload as boolean,
      };
    
    case EDIT_ARTICLE_ERROR:
      return { 
        ...state, 
        error: action.payload as string,
        loading: false,
      };
    
    case EDIT_ARTICLE_SUCCESS:
      return { 
        ...state, 
        loading: false,
        article: (action.payload as ArticleData).article,
        tagList: [zeroTag],
      };

    default:
      return state;
  }
};
