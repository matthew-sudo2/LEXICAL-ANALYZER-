from collections.abc import Callable

from .states import State


class Automaton:
    """Small DFA used to classify maximal-munch lexemes."""

    def __init__(self) -> None:
        self.transitions: dict[State, dict[str, State | Callable[[str], State]]] = {
            State.INITIAL: {
                "letter": State.Q1,
                "underscore": State.Q1,
                "quote": State.Q3,
                "digit": State.Q4,
            },
            State.Q1: {"letter": State.Q1, "underscore": State.Q1, "digit": State.Q1},
            State.Q3: {"quote": State.Q3},
            State.Q4: {"digit": State.Q4, "dot": State.Q5},
            State.Q5: {"digit": State.Q6},
            State.Q6: {"digit": State.Q6},
        }

    def transition(self, state: State, character: str) -> State:
        category = self._category(character)
        next_state = self.transitions.get(state, {}).get(category)
        if next_state is None:
            return State.INVALIDATION_STATE
        return next_state if isinstance(next_state, State) else next_state(character)

    def classify(self, text: str) -> State:
        if not text:
            return State.INVALIDATION_STATE
        state = State.INITIAL
        for character in text:
            state = self.transition(state, character)
            if state is State.INVALIDATION_STATE:
                return state
        return state

    @staticmethod
    def _category(character: str) -> str:
        if character.isalpha():
            return "letter"
        if character == "_":
            return "underscore"
        if character.isdigit():
            return "digit"
        if character == ".":
            return "dot"
        if character in {'"', "'"}:
            return "quote"
        return "other"