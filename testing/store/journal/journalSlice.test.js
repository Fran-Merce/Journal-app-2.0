import { journalSlice } from "../../../src/store/journal";
import { initialState } from "../../fixtures/journalFixtures";

describe('tests on journalSlice', () => { 
  test('should return initial state and name journal', () => {
    const state = journalSlice.reducer(initialState, {});
    expect(journalSlice.name).toBe('journal');
    expect(state).toEqual(initialState);
  });
})