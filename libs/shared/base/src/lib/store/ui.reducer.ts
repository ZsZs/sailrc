import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import { startLoading, stopLoading, tabIsActive, tabIsInActive } from './ui.actions';

export interface UiState {
  isLoading: boolean;
  activeTabs: string[];
  currentTab: string;
}

const initialState: UiState = {
  isLoading: false,
  activeTabs: [],
  currentTab: undefined,
};

export const uiReducer = createReducer(
  initialState,
  on(startLoading, (state, action) => {
    return { ...state, isLoading: true };
  }),
  on(stopLoading, (state, action) => {
    return { ...state, isLoading: false };
  }),
  on(tabIsActive, (state, action) => {
    const activeTabs = [...state.activeTabs];
    activeTabs.push(action.tabName);
    return { ...state, activeTabs, currentTab: action.tabName };
  }),
  on(tabIsInActive, (state, action) => {
    const activeTabs = state.activeTabs.filter((tabName) => tabName !== action.tabName);
    return { ...state, activeTabs, currentTab: undefined };
  })
);

export const getUIState = createFeatureSelector<UiState>('ui');

export const getIsLoading = createSelector(getUIState, (state: UiState) => state.isLoading);
export const getActiveTabs = createSelector(getUIState, (state: UiState) => state.activeTabs);
export const getCurrentTab = createSelector(getUIState, (state: UiState) => state.currentTab);
export const getIsActiveTab = (tabName: string) => createSelector(getUIState, (state: UiState) => state.activeTabs.includes(tabName));
export const getIsCurrentTab = (tabName: string) => createSelector(getUIState, (state: UiState) => state.currentTab === tabName);
