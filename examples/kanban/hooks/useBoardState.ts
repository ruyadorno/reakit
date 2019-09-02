import * as React from "react";
import createContextHook from "constate";

type Card = {
  id: number;
  content: string;
};

type Column = {
  id: number;
  title: string;
};

type ColumnCard = {
  column: number;
  cards: number[];
};

type BoardState = {
  columns: {
    [id: number]: Column;
  };
  cards: {
    [id: number]: Card;
  };
  columnsCards: ColumnCard[];
};

type BoardAction =
  | { type: "addColumn"; id: number; title: string }
  | { type: "removeColumn"; id: number }
  | { type: "editColumn"; id: number; title: string }
  | { type: "moveColumn"; id: number; index: number }
  | { type: "addCard"; id: number; columnId: number; content: string }
  | { type: "removeCard"; id: number }
  | { type: "editCard"; id: number; content: string }
  | { type: "moveCard"; id: number; columnId: number; index: number };

function clampByLength(number: number, array: any[]) {
  if (number < 0) return 0;
  if (number > array.length) return array.length;
  return number;
}

function getColumnIndexById(state: BoardState, columnId: number) {
  return state.columnsCards.findIndex(item => item.column === columnId);
}

function getColumnIndexByCardId(state: BoardState, cardId: number) {
  return state.columnsCards.findIndex(item =>
    item.cards.find(id => id === cardId)
  );
}

function getCardIndexById(cards: number[], cardId: number) {
  return cards.indexOf(cardId);
}

function reducer(state: BoardState, action: BoardAction): BoardState {
  switch (action.type) {
    case "addColumn": {
      return {
        ...state,
        columns: {
          ...state.columns,
          [action.id]: {
            id: action.id,
            title: action.title
          }
        },
        columnsCards: [
          ...state.columnsCards,
          {
            column: action.id,
            cards: []
          }
        ]
      };
    }
    case "removeColumn": {
      const index = getColumnIndexById(state, action.id);
      const columns = { ...state.columns };
      delete columns[action.id];
      return {
        ...state,
        columns,
        columnsCards: [
          ...state.columnsCards.slice(0, index),
          ...state.columnsCards.slice(index + 1)
        ]
      };
    }
    case "editColumn": {
      return {
        ...state,
        columns: {
          ...state.columns,
          [action.id]: {
            ...state.columns[action.id],
            title: action.title
          }
        }
      };
    }
    case "moveColumn": {
      const fromIndex = getColumnIndexById(state, action.id);
      if (fromIndex === -1) return state;
      const toIndex = clampByLength(action.index, state.columnsCards);
      const columnsCards = [...state.columnsCards];
      columnsCards.splice(toIndex, 0, columnsCards.splice(fromIndex, 1)[0]);
      return { ...state, columnsCards };
    }
    case "addCard": {
      const columnIndex = getColumnIndexById(state, action.columnId);
      return {
        ...state,
        cards: {
          ...state.cards,
          [action.id]: {
            id: action.id,
            content: action.content
          }
        },
        columnsCards: [
          ...state.columnsCards.slice(0, columnIndex),
          {
            ...state.columnsCards[columnIndex],
            cards: [...state.columnsCards[columnIndex].cards, action.id]
          },
          ...state.columnsCards.slice(columnIndex + 1)
        ]
      };
    }
    case "removeCard": {
      const columnIndex = getColumnIndexByCardId(state, action.id);
      const index = getCardIndexById(
        state.columnsCards[columnIndex].cards,
        action.id
      );
      const cards = { ...state.cards };
      delete cards[action.id];
      return {
        ...state,
        cards,
        columnsCards: [
          ...state.columnsCards.slice(0, columnIndex),
          {
            ...state.columnsCards[columnIndex],
            cards: [
              ...state.columnsCards[columnIndex].cards.slice(0, index),
              ...state.columnsCards[columnIndex].cards.slice(index + 1)
            ]
          },
          ...state.columnsCards.slice(columnIndex + 1)
        ]
      };
    }
    case "editCard": {
      return {
        ...state,
        cards: {
          ...state.cards,
          [action.id]: {
            ...state.cards[action.id],
            content: action.content
          }
        }
      };
    }
    case "moveCard": {
      const fromColumnIndex = getColumnIndexByCardId(state, action.id);
      if (fromColumnIndex === -1) return state;

      const fromIndex = getCardIndexById(
        state.columnsCards[fromColumnIndex].cards,
        action.id
      );
      if (fromIndex === -1) return state;

      const toColumnIndex = getColumnIndexById(state, action.columnId);
      if (toColumnIndex === -1) return state;

      let toIndex = clampByLength(
        action.index,
        state.columnsCards[toColumnIndex].cards
      );

      if (fromColumnIndex === toColumnIndex && toIndex > fromIndex) {
        toIndex -= 1;
      }

      const stateWithoutCard = reducer(state, {
        type: "removeCard",
        id: action.id
      });

      const columnCard = stateWithoutCard.columnsCards[toColumnIndex];

      return {
        ...state,
        columnsCards: [
          ...stateWithoutCard.columnsCards.slice(0, toColumnIndex),
          {
            ...columnCard,
            cards: [
              ...columnCard.cards.slice(0, toIndex),
              action.id,
              ...columnCard.cards.slice(toIndex + 1)
            ]
          },
          ...stateWithoutCard.columnsCards.slice(toColumnIndex + 1)
        ]
      };
    }
    default:
      return state;
  }
}

export default function useBoardState() {
  const [state, dispatch] = React.useReducer(reducer, {
    columns: {},
    cards: {},
    columnsCards: []
  });
  const id = React.useRef(0);

  const addColumn = React.useCallback((title: string) => {
    dispatch({ type: "addColumn", id: ++id.current, title });
  }, []);

  const removeColumn = React.useCallback((columnId: number) => {
    dispatch({ type: "removeColumn", id: columnId });
  }, []);

  const editColumn = React.useCallback((columnId: number, title: string) => {
    dispatch({ type: "editColumn", id: columnId, title });
  }, []);

  const moveColumn = React.useCallback((columnId: number, index: number) => {
    dispatch({ type: "moveColumn", id: columnId, index });
  }, []);

  const addCard = React.useCallback((columnId: number, content: string) => {
    dispatch({ type: "addCard", id: ++id.current, columnId, content });
  }, []);

  const removeCard = React.useCallback((cardId: number) => {
    dispatch({ type: "removeCard", id: cardId });
  }, []);

  const editCard = React.useCallback((cardId: number, content: string) => {
    dispatch({ type: "editCard", id: cardId, content });
  }, []);

  const moveCard = React.useCallback(
    (cardId: number, columnId: number, index: number) => {
      dispatch({ type: "moveCard", id: cardId, columnId, index });
    },
    []
  );

  const columns = React.useMemo(
    () =>
      state.columnsCards.map(item => ({
        ...state.columns[item.column],
        cards: item.cards.map(cardId => state.cards[cardId])
      })),
    [state]
  );

  const result = {
    columns,
    addColumn,
    removeColumn,
    editColumn,
    moveColumn,
    addCard,
    removeCard,
    editCard,
    moveCard
  };

  return React.useMemo(() => result, Object.values(result));
}

export const useBoardContext = createContextHook(useBoardState);
