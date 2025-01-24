import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { newsApi } from '../../features/news/newsApi';

interface Article {
  url: string;
  title: string;
  description: string;
}

interface ArticleState {
  likedArticles: Article[];
  readLaterArticles: Article[];
}

const loadFromLocalStorage = (key: string): Article[] => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
};

const saveToLocalStorage = (key: string, data: Article[]) => {
  localStorage.setItem(key, JSON.stringify(data));
};

const initialState: ArticleState = {
  likedArticles: loadFromLocalStorage('likedArticles'),
  readLaterArticles: loadFromLocalStorage('readLaterArticles'),
};

const articlesSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    toggleLikeArticle: (state, action: PayloadAction<Article>) => {
      const article = action.payload;
      const exists = state.likedArticles.some((a) => a.url === article.url);
      if (exists) {
        state.likedArticles = state.likedArticles.filter((a) => a.url !== article.url);
      } else {
        state.likedArticles.push(article);
      }
      saveToLocalStorage('likedArticles', state.likedArticles); 
    },
    toggleReadLaterArticle: (state, action: PayloadAction<Article>) => {
      const article = action.payload;
      const exists = state.readLaterArticles.some((a) => a.url === article.url);
      if (exists) {
        state.readLaterArticles = state.readLaterArticles.filter((a) => a.url !== article.url);
      } else {
        state.readLaterArticles.push(article);
      }
      saveToLocalStorage('readLaterArticles', state.readLaterArticles);
    },
    clearLikedArticles: (state) => {
      state.likedArticles = [];
      localStorage.removeItem('likedArticles');
    },
    clearReadLaterArticles: (state) => {
      state.readLaterArticles = [];
      localStorage.removeItem('readLaterArticles');
    },
  },
});

export const {
  toggleLikeArticle,
  toggleReadLaterArticle,
  clearLikedArticles,
  clearReadLaterArticles,
} = articlesSlice.actions;

export const store = configureStore({
  reducer: {
    [newsApi.reducerPath]: newsApi.reducer,
    articles: articlesSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(newsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
